
import { FC } from 'react';
import MainLayout from '@/components/MainLayout';
import DesignEditor from '@/components/DesignEditor/DesignEditor';
import { useNavigate } from 'react-router-dom';

const ClassifiedDesigner: FC = () => {
  const navigate = useNavigate();

  const handleSaveDesign = (designData: any) => {
    console.log('Saving classified design:', designData);
    // In a real app, you would save to Supabase or other storage
  };
  
  const handlePublishDesign = (designData: any) => {
    console.log('Publishing classified design:', designData);
    // Navigate to preview or publish flow
    navigate('/classifieds');
  };

  return (
    <MainLayout category="classifieds" showTopNavigation={false}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Create Classified Ad</h1>
        <p className="text-gray-600 mb-6">Design your classified advertisement with our drag-and-drop editor.</p>
        
        <DesignEditor 
          category="classifieds" 
          onSave={handleSaveDesign}
          onPublish={handlePublishDesign}
        />
      </div>
    </MainLayout>
  );
};

export default ClassifiedDesigner;
