
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import MainLayout from '../components/MainLayout';
import GuestView from '../components/home/GuestView';
import UserView from '../components/home/UserView';
import { useHomeData } from '../hooks/useHomeData';
import { sampleClassifieds, sampleEvents } from '../data/sampleData';

const Home: FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { categories, featuredBanners, upcomingEvents, featuredClassifieds, loading } = useHomeData();
  
  const navigateToDesigner = (type: string) => {
    if (!session) {
      toast("You need to sign in to create content");
      navigate('/auth/login');
      return;
    }
    navigate(`/design/${type.toLowerCase()}`);
  };
  
  const handleEventClick = (eventId: string) => {
    navigate(`/details/${eventId}`);
  };

  // Render content based on authentication status
  if (!session) {
    return (
      <MainLayout>
        <GuestView 
          sampleClassifieds={sampleClassifieds} 
          sampleEvents={sampleEvents} 
        />
      </MainLayout>
    );
  }

  // Authenticated user view
  return (
    <MainLayout>
      <UserView 
        loading={loading}
        upcomingEvents={upcomingEvents}
        featuredClassifieds={featuredClassifieds}
        navigateToDesigner={navigateToDesigner}
        handleEventClick={handleEventClick}
      />
    </MainLayout>
  );
};

export default Home;
