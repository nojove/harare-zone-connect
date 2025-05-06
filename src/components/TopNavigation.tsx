
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopNavigation: FC = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Personal Hub', path: '/personal' },
    { name: 'Business Hub', path: '/business' },
    { name: 'Classifieds', path: '/classifieds' },
    { name: 'Events', path: '/events' },
  ];
  
  return (
    <div className="bg-white shadow-sm overflow-x-auto">
      <div className="flex space-x-1 px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`whitespace-nowrap px-3 py-1 rounded-md text-sm font-medium ${
                isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
