// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdTo2n7C7keA15kZ0v9aNiNkXPXjLI_yM",
  authDomain: "innerquest-72a4b.firebaseapp.com",
  projectId: "innerquest-72a4b",
  storageBucket: "innerquest-72a4b.appspot.com", // (fix: should be .appspot.com)
  messagingSenderId: "1026743261155",
  appId: "1:1026743261155:web:aaa569eb529f95599132d6",
  measurementId: "G-FKT2XX1FEN"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
// export const auth = getAuth(firebaseApp);
// export const db = getFirestore(firebaseApp); 