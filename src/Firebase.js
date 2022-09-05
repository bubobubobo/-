import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// .env를 사용해 config 환경변수들을 저장
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

// firebase app
const app = initializeApp(firebaseConfig);

export default app;

// firebase auth
export const auth = getAuth(app);
