
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Category, Banner, Event } from '../types';
import MainLayout from '../components/MainLayout';
import CategoryTabs from '../components/CategoryTabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Tag, Users } from 'lucide-react';

const Home: FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredBanners, setFeaturedBanners] = useState<Banner[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [bottomBanner, setBottomBanner] = useState<Banner | undefined>(undefined);

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
        
        // Fetch a bottom banner
        const { data: bottomBannerData, error: bottomBannerError } = await supabase
          .from('banners')
          .select('*')
          .eq('placement', 'bottom')
          .eq('status', 'active')
          .gte('end_date', new Date().toISOString())
          .lte('start_date', new Date().toISOString())
          .limit(1)
          .single();
          
        if (!bottomBannerError) {
          setBottomBanner(bottomBannerData);
        }
        
        setCategories(categoriesData || []);
        setFeaturedBanners(bannersData || []);
        setUpcomingEvents(eventsData || []);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleCategoryClick = (category: Category) => {
    if (category.type === 'classified') {
      navigate(`/classifieds/${category.name.toLowerCase()}`);
    } else if (category.type === 'event') {
      navigate(`/events/${category.name.toLowerCase()}`);
    }
  };

  const handleEventClick = (id: string) => {
    navigate(`/events/${id}`);
  };

  return (
    <MainLayout bottomBanner={bottomBanner}>
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
            
            {/* Categories */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories
                  .filter((_, index) => index < 4) // Show only first 4 categories
                  .map((category) => (
                    <Card 
                      key={category.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <CardContent className="p-3 flex items-center">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                          style={{ backgroundColor: category.color }}
                        >
                          {category.type === 'classified' ? (
                            <Tag className="h-5 w-5 text-white" />
                          ) : (
                            <Calendar className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{category.name}</h3>
                          <p className="text-xs text-gray-500">{category.type}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                }
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
            
            {/* What to Expect */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3">What to Expect</h2>
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
            
            {/* Coming Soon */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Coming Soon</h2>
              <Card>
                <CardContent className="p-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• In-app payments</li>
                    <li>• Agent dashboard</li>
                    <li>• Banner ad customization</li>
                    <li>• Event RSVP system</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Home;
