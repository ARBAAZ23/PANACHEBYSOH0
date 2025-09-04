import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from 'react-router-dom';
import ShopContextProvider from "./contexts/ShopContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId="908885347411-u2jq77ksvtmdiaqp0bpjl5ib8a1gk3sp.apps.googleusercontent.com">
    <ShopContextProvider>
          <App />
    </ShopContextProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
