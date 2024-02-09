import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDpYd_vjnCYCw5AZo_u92CRShP12BwQFgQ",
  authDomain: "tinyify-2cba0.firebaseapp.com",
  projectId: "tinyify-2cba0",
  storageBucket: "tinyify-2cba0.appspot.com",
  messagingSenderId: "794655326549",
  appId: "1:794655326549:web:986dd36166d962e70fefdc"
};

export const app = initializeApp(firebaseConfig);