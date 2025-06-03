import { FC, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Image, Link, Settings, Edit, Plus, Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import AIProfessor from '@/components/ai/AIProfessor';

interface Photo {
  id: string;
  url: string;
  caption?: string;
}

interface UserWidget {
  id: string;
  type: 'bio' | 'status' | 'links' | 'contact';
  title: string;
  content: string;
  enabled: boolean;
  order: number;
}

const defaultWidgets: UserWidget[] = [
  {
    id: 'bio',
    type: 'bio',
    title: 'About Me',
    content: 'Click to add your bio...',
    enabled: true,
    order: 1
  },
  {
    id: 'status',
    type: 'status',
    title: 'Status',
    content: 'Available',
    enabled: true,
    order: 2
  },
  {
    id: 'links',
    type: 'links',
    title: 'My Links',
    content: 'Add your social media profiles here...',
    enabled: false,
    order: 3
  },
  {
    id: 'contact',
    type: 'contact',
    title: 'Contact Info',
    content: 'Email, phone, etc...',
    enabled: false,
    order: 4
  }
];

// Sample photos for demonstration
const samplePhotos: Photo[] = [
  { 
    id: '1', 
    url: 'https://source.unsplash.com/random/300x300/?portrait', 
    caption: 'Profile picture' 
  },
  { 
    id: '2', 
    url: 'https://source.unsplash.com/random/300x300/?nature', 
    caption: 'My favorite place' 
  },
  { 
    id: '3', 
    url: 'https://source.unsplash.com/random/300x300/?city', 
    caption: 'Downtown' 
  }
];

const PersonalHub: FC = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [userWidgets, setUserWidgets] = useState<UserWidget[]>(defaultWidgets);
  const [editingWidget, setEditingWidget] = useState<string | null>(null);
  const [widgetContent, setWidgetContent] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState<any>(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profileError) {
          throw profileError;
        }
        
        setProfileData(profileData);
        
        // In a real app, you would fetch photos and widgets from database
        // For now, we'll use the sample data
        setPhotos(samplePhotos);
        
        // Simulate loading
        setTimeout(() => {
          setLoading(false);
        }, 800);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [session]);
  
  const handleAddPhoto = () => {
    toast("Photo upload functionality coming soon", {
      description: "This feature will be implemented in a future update"
    });
  };
  
  const handleRemovePhoto = (photoId: string) => {
    setPhotos(photos.filter(p => p.id !== photoId));
    toast("Photo removed", {
      description: "The photo has been removed from your album"
    });
  };
  
  const toggleWidgetEnabled = (widgetId: string) => {
    setUserWidgets(userWidgets.map(widget => {
      if (widget.id === widgetId) {
        return { ...widget, enabled: !widget.enabled };
      }
      return widget;
    }));
    
    toast("Widget visibility updated", {
      description: "Your profile has been updated"
    });
  };
  
  const handleEditWidget = (widget: UserWidget) => {
    setEditingWidget(widget.id);
    setWidgetContent(widget.content);
  };
  
  const saveWidgetContent = (widgetId: string) => {
    setUserWidgets(userWidgets.map(widget => {
      if (widget.id === widgetId) {
        return { ...widget, content: widgetContent };
      }
      return widget;
    }));
    setEditingWidget(null);
    
    toast("Widget content updated", {
      description: "Your changes have been saved"
    });
  };
  
  const renderWidgets = () => {
    return userWidgets
      .filter(widget => widget.enabled)
      .sort((a, b) => a.order - b.order)
      .map(widget => (
        <Card key={widget.id} className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{widget.title}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEditWidget(widget)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            {editingWidget === widget.id ? (
              <div className="space-y-2">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={widgetContent}
                  onChange={(e) => setWidgetContent(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingWidget(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => saveWidgetContent(widget.id)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">{widget.content}</p>
            )}
          </CardContent>
        </Card>
      ));
  };
  
  const renderPhotoAlbum = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Photo Album</h3>
          <Button variant="outline" size="sm" onClick={handleAddPhoto}>
            <Plus className="h-4 w-4 mr-1" /> Add Photo
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="relative">
              <img 
                src={photo.url} 
                alt={photo.caption || 'User photo'} 
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm rounded-b-lg">
                {photo.caption}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 text-white hover:bg-black hover:bg-opacity-30"
                  onClick={() => handleRemovePhoto(photo.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderWidgetManager = () => {
    return (
      <div>
        <h3 className="text-lg font-medium mb-4">Manage Widgets</h3>
        <div className="space-y-3">
          {userWidgets.map(widget => (
            <Card key={widget.id} className="relative">
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{widget.title}</h4>
                    <p className="text-xs text-gray-500">{widget.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={widget.enabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleWidgetEnabled(widget.id)}
                    >
                      {widget.enabled ? 'Enabled' : 'Disabled'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditWidget(widget)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  if (loading) {
    return (
      <MainLayout category="personal">
        <div className="flex flex-col p-4">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-64 w-full mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout category="personal">
      <div className="flex flex-col p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="text-sm">
              <User className="h-4 w-4 mr-1" /> Profile
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-sm">
              <Bot className="h-4 w-4 mr-1" /> AI Professor
            </TabsTrigger>
            <TabsTrigger value="photos" className="text-sm">
              <Image className="h-4 w-4 mr-1" /> Photos
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">
              <Settings className="h-4 w-4 mr-1" /> Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4 space-y-4">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-1/3">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src={photos[0]?.url || 'https://source.unsplash.com/random/300x300/?portrait'} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-bold">
                      {profileData?.full_name || 'Your Name'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {profileData?.location || 'Harare, Zimbabwe'}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setActiveTab('settings')}
                    >
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex-1">
                {renderWidgets()}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-4">
            <AIProfessor />
          </TabsContent>
          
          <TabsContent value="photos" className="mt-4">
            {renderPhotoAlbum()}
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4">
            {renderWidgetManager()}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PersonalHub;
