
import { FC, useState } from 'react';
import { useSuperAdmin } from '@/contexts/SuperAdminContext';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Lock, EyeOff, LogOut } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

const SuperAdminDashboard: FC = () => {
  const { isSuperAdmin, isAllowedDevice, stealthMode, toggleStealthMode, triggerRemoteDeauth } = useSuperAdmin();
  const [deauthEmail, setDeauthEmail] = useState('');
  const [showDeauthDialog, setShowDeauthDialog] = useState(false);

  // If not super admin or not allowed device, show restricted access
  if (!isSuperAdmin || !isAllowedDevice) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Shield className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-red-600">Access Restricted</h1>
          <p className="text-gray-600 mt-2">
            You do not have permission to access the Super Admin dashboard.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            This feature is restricted to authorized personnel and devices only.
          </p>
        </div>
      </MainLayout>
    );
  }

  const handleRemoteDeauth = async () => {
    if (!deauthEmail) {
      toast.error('Please enter an email address');
      return;
    }
    
    await triggerRemoteDeauth(deauthEmail);
    setShowDeauthDialog(false);
    setDeauthEmail('');
  };

  return (
    <MainLayout category="business">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
            <p className="text-sm text-gray-500">
              Device ID: {localStorage.getItem('device_id') || 'Unknown'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={stealthMode ? "destructive" : "outline"}
              size="sm"
              onClick={toggleStealthMode}
            >
              <EyeOff className="h-4 w-4 mr-1" />
              {stealthMode ? "Exit Stealth" : "Stealth Mode"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-red-500" />
                Security Controls
              </CardTitle>
              <CardDescription>Manage access and security</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => setShowDeauthDialog(true)}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Remote Deauthentication
              </Button>
            </CardContent>
            <CardFooter className="text-xs text-gray-500">
              Use with caution. Actions are logged.
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={showDeauthDialog} onOpenChange={setShowDeauthDialog}>
        <DialogContent className="bg-red-50 border-red-200">
          <DialogHeader>
            <DialogTitle className="text-red-600">Remote Deauthentication</DialogTitle>
            <DialogDescription className="text-red-800">
              This will force logout the user from all devices.
              They will need to verify their email to regain access.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter user email"
              value={deauthEmail}
              onChange={(e) => setDeauthEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeauthDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoteDeauth}>
              Proceed with Deauthentication
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default SuperAdminDashboard;
