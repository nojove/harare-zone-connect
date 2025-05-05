
import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import BottomBanner from './BottomBanner';
import NavigationTabs from './NavigationTabs';
import { Banner } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface MainLayoutProps {
  children: ReactNode;
  bottomBanner?: Banner;
  showCategories?: boolean;
  categoryType?: string;
}

const MainLayout: FC<MainLayoutProps> = ({ 
  children, 
  bottomBanner,
  showCategories = false,
  categoryType
}) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      
      <div className="flex-grow pb-8">
        {children}
      </div>
      
      <NavigationTabs />
      <BottomBanner banner={bottomBanner} />
    </div>
  );
};

export default MainLayout;
