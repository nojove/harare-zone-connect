
import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import BottomBanner from './BottomBanner';
import NavigationTabs from './NavigationTabs';
import TopNavigation from './TopNavigation';
import { Banner } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { CategoryThemeProvider } from './CategoryThemeProvider';

interface MainLayoutProps {
  children: ReactNode;
  bottomBanner?: Banner;
  showCategories?: boolean;
  categoryType?: string;
  showTopNavigation?: boolean;
  category?: 'personal' | 'business' | 'classifieds' | 'events' | 'default' | 'banners';
}

const MainLayout: FC<MainLayoutProps> = ({ 
  children, 
  bottomBanner,
  showCategories = false,
  categoryType,
  showTopNavigation = true,
  category = 'default'
}) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  
  return (
    <CategoryThemeProvider category={category}>
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        
        {showTopNavigation && <TopNavigation />}
        
        <div className="flex-grow pb-8">
          {children}
        </div>
        
        <NavigationTabs />
        <BottomBanner banner={bottomBanner} />
      </div>
    </CategoryThemeProvider>
  );
};

export default MainLayout;
