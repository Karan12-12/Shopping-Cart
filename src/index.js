import React from "react";
import "./index.css";
import App from "./App";
import * as ReactDOMClient from "react-dom/client";

import "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCfZKtejbTnL4v8DDfdqCIVlVvCLSUKhaE",
  authDomain: "cart-4ff11.firebaseapp.com",
  projectId: "cart-4ff11",
  storageBucket: "cart-4ff11.appspot.com",
  messagingSenderId: "364468757904",
  appId: "1:364468757904:web:8f2872268dae33bdf97f15",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
