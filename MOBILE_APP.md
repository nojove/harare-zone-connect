
# Mobile App Build Instructions

This document provides instructions on how to build and distribute the mobile app version of Harare Zone Connect.

## What is this app?

The Harare Zone Connect mobile app is a wrapper around your website (www.renewableenergysolutions.co.zw) that allows users to access your content through a native mobile application. The app loads content directly from your website, so any updates you make to your website will automatically appear in the app without needing to update the APK.

## Prerequisites

To build the APK, you need:

- Node.js and npm installed
- Java Development Kit (JDK) 11 or newer
- Android SDK and build tools (via Android Studio)*
- Git installed
- Basic command line knowledge

*Note: If your computer cannot run Android Studio, see the "Alternative Build Methods" section below.

## Building the APK

### Option 1: Using the build script (Recommended)

1. Clone this repository to your local machine:
   ```
   git clone <your-repository-url>
   cd <repository-directory>
   ```

2. Make the build script executable:
   ```
   chmod +x build-apk.sh
   ```

3. Run the build script:
   ```
   ./build-apk.sh
   ```

4. Once the build completes, find your APK at:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Option 2: Manual steps

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

4. Build the web application:
   ```
   npm run build
   ```

5. Sync the web application with Capacitor:
   ```
   npx cap sync android
   ```

6. Build the Android APK:
   ```
   cd android
   ./gradlew assembleDebug
   ```

7. Find your APK at:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

## Alternative Build Methods (For Computers Without Android Studio)

If your computer cannot run Android Studio due to hardware limitations, consider these alternatives:

### Option 1: Use a cloud-based build service
1. Push your code to a GitHub repository
2. Sign up for a free account on services like:
   - [AppCircle](https://appcircle.io/)
   - [Codemagic](https://codemagic.io/)
   - [Bitrise](https://www.bitrise.io/)
3. Connect your GitHub repo to the service
4. Configure the build to generate an Android APK
5. Download the resulting APK

### Option 2: Use a friend's computer
1. Copy this project to a USB drive
2. On a computer with Android Studio installed, run the build script
3. Copy the resulting APK back to your USB drive

### Option 3: Use a virtual machine or cloud development environment
1. Sign up for a service like [GitPod](https://www.gitpod.io/) or [GitHub Codespaces](https://github.com/features/codespaces)
2. Set up a development environment with Android SDK
3. Build the APK in the cloud
4. Download the resulting APK

### Option 4: Pre-built APK (Best for non-technical users)
If you received a pre-built APK from a developer, simply:
1. Copy the APK file to your Android device
2. Enable "Install from Unknown Sources" in your device settings
3. Tap the APK file to install it

## Testing the APK

You can install the APK on your Android device by:

1. Enabling "Install from Unknown Sources" in your device settings
2. Transferring the APK to your device via USB, email, or cloud storage
3. Tapping on the APK file on your device to install it

Alternatively, you can use ADB to install directly from your computer:
```
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Distributing the App

### Option 1: Direct APK sharing
You can distribute the APK directly to users through:
- File sharing services (Google Drive, Dropbox)
- Email attachments
- Direct download from your website
- WhatsApp or other messaging apps

### Option 2: Google Play Store
To publish on Google Play Store:

1. Create a Google Play Developer account (one-time $25 fee)
2. Sign your APK with a release key:
   ```
   cd android
   ./gradlew assembleRelease
   ```
3. Create a Play Store listing and follow the submission process
4. Upload your signed APK or App Bundle

## Updating the App

### Content Updates
Since the app loads content directly from your website, any changes you make to your website content will automatically appear in the app without users needing to update.

### App Structure Updates
If you need to update the app structure or functionality:
1. Make your changes to the code
2. Rebuild the APK following the steps above
3. Distribute the new APK to users

## Need Help?

If you're having trouble building the APK due to hardware limitations, consider:
1. Reaching out to a local tech community or freelancer who might have access to better hardware
2. Using a service like [Fiverr](https://www.fiverr.com/) to hire someone to build the APK for you
3. Looking into cloud-based Android development environments which can run on any computer with a web browser
