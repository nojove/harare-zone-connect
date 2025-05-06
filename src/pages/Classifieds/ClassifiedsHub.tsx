
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import BannerAd from '@/components/BannerAd';

interface ClassifiedListing {
  id: string;
  title: string;
  price: string;
  location: string;
  postedDate: string;
  category: string;
}

const ClassifiedsHub: FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<ClassifiedListing[]>([]);
  
  // Dummy data for classifieds
  const dummyListings: ClassifiedListing[] = [
    { id: '1', title: 'Leather Sofa Set - Excellent Condition', price: 'USD 450', location: 'Harare', postedDate: '2 days ago', category: 'Furniture' },
    { id: '2', title: 'Samsung Galaxy S21 Ultra', price: 'USD 600', location: 'Bulawayo', postedDate: '1 day ago', category: 'Electronics' },
    { id: '3', title: '2015 Mazda Demio - Low Mileage', price: 'USD 5,500', location: 'Harare', postedDate: '3 days ago', category: 'Vehicles' },
    { id: '4', title: 'Professional Camera Equipment', price: 'USD 1,200', location: 'Mutare', postedDate: '5 hours ago', category: 'Photography' },
    { id: '5', title: 'Mountain Bike - Barely Used', price: 'USD 300', location: 'Gweru', postedDate: 'Just now', category: 'Sports' },
    { id: '6', title: 'Textbooks for University', price: 'USD 150', location: 'Harare', postedDate: '1 week ago', category: 'Books' },
  ];
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filtered = dummyListings.filter(listing => 
      listing.title.toLowerCase().includes(query.toLowerCase()) ||
      listing.category.toLowerCase().includes(query.toLowerCase()) ||
      listing.location.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col p-4" style={{ backgroundColor: '#FFF8F0' }}>
        <h1 className="text-2xl font-bold mb-4">Classifieds</h1>
        
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} placeholder="Search classifieds..." />
        </div>
        
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            <>
              <h2 className="text-lg font-semibold">Search Results</h2>
              {searchResults.map((listing) => (
                <Card key={listing.id} className="cursor-pointer hover:shadow-md" onClick={() => navigate(`/classifieds/${listing.id}`)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{listing.title}</h3>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>{listing.location}</span>
                          <span className="mx-1">•</span>
                          <span>{listing.postedDate}</span>
                        </div>
                      </div>
                      <div className="font-semibold text-green-600">{listing.price}</div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <Tag className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-xs text-gray-500">{listing.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Featured Classifieds</h2>
              
              {dummyListings.slice(0, 2).map((listing) => (
                <Card key={listing.id} className="cursor-pointer hover:shadow-md" onClick={() => navigate(`/classifieds/${listing.id}`)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{listing.title}</h3>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>{listing.location}</span>
                          <span className="mx-1">•</span>
                          <span>{listing.postedDate}</span>
                        </div>
                      </div>
                      <div className="font-semibold text-green-600">{listing.price}</div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <Tag className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-xs text-gray-500">{listing.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <BannerAd 
                title="Sell Your Items Quickly" 
                description="Reach thousands of potential buyers with a classified ad."
                backgroundColor="bg-orange-100"
                buttonText="Post a Classified"
              />
              
              {dummyListings.slice(2).map((listing) => (
                <Card key={listing.id} className="cursor-pointer hover:shadow-md" onClick={() => navigate(`/classifieds/${listing.id}`)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{listing.title}</h3>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>{listing.location}</span>
                          <span className="mx-1">•</span>
                          <span>{listing.postedDate}</span>
                        </div>
                      </div>
                      <div className="font-semibold text-green-600">{listing.price}</div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <Tag className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-xs text-gray-500">{listing.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassifiedsHub;
