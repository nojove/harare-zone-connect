
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

// Device ID for iTel A56 Pro
const ALLOWED_DEVICE_ID = "XYZ123"; 

interface SuperAdminContextType {
  isSuperAdmin: boolean;
  isAllowedDevice: boolean;
  stealthMode: boolean;
  toggleStealthMode: () => void;
  triggerRemoteDeauth: (email: string) => Promise<void>;
}

const SuperAdminContext = createContext<SuperAdminContextType | undefined>(undefined);

export const SuperAdminProvider = ({ children }: { children: ReactNode }) => {
  const { session, user, signOut } = useAuth();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isAllowedDevice, setIsAllowedDevice] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  // Check if the current user is a super admin
  useEffect(() => {
    const checkSuperAdminStatus = async () => {
      if (!user) return;
      
      try {
        // For this demo, we'll hardcode super admin access for specific users
        // In a real app, you would check against a database table
        const superAdminEmails = ['admin@example.com', 'super@admin.com'];
        const isAdmin = user.email && superAdminEmails.includes(user.email);
        setIsSuperAdmin(isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    
    checkSuperAdminStatus();
  }, [user]);

  // Check device ID
  useEffect(() => {
    // In a real app, you would use Capacitor or another native bridge 
    // to get the actual device ID
    const getDeviceId = async () => {
      // Simulated device ID check
      // In production, use Capacitor Device plugin to get the actual ID
      const simulatedDeviceId = localStorage.getItem('device_id') || 
        Math.random().toString(36).substring(2, 15);
      
      localStorage.setItem('device_id', simulatedDeviceId);
      setDeviceId(simulatedDeviceId);
      
      // Check if this is the allowed device
      const allowed = simulatedDeviceId === ALLOWED_DEVICE_ID;
      setIsAllowedDevice(allowed);
      
      // If super admin but not allowed device, show warning
      if (isSuperAdmin && !allowed) {
        setShowAuthWarning(true);
      }
    };
    
    getDeviceId();
  }, [isSuperAdmin]);

  const toggleStealthMode = () => {
    setStealthMode(prev => !prev);
    toast.success(`Stealth mode ${!stealthMode ? 'enabled' : 'disabled'}`);
  };

  const triggerRemoteDeauth = async (email: string) => {
    try {
      // In a real app, this would send an email with OTP
      // For demo purposes, we'll just simulate a logout
      toast.info(`Sending remote deauth to ${email}...`);
      
      // Simulating API call to trigger remote deauth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Remote deauth triggered successfully');
      
      // Force logout of current session if it's the same user
      if (user?.email === email) {
        await signOut();
      }
      
      return;
    } catch (error) {
      toast.error('Failed to trigger remote deauth');
      console.error(error);
    }
  };

  return (
    <SuperAdminContext.Provider 
      value={{ 
        isSuperAdmin, 
        isAllowedDevice,
        stealthMode,
        toggleStealthMode,
        triggerRemoteDeauth
      }}
    >
      <AlertDialog open={showAuthWarning} onOpenChange={setShowAuthWarning}>
        <AlertDialogContent className="bg-red-50 border-red-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Unauthorized Device</AlertDialogTitle>
            <AlertDialogDescription className="text-red-800">
              This device (ID: {deviceId}) is not authorized to access Super Admin features.
              Only the iTel A56 Pro (ID: {ALLOWED_DEVICE_ID}) is allowed.
              <br /><br />
              If this is your device, please contact support.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => signOut()}>Sign Out</AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowAuthWarning(false)}>
              Continue with Limited Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </SuperAdminContext.Provider>
  );
};

export const useSuperAdmin = () => {
  const context = useContext(SuperAdminContext);
  if (context === undefined) {
    throw new Error('useSuperAdmin must be used within a SuperAdminProvider');
  }
  return context;
};
