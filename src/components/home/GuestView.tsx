
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, Users, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { SampleClassified, SampleEvent } from '@/types';

interface GuestViewProps {
  sampleClassifieds: SampleClassified[];
  sampleEvents: SampleEvent[];
}

const GuestView: FC<GuestViewProps> = ({ sampleClassifieds, sampleEvents }) => {
  const navigate = useNavigate();
  
  const continueAsGuest = () => {
    navigate('/classifieds');
    toast("You're browsing as a guest. Some features will be limited.");
  };

  return (
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
  );
};

export default GuestView;
