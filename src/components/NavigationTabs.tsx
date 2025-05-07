
import { FC } from 'react';
import { cloneElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Tag, Calendar, User, FileText, UserCircle } from 'lucide-react';

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
      name: 'Personal',
      path: '/personal',
      icon: <User size={20} />,
      color: 'bg-category-personal',
      textColor: 'text-category-personal'
    },
    {
      name: 'Business',
      path: '/business',
      icon: <Briefcase size={20} />,
      color: 'bg-category-business',
      textColor: 'text-category-business'
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
      name: 'Directory',
      path: '/directory',
      icon: <FileText size={20} />,
      color: 'bg-category-directory',
      textColor: 'text-category-directory'
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <UserCircle size={20} />,
      color: 'bg-gray-500',
      textColor: 'text-gray-800'
    }
  ];
  
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center">
      <nav className="flex bg-white rounded-full shadow-lg px-2 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || 
                         (tab.path !== '/' && location.pathname.startsWith(tab.path));
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center px-3 py-2 ${
                isActive ? tab.textColor : 'text-gray-500'
              }`}
            >
              <div 
                className={`p-1 rounded-full ${isActive ? `${tab.color} bg-opacity-20` : ''}`}
              >
                {cloneElement(tab.icon, { 
                  color: isActive ? tab.color.replace('bg-', '').replace('category-', '#').replace('home', '#1E90FF').replace('events', '#FF6347').replace('classifieds', '#32CD32').replace('directory', '#FFD700').replace('personal', '#FF8B00').replace('business', '#6554C0') : undefined 
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
