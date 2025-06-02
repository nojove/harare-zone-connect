
import { FC, ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface GuestProtectedProps {
  children: ReactNode;
  showSignupPrompt?: boolean;
}

const GuestProtected: FC<GuestProtectedProps> = ({ children, showSignupPrompt = false }) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(showSignupPrompt);

  if (session) {
    return <>{children}</>;
  }

  if (showSignupPrompt) {
    return (
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up Required</DialogTitle>
            <DialogDescription>
              You need to create an account to view detailed information and access all features.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={() => navigate('/auth/register')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Account
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/auth/login')}
            >
              Already have an account? Sign In
            </Button>
            <Button 
              variant="ghost"
              onClick={() => {
                setShowDialog(false);
                navigate(-1);
              }}
            >
              Go Back
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <>{children}</>;
};

export default GuestProtected;
