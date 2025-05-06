
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Tag, Calendar, Bell } from 'lucide-react';

const NavigationTabs: FC = () => {
  const location = useLocation();
  
  const tabs = [
    {
      name: 'Home',
      path: '/',
      icon: <Home size={20} />,
      color: 'bg-category-home',
      textColor: 'text-category-home'
    },
    {
      name: 'Directory',
      path: '/directory',
      icon: <BookOpen size={20} />,
      color: 'bg-category-directory',
      textColor: 'text-category-directory'
    },
    {
      name: 'Classifieds',
      path: '/classifieds',
      icon: <Tag size={20} />,
      color: 'bg-category-classifieds',
      textColor: 'text-category-classifieds'
    },
    {
      name: 'Events',
      path: '/events',
      icon: <Calendar size={20} />,
      color: 'bg-category-events',
      textColor: 'text-category-events'
    },
    {
      name: 'Ads',
      path: '/banners',
      icon: <Bell size={20} />,
      color: 'bg-category-ads',
      textColor: 'text-category-ads'
    }
  ];
  
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center">
      <nav className="flex bg-white rounded-full shadow-lg px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || 
                         (tab.path !== '/' && location.pathname.startsWith(tab.path));
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center px-4 py-2 ${
                isActive ? tab.textColor : 'text-gray-500'
              }`}
            >
              <div 
                className={`p-1 rounded-full ${isActive ? `${tab.color} bg-opacity-20` : ''}`}
              >
                {React.cloneElement(tab.icon, { 
                  color: isActive ? tab.color.replace('bg-', '').replace('category-', '#') : undefined 
                })}
              </div>
              <span className="text-xs mt-1">{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationTabs;
