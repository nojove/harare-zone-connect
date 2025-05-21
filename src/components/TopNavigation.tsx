
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopNavigation: FC = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Personal Hub', 
      path: '/personal', 
      color: 'bg-category-personal',
      hoverColor: 'hover:bg-orange-100',
      activeColor: 'bg-orange-100'
    },
    { 
      name: 'Business Hub', 
      path: '/business',
      color: 'bg-category-business',
      hoverColor: 'hover:bg-indigo-100',
      activeColor: 'bg-indigo-100'
    },
    { 
      name: 'Classifieds', 
      path: '/classifieds',
      color: 'bg-category-classifieds', 
      hoverColor: 'hover:bg-green-100',
      activeColor: 'bg-green-100'
    },
    { 
      name: 'Events', 
      path: '/events',
      color: 'bg-category-events',
      hoverColor: 'hover:bg-red-100',
      activeColor: 'bg-red-100'
    },
    { 
      name: 'Directory', 
      path: '/directory',
      color: 'bg-category-directory',
      hoverColor: 'hover:bg-yellow-100',
      activeColor: 'bg-yellow-100'
    },
  ];
  
  return (
    <div className="bg-white shadow-sm overflow-x-auto">
      <div className="flex space-x-2 px-3 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm ${
                isActive 
                  ? item.activeColor + ' font-bold text-gray-900' 
                  : 'text-gray-600 ' + item.hoverColor + ' hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopNavigation;
