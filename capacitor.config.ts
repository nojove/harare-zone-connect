
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8bf41197a8ef49c5ac843a4d49cdfdde',
  appName: 'harare-zone-connect',
  webDir: 'dist',
  server: {
    url: 'https://8bf41197-a8ef-49c5-ac84-3a4d49cdfdde.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000
    }
  }
};

export default config;
