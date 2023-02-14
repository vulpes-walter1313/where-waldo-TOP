import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7PHlcOPw_nl9VlnuASUPYUJtmnYyi2sg",
  authDomain: "where-waldo-a6530.firebaseapp.com",
  projectId: "where-waldo-a6530",
  storageBucket: "where-waldo-a6530.appspot.com",
  messagingSenderId: "319030369246",
  appId: "1:319030369246:web:8e6c7dd1ea61ed32c71b4f"
};

type FirebaseConfigType = typeof firebaseConfig;

function createFirebaseApp(config: FirebaseConfigType) {
  try {
    return getApp();
  } catch {
    return initializeApp(config)
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);