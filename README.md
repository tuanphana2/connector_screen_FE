# AI Creation

React + Vite app packaged for Android and iOS with Capacitor.

## Install and run the web app

```sh
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in an `.env` file to the base URL of the backend before using API-backed features.

## Android

Install Android Studio and the Android SDK, then from this directory run:

```sh
npm run cap:android
npx cap open android
```

The first command builds the web app and syncs it into the Android project. Use Android Studio to run it on an emulator or device.

## iOS

iOS builds require macOS with Xcode installed. From this directory on a Mac run:

```sh
npm run cap:ios
npx cap open ios
```

The first command builds the web app and syncs it into the iOS project. Use Xcode to select a simulator or device and run it.

The Capacitor app ID is `com.connector.screen`; change it in `capacitor.config.json` before publishing if you have a different bundle ID.
