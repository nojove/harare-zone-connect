import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

// Define the ItemData type
interface ItemData {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: string;
  location?: string;
  date?: string;
  type: 'event' | 'classified' | 'business' | 'banner' | 'personal';
  contact?: string;
  category?: string;
}

const DetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        
        // For demonstration purposes - in a real app, this would be an API call
        // We're using sample data based on the ID
        setTimeout(() => {
          // Generate sample data based on ID
          if (id?.startsWith('sample-e')) {
            // Sample event
            const sampleEvent: ItemData = {
              id: id || '',
              title: id === 'sample-e1' ? 'Harare International Festival' : 'Business Networking Mixer',
              description: id === 'sample-e1' 
                ? 'Annual cultural festival showcasing music, art, and dance from across Zimbabwe and beyond.'
                : 'Connect with local business owners and entrepreneurs in a relaxed setting.',
              image: '/placeholder.svg',
              date: '2023-11-15',
              location: 'Harare Gardens, Harare CBD',
              type: 'event',
              category: 'Entertainment'
            };
            setItem(sampleEvent);
          } else {
            // Sample classified
            const sampleClassified: ItemData = {
              id: id || '',
              title: id === 'sample-1' ? 'Toyota Hilux 2018 for Sale' : 
                     id === 'sample-2' ? '3-Bedroom House for Rent' : 'Professional Catering Services',
              description: id === 'sample-1' 
                ? 'Well-maintained Toyota Hilux, single owner, low mileage, perfect for both city and off-road driving.'
                : id === 'sample-2'
                ? 'Spacious 3-bedroom house in Avondale with garage, garden, and security wall.'
                : 'Professional catering services for all occasions - weddings, corporate events, and private parties.',
              image: '/placeholder.svg',
              price: id === 'sample-1' ? 'USD 25,000' : id === 'sample-2' ? 'USD 800/month' : 'Negotiable',
              location: 'Harare, Zimbabwe',
              type: 'classified',
              contact: '+263 77 123 4567',
              category: id === 'sample-1' ? 'Vehicles' : id === 'sample-2' ? 'Real Estate' : 'Services'
            };
            setItem(sampleClassified);
          }
          
          // For numeric IDs, generate different dummy data
          const idNumber = parseInt(id || '0');
          
          if (idNumber >= 1 && idNumber <= 10) {
            // Generate dummy data based on ID
            const dummyTypes: ItemData['type'][] = ['event', 'classified', 'business', 'banner', 'personal'];
            const type = dummyTypes[idNumber % dummyTypes.length];
            
            const dummyData: ItemData = {
              id: id || '',
              title: `Sample Item ${id}`,
              description: `This is a sample ${type} item with ID ${id}. In a real application, this data would come from a database or API.`,
              image: '/placeholder.svg',
              price: type === 'classified' ? `USD ${idNumber * 100}` : undefined,
              location: 'Harare, Zimbabwe',
              date: type === 'event' ? `2023-12-${idNumber}` : undefined,
              type: type,
              contact: '+263 77 123 4567',
              category: `Category ${idNumber % 5 + 1}`
            };
            setItem(dummyData);
          }
          
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return <MainLayout><p>Loading...</p></MainLayout>;
  }

  if (!item) {
    return (
      <MainLayout>
        <Card className="p-4">
          <p>Item not found.</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Card className="p-4">
        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
        <h2 className="text-2xl font-bold mt-4">{item.title}</h2>
        {item.image && (
          <img src={item.image} alt={item.title} className="mt-2 rounded-md" />
        )}
        <p className="mt-2">{item.description}</p>
        {item.price && <p className="mt-2">Price: {item.price}</p>}
        {item.location && (
          <p className="mt-2">
            <MapPin className="mr-2 inline-block h-4 w-4" />
            Location: {item.location}
          </p>
        )}
        {item.date && (
          <p className="mt-2">
            <Calendar className="mr-2 inline-block h-4 w-4" />
            Date: {item.date}
          </p>
        )}
        {item.contact && <p className="mt-2">Contact: {item.contact}</p>}
        {item.category && <p className="mt-2">Category: {item.category}</p>}
      </Card>
    </MainLayout>
  );
};

export default DetailsPage;
