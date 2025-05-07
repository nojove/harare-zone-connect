import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { DirectoryListing } from '../../types';
import { Phone, MessageCircle, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MainLayout from '../../components/MainLayout';

const DirectoryDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<DirectoryListing | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('directory_listings')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        setListing(data);
      } catch (err) {
        console.error('Error fetching listing:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleCall = () => {
    if (listing) {
      window.location.href = `tel:${listing.cell_number}`;
    }
  };

  const handleSMS = () => {
    if (listing) {
      window.location.href = `sms:${listing.cell_number}`;
    }
  };

  const handleEmail = () => {
    // In a real app, you would check if the profile has an email and handle appropriately
    // For now, we'll just show an alert
    alert('Email functionality to be implemented');
  };

  const goBack = () => {
    navigate('/directory');
  };

  return (
    <MainLayout category="default">
      <div className="flex flex-col p-4">
        <Button 
          variant="ghost" 
          className="mb-4 self-start" 
          onClick={goBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
        </Button>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-6" />
            <Skeleton className="h-24 w-full mb-6" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        ) : listing ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{listing.name}</h1>
            
            {listing.business_name && (
              <p className="text-lg text-gray-700">{listing.business_name}</p>
            )}
            
            <div className="flex items-center text-sm text-gray-500">
              <span>{listing.location}</span>
              {listing.service_type && (
                <>
                  <span className="mx-1">•</span>
                  <span>{listing.service_type}</span>
                </>
              )}
            </div>
            
            {listing.bio && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-gray-700">{listing.bio}</p>
              </div>
            )}
            
            <div className="mt-6 grid grid-cols-3 gap-2">
              <Button 
                className="flex items-center justify-center py-6 bg-green-600 hover:bg-green-700"
                onClick={handleCall}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call
              </Button>
              <Button 
                className="flex items-center justify-center py-6 bg-blue-600 hover:bg-blue-700"
                onClick={handleSMS}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                SMS
              </Button>
              <Button 
                className="flex items-center justify-center py-6 bg-purple-600 hover:bg-purple-700"
                onClick={handleEmail}
              >
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium text-gray-700">Listing not found</h2>
            <p className="text-gray-500 mt-2">This listing may have been removed or is not accessible.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DirectoryDetail;
