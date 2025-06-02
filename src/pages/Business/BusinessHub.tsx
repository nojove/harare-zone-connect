import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import BannerAd from '@/components/BannerAd';
import BusinessCategories from '@/components/BusinessCategories';
import { useAuth } from '@/context/AuthContext';

interface BusinessListing {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  contact: string;
  location: string;
}

const BusinessHub: FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('Services');
  
  // Dummy data for business listings
  const dummyListings: BusinessListing[] = [
    // Services
    { id: '1', title: 'Professional Plumbing Services', category: 'Services', subcategory: 'Repairs', description: 'Expert plumbing services for residential and commercial needs', contact: '+263 771 123 456', location: 'Harare' },
    { id: '2', title: 'Electrical Installations', category: 'Services', subcategory: 'Installation', description: 'Licensed electrician for all electrical needs', contact: '+263 712 234 567', location: 'Bulawayo' },
    { id: '3', title: 'Web Development Agency', category: 'Services', subcategory: 'IT Services', description: 'Custom websites and applications for businesses', contact: '+263 733 345 678', location: 'Harare' },
    
    // For Sale
    { id: '4', title: '2018 Toyota Hilux for Sale', category: 'For Sale', subcategory: 'Vehicles', description: 'Well maintained, low mileage, excellent condition', contact: '+263 774 456 789', location: 'Mutare' },
    { id: '5', title: 'Office Furniture Clearance', category: 'For Sale', subcategory: 'Furniture', description: 'Desks, chairs, cabinets and more at discount prices', contact: '+263 715 567 890', location: 'Harare' },
    { id: '6', title: 'iPhone 13 Pro - Like New', category: 'For Sale', subcategory: 'Electronics', description: '128GB, unlocked, with accessories and warranty', contact: '+263 776 678 901', location: 'Bulawayo' },
    
    // Jobs
    { id: '7', title: 'Marketing Manager Position', category: 'Jobs', subcategory: 'Full-time', description: 'Experienced marketing professional needed for growing company', contact: 'careers@company.com', location: 'Harare' },
    { id: '8', title: 'Part-time Delivery Drivers', category: 'Jobs', subcategory: 'Part-time', description: 'Flexible hours, own vehicle required', contact: '+263 717 789 012', location: 'Multiple locations' },
    { id: '9', title: 'IT Support Technician', category: 'Jobs', subcategory: 'Full-time', description: 'Technical support for office systems and networks', contact: 'jobs@techco.co.zw', location: 'Bulawayo' },
    
    // Housing
    { id: '10', title: '3-Bedroom House for Rent', category: 'Housing', subcategory: 'Rentals', description: 'Spacious family home in quiet neighborhood, available immediately', contact: '+263 778 890 123', location: 'Harare - Borrowdale' },
    { id: '11', title: 'Office Space Available', category: 'Housing', subcategory: 'Commercial', description: '200sqm modern office space in prime business district', contact: '+263 719 901 234', location: 'Harare CBD' },
    { id: '12', title: 'Student Accommodation', category: 'Housing', subcategory: 'Rentals', description: 'Furnished rooms near university, utilities included', contact: '+263 779 012 345', location: 'Bulawayo - Hillside' },
  ];
  
  // Filter listings by selected category
  const filteredListings = dummyListings.filter(listing => listing.category === selectedCategory);
  
  const handleBusinessClick = (id: string) => {
    if (session) {
      navigate(`/details/full/${id}`);
    } else {
      navigate(`/details/${id}`);
    }
  };

  return (
    <MainLayout category="business">
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Business Hub</h1>
        
        <BusinessCategories 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{selectedCategory}</h2>
          
          {filteredListings.slice(0, Math.ceil(filteredListings.length / 2)).map((listing) => (
            <Card key={listing.id} className="cursor-pointer hover:shadow-md" onClick={() => handleBusinessClick(listing.id)}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{listing.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{listing.description}</p>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <span>{listing.subcategory}</span>
                  <span className="mx-1">•</span>
                  <span>{listing.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <BannerAd 
            title="Grow Your Business" 
            description="Advertise your products and services to reach more customers."
            backgroundColor="bg-blue-100"
            buttonText="Post Your Ad"
          />
          
          {filteredListings.slice(Math.ceil(filteredListings.length / 2)).map((listing) => (
            <Card key={listing.id} className="cursor-pointer hover:shadow-md" onClick={() => handleBusinessClick(listing.id)}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{listing.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{listing.description}</p>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <span>{listing.subcategory}</span>
                  <span className="mx-1">•</span>
                  <span>{listing.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default BusinessHub;
