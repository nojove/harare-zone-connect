
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Classified } from '@/types';

interface ClassifiedsListProps {
  classifieds: Classified[];
}

const ClassifiedsList: FC<ClassifiedsListProps> = ({ classifieds }) => {
  const navigate = useNavigate();
  
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Featured Classifieds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {classifieds.slice(0, 4).map(classified => (
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
  );
};

export default ClassifiedsList;
