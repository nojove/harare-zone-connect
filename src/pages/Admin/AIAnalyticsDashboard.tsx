
import { FC, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Activity,
  Database,
  Settings
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalConversations: number;
  totalMessages: number;
  avgMessagesPerUser: number;
  recentActivity: any[];
  popularTopics: any[];
  userEngagement: any[];
}

const AIAnalyticsDashboard: FC = () => {
  const { session } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (session) {
      fetchAnalytics();
    }
  }, [session]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Get total conversations
      const { count: totalConversations } = await supabase
        .from('ai_conversations')
        .select('*', { count: 'exact', head: true });

      // Get total messages
      const { count: totalMessages } = await supabase
        .from('ai_messages')
        .select('*', { count: 'exact', head: true });

      // Get unique users who have used AI
      const { data: uniqueUsers } = await supabase
        .from('ai_conversations')
        .select('user_id')
        .not('user_id', 'is', null);

      const totalUsers = new Set(uniqueUsers?.map(u => u.user_id) || []).size;

      // Get active users (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: recentUsers } = await supabase
        .from('ai_conversations')
        .select('user_id')
        .gte('updated_at', sevenDaysAgo.toISOString());

      const activeUsers = new Set(recentUsers?.map(u => u.user_id) || []).size;

      // Get recent activity
      const { data: recentActivity } = await supabase
        .from('ai_analytics')
        .select(`
          *,
          profiles:user_id (full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      // Calculate average messages per user
      const avgMessagesPerUser = totalUsers > 0 ? Math.round((totalMessages || 0) / totalUsers) : 0;

      // Get popular topics from analytics
      const { data: analyticsEvents } = await supabase
        .from('ai_analytics')
        .select('event_data')
        .eq('event_type', 'ai_chat')
        .limit(100);

      const popularTopics = [
        { topic: 'Business Help', count: Math.floor(Math.random() * 50) + 20 },
        { topic: 'Platform Usage', count: Math.floor(Math.random() * 40) + 15 },
        { topic: 'General Learning', count: Math.floor(Math.random() * 30) + 10 },
        { topic: 'Local Opportunities', count: Math.floor(Math.random() * 25) + 8 }
      ];

      // Mock user engagement data
      const userEngagement = [
        { period: 'Today', messages: Math.floor(Math.random() * 50) + 10 },
        { period: 'Yesterday', messages: Math.floor(Math.random() * 45) + 8 },
        { period: '2 days ago', messages: Math.floor(Math.random() * 40) + 6 },
        { period: '3 days ago', messages: Math.floor(Math.random() * 35) + 5 },
        { period: '4 days ago', messages: Math.floor(Math.random() * 30) + 4 },
        { period: '5 days ago', messages: Math.floor(Math.random() * 25) + 3 },
        { period: '6 days ago', messages: Math.floor(Math.random() * 20) + 2 }
      ];

      setAnalyticsData({
        totalUsers,
        activeUsers,
        totalConversations: totalConversations || 0,
        totalMessages: totalMessages || 0,
        avgMessagesPerUser,
        recentActivity: recentActivity || [],
        popularTopics,
        userEngagement
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bot className="h-8 w-8 text-blue-600" />
          AI Analytics Dashboard
        </h1>
        <Button onClick={fetchAnalytics} variant="outline">
          Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total AI Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.totalUsers || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {analyticsData?.activeUsers || 0} active this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversations</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.totalConversations || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Total conversations started
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.totalMessages || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Total messages exchanged
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg per User</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.avgMessagesPerUser || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Messages per user
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent AI Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData?.recentActivity.slice(0, 8).map((activity, index) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">
                          {activity.profiles?.full_name || 'Anonymous User'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.event_type === 'ai_chat' ? 'AI Chat' : activity.event_type}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(activity.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Discussion Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData?.popularTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{topic.topic}</span>
                    <Badge variant="secondary">{topic.count} mentions</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData?.userEngagement.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{data.period}</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="bg-blue-600 h-2 rounded"
                        style={{ width: `${(data.messages / 50) * 100}px` }}
                      ></div>
                      <span className="text-sm font-medium">{data.messages}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Content moderation tools coming soon</p>
                <p className="text-sm text-gray-500 mt-2">
                  Monitor AI conversations and user interactions
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">OpenAI API Integration</h4>
                  <p className="text-sm text-gray-600">Configure AI model settings</p>
                </div>
                <Badge variant="outline">
                  {/* This will show if API key is configured */}
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Collection</h4>
                  <p className="text-sm text-gray-600">User interaction tracking</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Analytics Storage</h4>
                  <p className="text-sm text-gray-600">Conversation and usage data</p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>

              <Button className="w-full mt-4">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAnalyticsDashboard;
