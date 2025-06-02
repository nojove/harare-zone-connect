import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { DirectoryListing } from '../../types';
import { Skeleton } from '@/components/ui/skeleton';
import MainLayout from '../../components/MainLayout';
import { useCategories } from '../../hooks/useCategories';
import CategoryTabs from '../../components/CategoryTabs';
import SearchBar from '@/components/SearchBar';
import { useAuth } from '@/contexts/AuthContext';

const DirectoryList: FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { categories, loading: loadingCategories } = useCategories();
  const [listings, setListings] = useState<DirectoryListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('directory_listings')
          .select('*')
          .filter('is_visible', 'eq', true);
          
        if (error) {
          throw error;
        }
        
        setListings(data || []);
      } catch (err) {
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter(listing => {
    const query = searchQuery.toLowerCase();
    return (
      listing.name.toLowerCase().includes(query) ||
      listing.location.toLowerCase().includes(query) ||
      (listing.business_name && listing.business_name.toLowerCase().includes(query)) ||
      (listing.service_type && listing.service_type.toLowerCase().includes(query))
    );
  });

  const handleListingClick = (id: string) => {
    if (session) {
      navigate(`/directory/${id}`);
    } else {
      navigate(`/details/${id}`);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <MainLayout category="default">
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Directory</h1>
        
        {loadingCategories ? (
          <Skeleton className="h-10 mb-4" />
        ) : (
          <CategoryTabs categories={categories} />
        )}
        
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} placeholder="Search directory..." />
        </div>
        
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-200 bg-white">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredListings.length > 0 ? (
              filteredListings.map(listing => (
                <div 
                  key={listing.id}
                  className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => handleListingClick(listing.id)}
                >
                  <h3 className="font-semibold">{listing.name}</h3>
                  {listing.business_name && (
                    <p className="text-sm text-gray-700">{listing.business_name}</p>
                  )}
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{listing.location}</span>
                    {listing.service_type && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{listing.service_type}</span>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No listings found
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DirectoryList;
