
import { FC } from 'react';
import MainLayout from '@/components/MainLayout';
import DesignEditor from '@/components/DesignEditor/DesignEditor';
import { useNavigate } from 'react-router-dom';

const EventDesigner: FC = () => {
  const navigate = useNavigate();

  const handleSaveDesign = (designData: any) => {
    console.log('Saving event design:', designData);
    // In a real app, you would save to Supabase or other storage
  };
  
  const handlePublishDesign = (designData: any) => {
    console.log('Publishing event design:', designData);
    // Navigate to preview or publish flow
    navigate('/events');
  };

  return (
    <MainLayout category="events" showTopNavigation={false}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Create Event Announcement</h1>
        <p className="text-gray-600 mb-6">Design your event announcement with our drag-and-drop editor.</p>
        
        <DesignEditor 
          category="events" 
          onSave={handleSaveDesign}
          onPublish={handlePublishDesign}
        />
      </div>
    </MainLayout>
  );
};

export default EventDesigner;
