
import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface CreateNewSectionProps {
  navigateToDesigner: (type: string) => void;
}

const CreateNewSection: FC<CreateNewSectionProps> = ({ navigateToDesigner }) => {
  return (
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
  );
};

export default CreateNewSection;
