import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import AuthProvider from "./features/Providers/AuthProvider";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./services/AuthConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <MsalProvider instance={msalInstance}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MsalProvider>
  // </React.StrictMode>
);
