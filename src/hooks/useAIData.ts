
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useAIData = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    if (session) {
      fetchUserAIData();
    }
  }, [session]);

  const fetchUserAIData = async () => {
    try {
      // Fetch user conversations
      const { data: convData } = await supabase
        .from('ai_conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      // Fetch user preferences
      const { data: prefData } = await supabase
        .from('ai_user_preferences')
        .select('*')
        .eq('user_id', session?.user.id)
        .single();

      setConversations(convData || []);
      setPreferences(prefData);
    } catch (error) {
      console.error('Error fetching AI data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async (title: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_conversations')
        .insert({
          user_id: session?.user.id,
          title
        })
        .select()
        .single();

      if (error) throw error;
      
      fetchUserAIData(); // Refresh data
      return data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  };

  return {
    loading,
    conversations,
    preferences,
    fetchUserAIData,
    createConversation
  };
};
