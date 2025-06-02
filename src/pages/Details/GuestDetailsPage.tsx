
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import GuestProtected from '@/components/GuestProtected';

const GuestDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <MainLayout>
      <GuestProtected showSignupPrompt={true}>
        <div></div>
      </GuestProtected>
    </MainLayout>
  );
};

export default GuestDetailsPage;
