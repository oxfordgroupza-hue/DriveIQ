import { initializeApp, getApp, getApps } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCi6OymyWdeWZY2moZGIP4vhJTZ0YLaXt0",
  authDomain: "driveiq-dc201.firebaseapp.com",
  projectId: "driveiq-dc201",
  storageBucket: "driveiq-dc201.firebasestorage.app",
  messagingSenderId: "366311131607",
  appId: "1:366311131607:web:ed0682ebad527e3a626392",
  measurementId: "G-HEP756WE13",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export async function initAnalytics() {
  try {
    const { isSupported, getAnalytics } = await import("firebase/analytics");
    if (await isSupported()) {
      return getAnalytics(firebaseApp);
    }
  } catch (err) {
    // ignore analytics init errors
  }
  return null;
}
