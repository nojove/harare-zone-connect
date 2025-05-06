
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper functions for Capacitor workflow
const runCommand = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Command failed: ${command}`);
    return false;
  }
};

// Build and sync the app
const buildAndSync = () => {
  console.log('📦 Building application...');
  if (runCommand('npm run build')) {
    console.log('✅ Build completed');
    console.log('🔄 Syncing with Capacitor...');
    if (runCommand('npx cap sync')) {
      console.log('✅ Capacitor sync completed');
      return true;
    }
  }
  return false;
};

// Export functions
module.exports = {
  buildAndSync
};
