
import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Share2, Flag, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';

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
  const { session } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [item, setItem] = useState<ItemData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Check if ID is a sample ID (for demo purposes)
        if (id?.startsWith('sample-')) {
          // Generate sample data based on ID
          if (id.startsWith('sample-e')) {
            // Sample event
            const sampleEvent: ItemData = {
              id,
              title: id === 'sample-e1' ? 'Harare International Festival' : 'Business Networking Mixer',
              description: id === 'sample-e1' 
                ? 'Join us for the annual Harare International Festival of Arts featuring local and international musicians, dancers, and artists. This family-friendly event includes workshops, performances, and food stalls representing diverse cultures. Don\'t miss this celebration of creativity and cultural exchange!'
                : 'Connect with professionals across industries in this structured networking event. Perfect for entrepreneurs, job-seekers, and business owners looking to expand their professional network. Features speed networking sessions, business card exchange, and a panel discussion with industry leaders.',
              image: id === 'sample-e1' 
                ? 'https://source.unsplash.com/random/800x600/?festival' 
                : 'https://source.unsplash.com/random/800x600/?networking',
              category: 'Events',
              createdAt: new Date().toISOString(),
              contactInfo: '+263 77 123 4567',
              location: id === 'sample-e1' ? 'Harare Gardens' : 'Meikles Hotel',
              type: 'event'
            };
            setItem(sampleEvent);
          } else {
            // Sample classified
            const sampleClassified: ItemData = {
              id,
              title: id === 'sample-1' ? 'Toyota Hilux 2018 for Sale' : 
                     id === 'sample-2' ? '3-Bedroom House for Rent' : 'Professional Catering Services',
              description: id === 'sample-1' 
                ? 'Well-maintained Toyota Hilux 2018 model. Single owner, full service history available. 80,000 km on the clock. 2.8L diesel engine, 4x4 capability, automatic transmission. Features include air conditioning, power steering, electric windows, and central locking. Minor scratches on rear bumper, otherwise in excellent condition. Price negotiable for serious buyers.'
                : id === 'sample-2'
                ? 'Spacious 3-bedroom house available for rent in quiet Borrowdale neighborhood. Master bedroom en-suite, family bathroom, open-plan kitchen and living area. Secure walled yard with electric gate, borehole, and small garden. 2-car garage, servant\'s quarters. Walking distance to shopping center and schools. Available immediately, minimum 12-month lease.'
                : 'Professional catering services available for all events and occasions. We specialize in both traditional and international cuisine, with options for vegetarian and dietary restrictions. Our services include food preparation, delivery, setup, and service staff if required. We cater for weddings, corporate events, birthdays, and family gatherings. Contact us for a free quote and menu consultation.',
              image: id === 'sample-1' 
                ? 'https://source.unsplash.com/random/800x600/?truck' 
                : id === 'sample-2'
                ? 'https://source.unsplash.com/random/800x600/?house'
                : 'https://source.unsplash.com/random/800x600/?catering',
              category: 'Classifieds',
              createdAt: new Date().toISOString(),
              contactInfo: '+263 77 123 4567',
              price: id === 'sample-1' ? 12500 : id === 'sample-2' ? 800 : undefined,
              location: id === 'sample-1' ? 'Harare Central' : id === 'sample-2' ? 'Borrowdale' : 'All Harare',
              type: 'classified'
            };
            setItem(sampleClassified);
          }
        } else {
          // For demo purposes with regular IDs, create dummy data
          const idNumber = parseInt(id || '0');
          
          if (idNumber >= 1 && idNumber <= 10) {
            // Generate dummy data based on ID
            const dummyTypes: ItemData['type'][] = ['event', 'classified', 'business', 'banner', 'personal'];
            const type = dummyTypes[idNumber % dummyTypes.length];
            
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
        }
        
        setTimeout(() => {
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
  
  const getCategoryTheme = (itemType: ItemData['type']): 'default' | 'classifieds' | 'events' | 'personal' | 'business' | 'banners' => {
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

  const handleReportItem = () => {
    toast("Post has been reported for review", {
      description: "Our team will review this content shortly"
    });
  };

  const handleContactAction = () => {
    if (!session) {
      toast("You need to sign in to contact the seller", {
        description: "Register or sign in for full access"
      });
      navigate('/auth/login');
      return;
    }
    
    toast("Contact request sent", {
      description: "The poster has been notified of your interest"
    });
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
              <Button 
                variant="outline"
                onClick={() => {
                  if (!session) {
                    toast("You need to sign in to make calls");
                    navigate('/auth/login');
                    return;
                  }
                  toast("Calling...");
                }}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  if (!session) {
                    toast("You need to sign in to send messages");
                    navigate('/auth/login');
                    return;
                  }
                  toast("Message sent");
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              toast("Item shared to clipboard", {
                description: "Link has been copied to your clipboard"
              });
            }}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-600"
            onClick={handleReportItem}
          >
            <Flag className="h-4 w-4 mr-1" />
            Report
          </Button>
        </div>
        
        {/* Call to action button based on item type */}
        {item.type === 'event' && (
          <div className="mt-6">
            <Button 
              className={`w-full ${getButtonColor(item.type)}`}
              onClick={handleContactAction}
            >
              RSVP to Event
            </Button>
          </div>
        )}
        
        {item.type === 'classified' && (
          <div className="mt-6">
            <Button 
              className={`w-full ${getButtonColor(item.type)}`}
              onClick={handleContactAction}
            >
              Contact Seller
            </Button>
          </div>
        )}
        
        {item.type === 'business' && (
          <div className="mt-6">
            <Button 
              className={`w-full ${getButtonColor(item.type)}`}
              onClick={handleContactAction}
            >
              Visit Business
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DetailsPage;
