
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Classified, Event } from '@/types';
import CreateNewSection from './CreateNewSection';
import EventsList from './EventsList';
import ClassifiedsList from './ClassifiedsList';

interface UserViewProps {
  loading: boolean;
  upcomingEvents: Event[];
  featuredClassifieds: Classified[];
  navigateToDesigner: (type: string) => void;
  handleEventClick: (eventId: string) => void;
}

const UserView: FC<UserViewProps> = ({ 
  loading, 
  upcomingEvents, 
  featuredClassifieds, 
  navigateToDesigner,
  handleEventClick
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Harare Zone Connect</h1>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full mb-4" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-20 w-full mb-2" />
          <Skeleton className="h-20 w-full mb-2" />
          <Skeleton className="h-20 w-full mb-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Harare Zone Connect</h1>
      
      {/* Feature Banner/Image */}
      <div className="relative mb-6 rounded-lg overflow-hidden h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-center p-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Welcome to Harare Zone Connect</h2>
          <p className="text-sm">Your local directory for services, classifieds, and events</p>
        </div>
      </div>
      
      {/* Create New Content Section */}
      <CreateNewSection navigateToDesigner={navigateToDesigner} />
      
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <EventsList 
          events={upcomingEvents} 
          handleEventClick={handleEventClick} 
        />
      )}
      
      {/* Featured Classifieds */}
      {featuredClassifieds.length > 0 && (
        <ClassifiedsList classifieds={featuredClassifieds} />
      )}
    </div>
  );
};

export default UserView;
