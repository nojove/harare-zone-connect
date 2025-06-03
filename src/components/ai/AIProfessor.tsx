
import { FC, useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Send, User, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { useOfflineStorage } from '@/hooks/useOfflineStorage';
import ConnectionStatus from '@/components/ui/connection-status';
import OfflineAIFallback from './OfflineAIFallback';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isOffline?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

const AIProfessor: FC = () => {
  const { session } = useAuth();
  const {
    isOnline,
    saveMessageOffline,
    saveConversationOffline,
    getOfflineConversations,
    syncPendingMessages,
    saveAnalyticsOffline
  } = useOfflineStorage();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [showOfflineFallback, setShowOfflineFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (session) {
      fetchConversations();
    }
  }, [session]);

  // Sync when coming back online
  useEffect(() => {
    if (isOnline) {
      syncPendingMessages();
      fetchConversations(); // Refresh from server
    }
  }, [isOnline, syncPendingMessages]);

  const fetchConversations = async () => {
    try {
      let conversations: Conversation[] = [];
      
      if (isOnline) {
        // Fetch from server when online
        const { data, error } = await supabase
          .from('ai_conversations')
          .select('id, title, created_at')
          .order('updated_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        conversations = data || [];
        
        // Cache conversations offline
        for (const conv of conversations) {
          await saveConversationOffline({
            id: conv.id,
            title: conv.title,
            messages: [],
            lastUpdated: new Date(conv.created_at)
          });
        }
      } else {
        // Load from offline storage
        const offlineConversations = await getOfflineConversations();
        conversations = offlineConversations.map(conv => ({
          id: conv.id,
          title: conv.title,
          created_at: conv.lastUpdated.toISOString()
        }));
      }
      
      setConversations(conversations);
      
      // Auto-load the most recent conversation
      if (conversations.length > 0 && !currentConversation) {
        loadConversation(conversations[0].id);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      
      // Fallback to offline storage
      const offlineConversations = await getOfflineConversations();
      const conversations = offlineConversations.map(conv => ({
        id: conv.id,
        title: conv.title,
        created_at: conv.lastUpdated.toISOString()
      }));
      setConversations(conversations);
    } finally {
      setLoadingConversations(false);
    }
  };

  const loadConversation = async (conversationId: string) => {
    try {
      let messages: Message[] = [];
      
      if (isOnline) {
        // Load from server when online
        const { data, error } = await supabase
          .from('ai_messages')
          .select('id, role, content, created_at')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (error) throw error;

        messages = data?.map(msg => ({
          id: msg.id,
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: new Date(msg.created_at)
        })) || [];
      }
      
      setMessages(messages);
      setCurrentConversation(conversationId);
    } catch (error) {
      console.error('Error loading conversation:', error);
      toast('Failed to load conversation');
    }
  };

  const createNewConversation = async () => {
    try {
      const conversationId = `offline-${Date.now()}`;
      const title = 'New Chat';
      
      if (isOnline) {
        const { data, error } = await supabase
          .from('ai_conversations')
          .insert({
            user_id: session?.user.id,
            title
          })
          .select()
          .single();

        if (error) throw error;
        setCurrentConversation(data.id);
      } else {
        // Create offline conversation
        await saveConversationOffline({
          id: conversationId,
          title,
          messages: [],
          lastUpdated: new Date()
        });
        setCurrentConversation(conversationId);
      }
      
      setMessages([]);
      fetchConversations();
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast('Failed to create new conversation');
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI immediately
    const tempUserMessage: Message = {
      id: `temp-user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
      isOffline: !isOnline
    };
    setMessages(prev => [...prev, tempUserMessage]);
    setLoading(true);

    // Save analytics
    await saveAnalyticsOffline({
      event_type: 'ai_chat_attempt',
      event_data: {
        message_length: userMessage.length,
        is_online: isOnline
      }
    });

    try {
      let conversationId = currentConversation;
      
      if (isOnline) {
        // Online mode - full AI functionality
        // Create new conversation if none exists
        if (!conversationId) {
          const { data, error } = await supabase
            .from('ai_conversations')
            .insert({
              user_id: session?.user.id,
              title: userMessage.slice(0, 50)
            })
            .select()
            .single();

          if (error) throw error;
          conversationId = data.id;
          setCurrentConversation(conversationId);
        }

        // Get user context from their profile and activity
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session?.user.id)
          .single();

        const userContext = {
          location: profile?.location,
          interests: profile?.service_type ? [profile.service_type] : [],
          businessOwner: !!profile?.business_name
        };

        // Call AI function
        const { data, error } = await supabase.functions.invoke('ai-chat', {
          body: {
            message: userMessage,
            conversationId,
            userContext
          }
        });

        if (error) throw error;

        // Add AI response to UI
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => prev.slice(0, -1).concat([
          { ...tempUserMessage, id: `user-${Date.now()}` },
          aiMessage
        ]));

        // Refresh conversations to update the title/timestamp
        fetchConversations();
      } else {
        // Offline mode - save message and show fallback
        if (!conversationId) {
          conversationId = `offline-${Date.now()}`;
          setCurrentConversation(conversationId);
        }

        // Save user message offline
        await saveMessageOffline({
          id: tempUserMessage.id,
          conversationId,
          content: userMessage,
          role: 'user',
          timestamp: new Date(),
          synced: false
        });

        // Show offline fallback instead of AI response
        setShowOfflineFallback(true);
        setMessages(prev => prev.slice(0, -1).concat([
          { ...tempUserMessage, id: `user-${Date.now()}` }
        ]));
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      if (isOnline) {
        toast('Failed to send message. Please check if OpenAI API key is configured.');
      } else {
        toast('Message saved offline. Will send when reconnected.');
      }
      
      // Save message offline as fallback
      if (currentConversation) {
        await saveMessageOffline({
          id: tempUserMessage.id,
          conversationId: currentConversation,
          content: userMessage,
          role: 'user',
          timestamp: new Date(),
          synced: false
        });
      }
      
      setMessages(prev => prev.slice(0, -1)); // Remove the temp message
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleRetryOnline = () => {
    setShowOfflineFallback(false);
    if (isOnline) {
      sendMessage();
    }
  };

  if (loadingConversations) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI Professor
            {!isOnline && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                Offline
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={createNewConversation}>
              New Chat
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        
        <ConnectionStatus onRetry={handleRetryOnline} />
        
        {conversations.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {conversations.slice(0, 3).map((conv) => (
              <Button
                key={conv.id}
                variant={currentConversation === conv.id ? "default" : "outline"}
                size="sm"
                onClick={() => loadConversation(conv.id)}
                className="text-xs"
              >
                {conv.title || 'Chat'}
              </Button>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <Bot className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-medium mb-2">Welcome to your AI Professor!</h3>
              <p className="text-sm">
                {isOnline 
                  ? "Ask me anything about business, learning, or how to use Harare Zone Connect."
                  : "Currently offline - I can still help with basic questions and save your messages for when you reconnect."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? `${message.isOffline ? 'bg-orange-600' : 'bg-blue-600'} text-white`
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {message.isOffline && (
                        <span className="text-xs">(offline)</span>
                      )}
                    </div>
                  </div>
                  
                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {showOfflineFallback && (
                <OfflineAIFallback 
                  userMessage={input} 
                  onRetry={handleRetryOnline}
                />
              )}
              
              {loading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isOnline ? "Ask your AI Professor anything..." : "Message will be sent when reconnected..."}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={loading || !input.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {!isOnline && (
            <div className="text-xs text-orange-600 mt-1">
              Offline mode: Messages will sync when you reconnect
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIProfessor;
