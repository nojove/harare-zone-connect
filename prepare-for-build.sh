
#!/bin/bash

# Prepare script for Harare Zone Connect APK
# This script prepares the web app for APK building without requiring Android Studio

echo "🚀 Preparing Harare Zone Connect for APK building..."
echo "👉 This script will prepare your project to be transferred to another machine for APK building"

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

echo "🤖 Preparing project for Android build..."
if [ ! -d "android" ]; then
    echo "📱 Adding Android platform files..."
    npx cap add android
else
    echo "✅ Android platform already exists."
fi

echo "🔄 Syncing with Capacitor..."
npx cap sync android

echo ""
echo "✅ Project preparation completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Copy the entire project folder to a USB drive"
echo "2. Transfer to a computer with Android Studio installed"
echo "3. On that computer, run: cd android && ./gradlew assembleDebug"
echo "4. The APK will be created at: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "🌐 This APK will load content from: www.renewableenergysolutions.co.zw"
echo ""
