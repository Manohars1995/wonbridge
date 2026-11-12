import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from 'sonner';

import WonBridgeContextProvider from "@/store/WonBridge-Context";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WonBridgeContextProvider>
      <App />
      <Toaster position="top-right" richColors />
    </WonBridgeContextProvider>
  </StrictMode>
);
