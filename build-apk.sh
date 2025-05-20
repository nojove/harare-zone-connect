
#!/bin/bash

# Build APK script for Harare Zone Connect
# This script builds the web app and generates an Android APK

echo "🏗️ Building web application..."
npm run build

echo "🔄 Syncing with Capacitor..."
npx cap sync android

echo "📦 Building Android APK..."
cd android
./gradlew assembleDebug

echo "✅ APK build completed!"
echo "📱 Your APK can be found at: android/app/build/outputs/apk/debug/app-debug.apk"
