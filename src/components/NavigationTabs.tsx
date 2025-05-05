
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
      color: '#4C9AFF'
    },
    {
      name: 'Directory',
      path: '/directory',
      icon: <BookOpen size={20} />,
      color: '#36B37E'
    },
    {
      name: 'Classifieds',
      path: '/classifieds',
      icon: <Tag size={20} />,
      color: '#FF5630'
    },
    {
      name: 'Events',
      path: '/events',
      icon: <Calendar size={20} />,
      color: '#FFAB00'
    },
    {
      name: 'Ads',
      path: '/banners',
      icon: <Bell size={20} />,
      color: '#6554C0'
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
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <div 
                className={`p-1 rounded-full ${isActive ? 'bg-blue-100' : ''}`}
                style={{ color: isActive ? tab.color : '' }}
              >
                {tab.icon}
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
