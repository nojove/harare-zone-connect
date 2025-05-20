
# Mobile App Build Instructions

This document provides instructions on how to build and distribute the mobile app version of Harare Zone Connect.

## Prerequisites

- Node.js and npm installed
- Git installed
- Basic command line knowledge

## Building the APK

To build the Android APK without Android Studio:

1. Clone this repository to your local machine:
   ```
   git clone <your-repository-url>
   cd <repository-directory>
   ```

2. Install project dependencies:
   ```
   npm install
   ```

3. Add the Android platform if it hasn't been added yet:
   ```
   npx cap add android
   ```

4. Make the build script executable:
   ```
   chmod +x build-apk.sh
   ```

5. Run the build script:
   ```
   ./build-apk.sh
   ```

6. Once the build completes, find your APK at:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

## Distributing the App

### Option 1: Direct APK sharing
You can distribute the APK directly to users through file sharing services, email, or direct download from your website.

### Option 2: Google Play Store
To publish on Google Play Store:

1. Create a Google Play Developer account if you don't have one
2. Sign your APK with a release key
3. Create a release build using:
   ```
   cd android
   ./gradlew assembleRelease
   ```
4. Follow Google Play Console instructions to publish your app

## App Updates

Since the app is configured to load content from your website (www.renewableenergysolutions.co.zw), any updates to the website content will automatically reflect in the app without needing to update the APK.

For app structure or functionality changes, you'll need to rebuild and redistribute the APK.
