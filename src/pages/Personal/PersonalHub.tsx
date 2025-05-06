
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import SearchBar from '@/components/SearchBar';
import { Card, CardContent } from '@/components/ui/card';
import BannerAd from '@/components/BannerAd';

interface PersonListing {
  id: string;
  name: string;
  number: string;
  category: string;
  location: string;
}

const PersonalHub: FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<PersonListing[]>([]);
  
  // Dummy data
  const dummyListings: PersonListing[] = [
    { id: '1', name: 'John Doe', number: '+263 771 234 567', category: 'Plumber', location: 'Harare' },
    { id: '2', name: 'Jane Smith', number: '+263 712 345 678', category: 'Electrician', location: 'Bulawayo' },
    { id: '3', name: 'Robert Moyo', number: '+263 733 456 789', category: 'Carpenter', location: 'Mutare' },
    { id: '4', name: 'Sarah Ncube', number: '+263 774 567 890', category: 'Teacher', location: 'Gweru' },
    { id: '5', name: 'Michael Tafara', number: '+263 715 678 901', category: 'Driver', location: 'Harare' },
  ];
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filtered = dummyListings.filter(listing => 
      listing.name.toLowerCase().includes(query.toLowerCase()) ||
      listing.number.includes(query) ||
      listing.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Personal Hub</h1>
        
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            <>
              <h2 className="text-lg font-semibold">Search Results</h2>
              {searchResults.map((listing) => (
                <Card key={listing.id} className="cursor-pointer hover:shadow-md" onClick={() => navigate(`/personal/${listing.id}`)}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{listing.name}</h3>
                    <p className="text-sm text-gray-700">{listing.category}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{listing.location}</span>
                      <span className="mx-1">•</span>
                      <span>{listing.number}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Popular Listings</h2>
              
              {dummyListings.slice(0, 2).map((listing) => (
                <Card key={listing.id} className="cursor-pointer hover:shadow-md" onClick={() => navigate(`/personal/${listing.id}`)}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{listing.name}</h3>
                    <p className="text-sm text-gray-700">{listing.category}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{listing.location}</span>
                      <span className="mx-1">•</span>
                      <span>{listing.number}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <BannerAd 
                title="Your Ad Could Be Here" 
                description="Reach thousands of potential customers with a targeted ad."
                backgroundColor="bg-purple-100"
                buttonText="Advertise Now"
              />
              
              {dummyListings.slice(2).map((listing) => (
                <Card key={listing.id} className="cursor-pointer hover:shadow-md" onClick={() => navigate(`/personal/${listing.id}`)}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{listing.name}</h3>
                    <p className="text-sm text-gray-700">{listing.category}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{listing.location}</span>
                      <span className="mx-1">•</span>
                      <span>{listing.number}</span>
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

export default PersonalHub;
