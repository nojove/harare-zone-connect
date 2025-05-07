
import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Share2, Flag, Phone, MessageSquare, ArrowLeft } from 'lucide-react';

interface ItemData {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  createdAt: string;
  contactInfo?: string;
  price?: number;
  location?: string;
  type: 'event' | 'classified' | 'business' | 'personal' | 'banner';
}

const DetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [item, setItem] = useState<ItemData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // For demo purposes, create dummy data based on ID
        // In a real app, this would be a fetch from your API/Supabase
        setTimeout(() => {
          // Check if ID exists (for demo purposes, assume IDs 1-10 exist)
          const idNumber = parseInt(id || '0');
          
          if (idNumber >= 1 && idNumber <= 10) {
            // Generate dummy data based on ID
            const dummyTypes = ['event', 'classified', 'business', 'personal', 'banner'];
            const type = dummyTypes[idNumber % dummyTypes.length] as ItemData['type'];
            
            const dummyData: ItemData = {
              id: id || '',
              title: `Sample ${type.charAt(0).toUpperCase() + type.slice(1)} #${id}`,
              description: `This is a detailed description for the ${type} with ID ${id}. It contains all the relevant information that a user might need to know about this item.`,
              image: `https://picsum.photos/seed/${id}/800/400`,
              category: type,
              createdAt: new Date().toISOString(),
              contactInfo: '+263 77 123 4567',
              price: type === 'classified' ? idNumber * 100 : undefined,
              location: 'Harare, Zimbabwe',
              type
            };
            
            setItem(dummyData);
          } else {
            setError('Item not found');
          }
          
          setLoading(false);
        }, 800); // Simulate loading delay
        
      } catch (err) {
        console.error('Error fetching item details:', err);
        setError('Failed to load details');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const getCategoryTheme = (itemType: ItemData['type']) => {
    switch (itemType) {
      case 'event': return 'events';
      case 'classified': return 'classifieds';
      case 'business': return 'business';
      case 'personal': return 'personal';
      case 'banner': return 'banners';
      default: return 'default';
    }
  };
  
  const getButtonColor = (itemType: ItemData['type']) => {
    switch (itemType) {
      case 'event': return 'bg-category-events hover:bg-opacity-90';
      case 'classified': return 'bg-category-classifieds hover:bg-opacity-90';
      case 'business': return 'bg-category-business hover:bg-opacity-90';
      case 'personal': return 'bg-category-personal hover:bg-opacity-90';
      case 'banner': return 'bg-category-banners hover:bg-opacity-90';
      default: return '';
    }
  };
  
  if (loading) {
    return (
      <MainLayout category="default">
        <div className="p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          
          <div className="flex space-x-2 mt-6">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !item) {
    return (
      <MainLayout category="default">
        <div className="p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-2">Not Found</h2>
              <p className="text-gray-500 mb-6">The item you're looking for doesn't exist or has been removed</p>
              <Button onClick={() => navigate('/')}>Return to Home</Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout category={getCategoryTheme(item.type)}>
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
        
        {item.image && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-auto" />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-500">
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span className="capitalize">{item.category}</span>
          {item.location && (
            <>
              <span>•</span>
              <span>{item.location}</span>
            </>
          )}
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{item.description}</p>
          
          {item.price && (
            <div className="mt-4">
              <h2 className="font-semibold mb-1">Price</h2>
              <p className="text-xl font-bold text-green-600">${item.price.toFixed(2)}</p>
            </div>
          )}
        </div>
        
        {item.contactInfo && (
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <h2 className="font-semibold mb-2">Contact Information</h2>
            <p className="text-gray-700">{item.contactInfo}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
            <Flag className="h-4 w-4 mr-1" />
            Report
          </Button>
        </div>
        
        {/* Call to action button based on item type */}
        {item.type === 'event' && (
          <div className="mt-6">
            <Button className={`w-full ${getButtonColor(item.type)}`}>
              RSVP to Event
            </Button>
          </div>
        )}
        
        {item.type === 'classified' && (
          <div className="mt-6">
            <Button className={`w-full ${getButtonColor(item.type)}`}>
              Contact Seller
            </Button>
          </div>
        )}
        
        {item.type === 'business' && (
          <div className="mt-6">
            <Button className={`w-full ${getButtonColor(item.type)}`}>
              Visit Business
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DetailsPage;
