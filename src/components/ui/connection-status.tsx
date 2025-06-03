
import { FC, useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

interface ConnectionStatusProps {
  onRetry?: () => void;
}

const ConnectionStatus: FC<ConnectionStatusProps> = ({ onRetry }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast('Connection restored!', {
        description: 'You are back online. Syncing data...'
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast('Connection lost', {
        description: 'You are now offline. The app will continue to work.'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    
    // Test connection
    try {
      await fetch(window.location.origin, { method: 'HEAD' });
      setIsOnline(true);
      onRetry?.();
    } catch {
      setIsOnline(false);
    } finally {
      setIsRetrying(false);
    }
  };

  if (isOnline) {
    return (
      <div className="flex items-center text-green-600 text-sm">
        <Wifi className="h-4 w-4 mr-1" />
        <span>Online</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg p-2">
      <div className="flex items-center text-orange-600 text-sm">
        <WifiOff className="h-4 w-4 mr-1" />
        <span>Offline Mode</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRetry}
        disabled={isRetrying}
        className="ml-2"
      >
        {isRetrying ? (
          <RefreshCw className="h-3 w-3 animate-spin" />
        ) : (
          'Retry'
        )}
      </Button>
    </div>
  );
};

export default ConnectionStatus;
