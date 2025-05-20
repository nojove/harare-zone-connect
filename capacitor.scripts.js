
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

// Build APK for Android
const buildApk = () => {
  console.log('🤖 Building Android APK...');
  if (buildAndSync()) {
    console.log('📦 Building debug APK...');
    if (runCommand('cd android && ./gradlew assembleDebug')) {
      console.log('✅ Debug APK built successfully at: android/app/build/outputs/apk/debug/app-debug.apk');
      return true;
    }
  }
  return false;
};

// Build release APK for Android
const buildReleaseApk = () => {
  console.log('🚀 Building Release APK...');
  if (buildAndSync()) {
    console.log('📦 Building release APK...');
    if (runCommand('cd android && ./gradlew assembleRelease')) {
      console.log('✅ Release APK built successfully at: android/app/build/outputs/apk/release/app-release.apk');
      return true;
    }
  }
  return false;
};

// Export functions
module.exports = {
  buildAndSync,
  buildApk,
  buildReleaseApk
};
