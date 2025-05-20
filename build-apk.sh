
#!/bin/bash

# Build APK script for Harare Zone Connect
# This script builds the web app and generates an Android APK

echo "🚀 Starting Harare Zone Connect APK build process..."
echo "👉 This script will create an Android APK that loads your website content"

# Check for required tools
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Building web application..."
npm run build

echo "🤖 Checking for Android platform..."
if [ ! -d "android" ]; then
    echo "📱 Adding Android platform..."
    npx cap add android
else
    echo "✅ Android platform already exists."
fi

echo "🔄 Syncing with Capacitor..."
npx cap sync android

echo "📦 Building Android APK..."
cd android
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ APK build completed successfully!"
    echo "📱 Your APK can be found at: android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📲 To install on a device:"
    echo "   1. Connect your Android device to your computer with USB debugging enabled"
    echo "   2. Run: adb install android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "🌐 This APK will load content from: www.renewableenergysolutions.co.zw"
else
    echo "❌ APK build failed. Please check the error messages above."
fi
