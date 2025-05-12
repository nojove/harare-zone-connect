
import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Event } from '@/types';

interface EventsListProps {
  events: Event[];
  handleEventClick: (eventId: string) => void;
}

const EventsList: FC<EventsListProps> = ({ events, handleEventClick }) => {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
      <div className="space-y-3">
        {events.map(event => (
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
  );
};

export default EventsList;
