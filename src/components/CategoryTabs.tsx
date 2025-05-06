
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category } from '../types';

interface CategoryTabsProps {
  type?: string;
  categories: Category[];
}

const getCategoryColor = (categoryName: string): string => {
  const colorMap: Record<string, string> = {
    'restaurants': 'bg-category-restaurants',
    'shopping': 'bg-category-shopping',
    'services': 'bg-category-services',
    'education': 'bg-category-education',
    'health': 'bg-category-health',
    'entertainment': 'bg-category-entertainment',
    'transport': 'bg-category-transport',
    'community': 'bg-category-community',
  };
  
  return colorMap[categoryName.toLowerCase()] || 'bg-blue-500';
};

const CategoryTabs: FC<CategoryTabsProps> = ({ type, categories }) => {
  const location = useLocation();
  const filteredCategories = type ? categories.filter(cat => cat.type === type) : categories;
  
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex space-x-2 px-4 py-2 min-w-max">
        {filteredCategories.map((category) => {
          const isActive = location.pathname.includes(category.name.toLowerCase());
          const categoryColor = getCategoryColor(category.name);
          
          return (
            <Link
              key={category.id}
              to={`/${type || 'directory'}/${category.name.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                isActive ? `${categoryColor} text-white` : `${categoryColor} bg-opacity-20 text-gray-800`
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
