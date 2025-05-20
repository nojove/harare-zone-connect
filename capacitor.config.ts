
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8bf41197a8ef49c5ac843a4d49cdfdde',
  appName: 'harare-zone-connect',
  webDir: 'dist',
  server: {
    url: 'https://www.renewableenergysolutions.co.zw',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000
    }
  }
};

export default config;
