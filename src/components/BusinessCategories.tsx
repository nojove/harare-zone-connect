
import { FC } from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/utils';

interface BusinessCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const BusinessCategories: FC<BusinessCategoriesProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['Services', 'For Sale', 'Jobs', 'Housing'];
  
  return (
    <div className="mb-6">
      <Tab.Group 
        selectedIndex={categories.findIndex(cat => cat === selectedCategory)}
        onChange={(index) => onCategoryChange(categories[index])}
      >
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-100 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-600 hover:bg-white/[0.12] hover:text-blue-700'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default BusinessCategories;
