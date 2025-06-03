
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { message, conversationId, userContext } = await req.json();

    // Get user preferences for personalization
    const { data: preferences } = await supabaseClient
      .from('ai_user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Create system prompt based on user context
    let systemPrompt = `You are an AI Professor and personal learning assistant for the Harare Zone Connect platform. You help users with:
- Learning about local business opportunities in Zimbabwe
- Understanding how to use the platform effectively
- General educational support and guidance
- Personalized learning recommendations

User Context: ${JSON.stringify(userContext || {})}
Learning Style: ${preferences?.learning_style || 'adaptive'}
Interests: ${preferences?.interests?.join(', ') || 'general'}
Difficulty Level: ${preferences?.difficulty_level || 'intermediate'}

Be helpful, educational, and encouraging. Provide practical advice relevant to the Zimbabwe context.`;

    // Get conversation history if conversationId provided
    let messages = [{ role: 'system', content: systemPrompt }];
    
    if (conversationId) {
      const { data: history } = await supabaseClient
        .from('ai_messages')
        .select('role, content')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(10); // Last 10 messages for context

      if (history) {
        messages.push(...history);
      }
    }

    messages.push({ role: 'user', content: message });

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Store conversation if conversationId provided
    if (conversationId) {
      // Store user message
      await supabaseClient.from('ai_messages').insert({
        conversation_id: conversationId,
        role: 'user',
        content: message,
        metadata: { userContext }
      });

      // Store AI response
      await supabaseClient.from('ai_messages').insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: aiResponse,
        metadata: { 
          model: 'gpt-4o-mini',
          tokens: data.usage?.total_tokens 
        }
      });
    }

    // Log analytics
    await supabaseClient.from('ai_analytics').insert({
      user_id: user.id,
      event_type: 'ai_chat',
      event_data: {
        message_length: message.length,
        response_length: aiResponse.length,
        conversation_id: conversationId,
        model: 'gpt-4o-mini'
      },
      session_id: req.headers.get('x-session-id')
    });

    // Update user preferences based on interaction
    if (preferences) {
      const updatedHistory = {
        ...preferences.interaction_history,
        total_messages: (preferences.interaction_history?.total_messages || 0) + 1,
        last_interaction: new Date().toISOString()
      };

      await supabaseClient
        .from('ai_user_preferences')
        .update({ 
          interaction_history: updatedHistory,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
    } else {
      // Create initial preferences
      await supabaseClient.from('ai_user_preferences').insert({
        user_id: user.id,
        interaction_history: {
          total_messages: 1,
          first_interaction: new Date().toISOString(),
          last_interaction: new Date().toISOString()
        }
      });
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        conversationId: conversationId 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
