
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Camera, Upload, Settings, HelpCircle, Edit, Plus } from 'lucide-react';

const UserProfile: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [editMode, setEditMode] = useState<boolean>(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+263 77 123 4567',
    location: 'Harare, Zimbabwe',
    aboutMe: 'I am a passionate individual who loves to connect with others in the community.',
    joinDate: 'January 2025',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  });
  
  // Mock user content
  const [userContent] = useState({
    banners: [
      { id: '1', title: 'Business Promotion', type: 'banner', status: 'active' },
      { id: '2', title: 'Weekend Sale', type: 'banner', status: 'pending' }
    ],
    events: [
      { id: '3', title: 'Community Meetup', type: 'event', status: 'active' },
      { id: '4', title: 'Birthday Celebration', type: 'event', status: 'expired' }
    ],
    classifieds: [
      { id: '5', title: 'iPhone for Sale', type: 'classified', status: 'active' },
      { id: '6', title: 'Looking for Apartment', type: 'classified', status: 'active' }
    ],
    photos: [
      { id: '1', url: 'https://picsum.photos/seed/1/300/300' },
      { id: '2', url: 'https://picsum.photos/seed/2/300/300' },
      { id: '3', url: 'https://picsum.photos/seed/3/300/300' },
      { id: '4', url: 'https://picsum.photos/seed/4/300/300' }
    ]
  });
  
  const handleSaveProfile = () => {
    setEditMode(false);
    // Here you would save the updated profile data
    console.log('Saving profile:', userData);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setEditMode(false);
  };
  
  const handleContentClick = (id: string, type: string) => {
    navigate(`/details/${id}`);
  };

  return (
    <MainLayout category="personal">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <Tabs defaultValue="profile" onValueChange={handleTabChange}>
          <div className="bg-white rounded-lg overflow-hidden mb-6">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="profile" className="flex-1 max-w-[150px]">Profile</TabsTrigger>
              <TabsTrigger value="content" className="flex-1 max-w-[150px]">My Content</TabsTrigger>
              <TabsTrigger value="photos" className="flex-1 max-w-[150px]">Photos</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 max-w-[150px]">Settings</TabsTrigger>
              <TabsTrigger value="help" className="flex-1 max-w-[150px]">Help</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="p-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative">
                    <img 
                      src={userData.avatar} 
                      alt="Profile" 
                      className="w-40 h-40 rounded-full border-4 border-white shadow-md"
                    />
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 rounded-full"
                      variant="default"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-xl font-semibold mt-4">{userData.name}</h2>
                  <p className="text-gray-500 text-sm">{userData.location}</p>
                  <p className="text-gray-500 text-xs mt-1">Member since {userData.joinDate}</p>
                  
                  {!editMode && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setEditMode(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
                
                <div className="md:w-2/3">
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input 
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input 
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input 
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <Input 
                          value={userData.location}
                          onChange={(e) => setUserData({...userData, location: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          About Me
                        </label>
                        <Textarea 
                          value={userData.aboutMe}
                          onChange={(e) => setUserData({...userData, aboutMe: e.target.value})}
                          rows={4}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p>{userData.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                        <p>{userData.phone}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Location</h3>
                        <p>{userData.location}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">About Me</h3>
                        <p className="whitespace-pre-wrap">{userData.aboutMe}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Content Tab */}
            <TabsContent value="content" className="p-4">
              <Tabs defaultValue="banners">
                <TabsList className="mb-4">
                  <TabsTrigger value="banners">Banners</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="classifieds">Classifieds</TabsTrigger>
                </TabsList>
                
                <TabsContent value="banners">
                  <div className="space-y-3">
                    {userContent.banners.map((item) => (
                      <Card 
                        key={item.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleContentClick(item.id, item.type)}
                      >
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : item.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center py-6 border-dashed"
                      onClick={() => navigate('/design/banners')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Banner
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="events">
                  <div className="space-y-3">
                    {userContent.events.map((item) => (
                      <Card 
                        key={item.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleContentClick(item.id, item.type)}
                      >
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : item.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center py-6 border-dashed"
                      onClick={() => navigate('/design/events')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Event
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="classifieds">
                  <div className="space-y-3">
                    {userContent.classifieds.map((item) => (
                      <Card 
                        key={item.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleContentClick(item.id, item.type)}
                      >
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : item.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center py-6 border-dashed"
                      onClick={() => navigate('/design/classifieds')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Classified
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            {/* Photos Tab */}
            <TabsContent value="photos" className="p-4">
              <div className="mb-4">
                <Button variant="outline" className="flex gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photos
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userContent.photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img 
                      src={photo.url} 
                      alt="User photo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                <div className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="p-4">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>Privacy settings, notification preferences, and account security options will appear here.</p>
                      <Button variant="outline" size="sm" className="mt-2">Manage Account</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Notification Preferences</h3>
                    <div className="space-y-2 text-sm">
                      <p>Control how and when you receive notifications from Harare Zone Connect.</p>
                      <Button variant="outline" size="sm" className="mt-2">Manage Notifications</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
                    <div className="space-y-2 text-sm">
                      <p>Permanently delete your account and all associated data.</p>
                      <Button variant="destructive" size="sm" className="mt-2">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Help Tab */}
            <TabsContent value="help" className="p-4">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>Find answers to common questions about using Harare Zone Connect.</p>
                      <Button variant="outline" size="sm" className="mt-2">Browse FAQs</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Contact Support</h3>
                    <div className="space-y-2 text-sm">
                      <p>Need help? Our support team is ready to assist you.</p>
                      <Button variant="outline" size="sm" className="mt-2">Contact Support</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UserProfile;
