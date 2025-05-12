
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Category, Banner, Event, Classified } from '../types';
import MainLayout from '../components/MainLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, Users, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const Home: FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredBanners, setFeaturedBanners] = useState<Banner[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [featuredClassifieds, setFeaturedClassifieds] = useState<Classified[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');
          
        if (categoriesError) throw categoriesError;
        
        // Fetch featured banners (homepage placement)
        const { data: bannersData, error: bannersError } = await supabase
          .from('banners')
          .select('*')
          .eq('placement', 'homepage')
          .eq('status', 'active')
          .gte('end_date', new Date().toISOString())
          .lte('start_date', new Date().toISOString())
          .limit(3);
          
        if (bannersError) throw bannersError;
        
        // Fetch upcoming events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'active')
          .gte('event_date', new Date().toISOString())
          .order('event_date', { ascending: true })
          .limit(3);
          
        if (eventsError) throw eventsError;
        
        // Fetch featured classifieds
        const { data: classifiedsData, error: classifiedsError } = await supabase
          .from('classifieds')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(4);
          
        if (classifiedsError) throw classifiedsError;
        
        setCategories(categoriesData || []);
        setFeaturedBanners(bannersData || []);
        setUpcomingEvents(eventsData || []);
        setFeaturedClassifieds(classifiedsData || []);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const navigateToDesigner = (type: string) => {
    if (!session) {
      toast("You need to sign in to create content");
      navigate('/auth/login');
      return;
    }
    navigate(`/design/${type.toLowerCase()}`);
  };
  
  const handleEventClick = (eventId: string) => {
    navigate(`/details/${eventId}`);
  };

  const continueAsGuest = () => {
    navigate('/classifieds');
    toast("You're browsing as a guest. Some features will be limited.");
  };

  // Sample content for unregistered users
  const sampleClassifieds = [
    {
      id: 'sample-1',
      title: 'Toyota Hilux 2018 for Sale',
      description: 'Well-maintained pickup truck, single owner',
      price: 12500,
      location: 'Harare Central',
      images: ['https://source.unsplash.com/random/800x600/?truck']
    },
    {
      id: 'sample-2',
      title: '3-Bedroom House for Rent',
      description: 'Spacious family home in quiet neighborhood',
      price: 800,
      location: 'Borrowdale',
      images: ['https://source.unsplash.com/random/800x600/?house']
    },
    {
      id: 'sample-3',
      title: 'Professional Catering Services',
      description: 'Available for all events and occasions',
      price: null,
      location: 'All Harare',
      images: ['https://source.unsplash.com/random/800x600/?catering']
    }
  ];
  
  const sampleEvents = [
    {
      id: 'sample-e1',
      title: 'Harare International Festival',
      description: 'Annual cultural celebration with music and arts',
      location: 'Harare Gardens',
      event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      image: 'https://source.unsplash.com/random/800x600/?festival'
    },
    {
      id: 'sample-e2',
      title: 'Business Networking Mixer',
      description: 'Connect with professionals across industries',
      location: 'Meikles Hotel',
      event_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      image: 'https://source.unsplash.com/random/800x600/?networking'
    }
  ];

  // Render content based on authentication status
  if (!session) {
    return (
      <MainLayout>
        <div className="flex flex-col p-4">
          {/* Welcome Hero for Unregistered Users */}
          <div className="relative mb-6 rounded-lg overflow-hidden h-52 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center text-white text-center p-4">
            <div className="z-10">
              <h2 className="text-2xl font-bold mb-2">Welcome to Harare Zone Connect</h2>
              <p className="text-sm mb-4">Your local directory for services, classifieds, and events</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-center">
                <Button 
                  onClick={() => navigate('/auth/register')}
                  className="bg-white text-blue-700 hover:bg-blue-50"
                >
                  Register Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={continueAsGuest}
                  className="border-white text-white hover:bg-white/20"
                >
                  Continue as Guest
                </Button>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
          </div>
          
          {/* Sample Featured Classifieds */}
          <section className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Featured Classifieds</h2>
              <Button variant="ghost" onClick={() => navigate('/classifieds')} className="text-sm text-blue-600">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sampleClassifieds.slice(0, 2).map(item => (
                <Card 
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/details/${item.id}`)}
                >
                  {item.images && item.images[0] && (
                    <div className="h-32 w-full overflow-hidden">
                      <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.location}</p>
                      </div>
                      <div className="text-right">
                        {item.price && (
                          <div className="text-sm font-medium text-green-600">
                            ${item.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Sample Events */}
          <section className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              <Button variant="ghost" onClick={() => navigate('/events')} className="text-sm text-blue-600">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {sampleEvents.map(event => (
                <Card 
                  key={event.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/details/${event.id}`)}
                >
                  <div className="flex h-24">
                    <div className="w-24 overflow-hidden">
                      <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                    </div>
                    <CardContent className="p-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-blue-600">
                            {new Date(event.event_date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* What to Expect */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">What To Expect</h2>
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Local Directory</h4>
                      <p className="text-xs text-gray-600">Find services and businesses in your area</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                      <Tag className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Classifieds</h4>
                      <p className="text-xs text-gray-600">Post and browse local listings for items and services</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-100 p-1 rounded-full mr-3 mt-0.5">
                      <Calendar className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Events Calendar</h4>
                      <p className="text-xs text-gray-600">Stay updated with local events and activities</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </MainLayout>
    );
  }

  // Authenticated user view
  return (
    <MainLayout>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Harare Zone Connect</h1>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-20 w-full mb-2" />
            <Skeleton className="h-20 w-full mb-2" />
            <Skeleton className="h-20 w-full mb-2" />
          </div>
        ) : (
          <>
            {/* Feature Banner/Image */}
            <div className="relative mb-6 rounded-lg overflow-hidden h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-center p-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Welcome to Harare Zone Connect</h2>
                <p className="text-sm">Your local directory for services, classifieds, and events</p>
              </div>
            </div>
            
            {/* Create New Content Section */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Create New</h2>
              <div className="grid grid-cols-3 gap-3">
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow bg-category-business-soft"
                  onClick={() => navigateToDesigner('business')}
                >
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-category-business">
                        <Plus className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Business Listing</h3>
                        <p className="text-xs text-gray-500">Promote business</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow bg-category-classifieds-soft"
                  onClick={() => navigateToDesigner('classifieds')}
                >
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-category-classifieds">
                        <Plus className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Classified Ad</h3>
                        <p className="text-xs text-gray-500">Sell or buy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow bg-category-events-soft"
                  onClick={() => navigateToDesigner('events')}
                >
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-category-events">
                        <Plus className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Event</h3>
                        <p className="text-xs text-gray-500">Create event</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <Card 
                      key={event.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleEventClick(event.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-blue-600">
                              {new Date(event.event_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
            
            {/* Featured Classifieds */}
            {featuredClassifieds.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Featured Classifieds</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuredClassifieds.slice(0, 4).map(classified => (
                    <Card 
                      key={classified.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/details/${classified.id}`)}
                    >
                      {classified.images && classified.images[0] && (
                        <div className="h-32 w-full overflow-hidden">
                          <img 
                            src={classified.images[0]} 
                            alt={classified.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{classified.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{classified.location}</p>
                          </div>
                          <div className="text-right">
                            {classified.price && (
                              <div className="text-sm font-medium text-green-600">
                                ${classified.price}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Home;
