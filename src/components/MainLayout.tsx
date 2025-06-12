
import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
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
        {/* Fixed header container */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
          <AppHeader />
          {showTopNavigation && <TopNavigation />}
        </header>
        
        {/* Main content with proper top padding to account for fixed header */}
        <main className="flex-grow pt-32 pb-20">
          {children}
        </main>
        
        {/* Fixed bottom navigation */}
        <NavigationTabs />
      </div>
    </CategoryThemeProvider>
  );
};

export default MainLayout;
