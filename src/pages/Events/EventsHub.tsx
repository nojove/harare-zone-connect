import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import BannerAd from '@/components/BannerAd';
import { useAuth } from '@/context/AuthContext';

interface EventListing {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: string;
}

const EventsHub: FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [searchResults, setSearchResults] = useState<EventListing[]>([]);
  
  // Dummy data for events
  const dummyEvents: EventListing[] = [
    { id: '1', title: 'Harare International Festival of the Arts', date: '15 May 2025', time: '10:00 AM', location: 'Harare Gardens', organizer: 'HIFA Trust', category: 'Arts & Culture' },
    { id: '2', title: 'Tech Startup Meetup', date: '20 May 2025', time: '6:00 PM', location: 'Impact Hub Harare', organizer: 'Startup Zimbabwe', category: 'Business' },
    { id: '3', title: 'Victoria Falls Carnival', date: '28 Dec 2025', time: 'All Day', location: 'Victoria Falls', organizer: 'VF Carnival', category: 'Music' },
    { id: '4', title: 'Charity Fun Run', date: '5 Jun 2025', time: '7:00 AM', location: 'Harare Sports Club', organizer: 'Run for Life', category: 'Sports' },
    { id: '5', title: 'Food & Wine Festival', date: '12 Jun 2025', time: '11:00 AM', location: 'Borrowdale Racecourse', organizer: 'Taste of Zimbabwe', category: 'Food & Drink' },
    { id: '6', title: 'Business Networking Conference', date: '25 Jun 2025', time: '9:00 AM', location: 'Rainbow Towers', organizer: 'Business Connect', category: 'Business' },
  ];
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filtered = dummyEvents.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.category.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
  };
  
  const handleEventClick = (id: string) => {
    if (session) {
      navigate(`/details/full/${id}`);
    } else {
      navigate(`/details/${id}`);
    }
  };
  
  return (
    <MainLayout category="events">
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Events</h1>
        
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} placeholder="Search events..." />
        </div>
        
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            <>
              <h2 className="text-lg font-semibold">Search Results</h2>
              {searchResults.map((event) => (
                <Card key={event.id} className="cursor-pointer hover:shadow-md" onClick={() => handleEventClick(event.id)}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{event.location}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{event.organizer}</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{event.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              
              {dummyEvents.slice(0, 2).map((event) => (
                <Card key={event.id} className="cursor-pointer hover:shadow-md" onClick={() => handleEventClick(event.id)}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{event.location}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{event.organizer}</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{event.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <BannerAd 
                title="Promote Your Event" 
                description="Reach more attendees by advertising your event here."
                backgroundColor="bg-amber-100"
                buttonText="Create Event"
              />
              
              {dummyEvents.slice(2).map((event) => (
                <Card key={event.id} className="cursor-pointer hover:shadow-md" onClick={() => handleEventClick(event.id)}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{event.location}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{event.organizer}</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{event.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsHub;
