# Gokarna Trip Expense Tracker

A beautiful, mobile-first expense tracker for your Gokarna trip with **real-time sync** across all devices.

## Features
- **Track Expenses**: Add expenses with amount, category, date/time, and comments.
- **Real-time Sync**: All users see the same expenses instantly using Firebase.
- **Visual Overview**: See total spent and recent transactions.
- **Premium Design**: Dark mode with glassmorphism and smooth animations.
- **IST Time Support**: Uses WorldTimeAPI for accurate Indian Standard Time.

## Setup Firebase

Before deploying, you need to set up Firebase:

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Name it "gokarna-trip" (or any name you prefer)
   - Follow the setup wizard

2. **Create a Firestore Database**:
   - In your Firebase project, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in **test mode**" (for now)
   - Select a location (choose one close to India, like `asia-south1`)

3. **Get Your Firebase Config**:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click the web icon (`</>`)
   - Register your app
   - Copy the `firebaseConfig` object

4. **Update `app/firebase.ts`**:
   - Replace the placeholder values with your actual Firebase config

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploy to Vercel

1. **Push to GitHub** (already done)
2. **Go to Vercel**:
   - Import your GitHub repository
   - Click "Deploy"
3. **Add Environment Variables** (Optional - for production security):
   - In Vercel project settings, add your Firebase config as environment variables
   - Update `firebase.ts` to use `process.env` variables

## Security Note

Currently using Firebase in **test mode** which allows anyone to read/write. For production:
1. Go to Firestore Rules in Firebase Console
2. Update to:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{expense} {
      allow read, write: if true; // Change this for production
    }
  }
}
```
