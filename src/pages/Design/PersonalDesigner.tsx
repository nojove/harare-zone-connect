
import { FC } from 'react';
import MainLayout from '@/components/MainLayout';
import DesignEditor from '@/components/DesignEditor/DesignEditor';
import { useNavigate } from 'react-router-dom';

const PersonalDesigner: FC = () => {
  const navigate = useNavigate();

  const handleSaveDesign = (designData: any) => {
    console.log('Saving personal design:', designData);
    // In a real app, you would save to Supabase or other storage
  };
  
  const handlePublishDesign = (designData: any) => {
    console.log('Publishing personal design:', designData);
    // Navigate to preview or publish flow
    navigate('/personal');
  };

  return (
    <MainLayout category="personal" showTopNavigation={false}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Create Personal Post</h1>
        <p className="text-gray-600 mb-6">Design your personal post with our drag-and-drop editor.</p>
        
        <DesignEditor 
          category="personal" 
          onSave={handleSaveDesign}
          onPublish={handlePublishDesign}
        />
      </div>
    </MainLayout>
  );
};

export default PersonalDesigner;
