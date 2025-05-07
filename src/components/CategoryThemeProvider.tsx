
import { FC, ReactNode, createContext, useContext } from 'react';

type CategoryType = 'personal' | 'business' | 'classifieds' | 'events' | 'default';

interface CategoryThemeContextProps {
  category: CategoryType;
  setCategory: (category: CategoryType) => void;
}

const CategoryThemeContext = createContext<CategoryThemeContextProps>({
  category: 'default',
  setCategory: () => {},
});

interface CategoryThemeProviderProps {
  category: CategoryType;
  children: ReactNode;
}

export const CategoryThemeProvider: FC<CategoryThemeProviderProps> = ({ 
  category, 
  children 
}) => {
  // Create a theme class based on the category
  const getThemeStyles = () => {
    switch (category) {
      case 'personal':
        return { 
          backgroundColor: '#FFF8F0',
          gradientClass: 'bg-gradient-to-br from-[#FFF8F0] to-[#FFECD9]'
        };
      case 'business':
        return { 
          backgroundColor: '#F0F4FF',
          gradientClass: 'bg-gradient-to-br from-[#F0F4FF] to-[#DCE4FF]'
        };
      case 'classifieds':
        return { 
          backgroundColor: '#FFF8E8',
          gradientClass: 'bg-gradient-to-br from-[#FFF8E8] to-[#FFF0C9]'
        };
      case 'events':
        return { 
          backgroundColor: '#F8FFF0',
          gradientClass: 'bg-gradient-to-br from-[#F8FFF0] to-[#ECFFD9]'
        };
      default:
        return { 
          backgroundColor: '#F9FAFB',
          gradientClass: 'bg-gray-50'
        };
    }
  };

  const themeStyles = getThemeStyles();
  
  return (
    <CategoryThemeContext.Provider value={{ category, setCategory: () => {} }}>
      <div 
        className={`flex flex-col min-h-screen ${themeStyles.gradientClass}`}
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: 'fixed',
        }}
      >
        {children}
      </div>
    </CategoryThemeContext.Provider>
  );
};

export const useCategoryTheme = () => {
  return useContext(CategoryThemeContext);
};
