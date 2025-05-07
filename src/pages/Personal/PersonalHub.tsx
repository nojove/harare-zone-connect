
import { FC } from 'react';
import MainLayout from '@/components/MainLayout';

const PersonalHub: FC = () => {
  return (
    <MainLayout category="personal">
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Personal Hub</h1>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            Welcome to your Personal Hub! This is where you can manage your personal posts and connections.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalHub;
