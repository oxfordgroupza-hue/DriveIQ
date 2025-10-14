import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  setPersistence,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  Auth,
} from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  Firestore,
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCi6OymyWdeWZY2moZGIP4vhJTZ0YLaXt0",
  authDomain: "driveiq-dc201.firebaseapp.com",
  projectId: "driveiq-dc201",
  storageBucket: "driveiq-dc201.firebasestorage.app",
  messagingSenderId: "366311131607",
  appId: "1:366311131607:web:ed0682ebad527e3a626392",
  measurementId: "G-HEP756WE13",
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

// Auth with durable persistence
export const auth: Auth = getAuth(firebaseApp);
setPersistence(auth, indexedDBLocalPersistence).catch(() =>
  setPersistence(auth, browserLocalPersistence),
);

// Firestore with local cache where available
let _db: Firestore;
try {
  _db = initializeFirestore(firebaseApp, {
    localCache: persistentLocalCache(),
  });
} catch {
  _db = getFirestore(firebaseApp);
}
export const db = _db;

export async function initAnalytics() {
  try {
    const { isSupported, getAnalytics } = await import("firebase/analytics");
    if (await isSupported()) {
      return getAnalytics(firebaseApp);
    }
  } catch (err) {}
  return null;
}
