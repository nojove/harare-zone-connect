
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8bf41197a8ef49c5ac843a4d49cdfdde',
  appName: 'Harare Zone Connect',
  webDir: 'dist',
  // Removed external server URL - app will now use local bundle
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP'
    },
    StatusBar: {
      style: 'DEFAULT',
      backgroundColor: '#ffffff'
    }
  }
};

export default config;
