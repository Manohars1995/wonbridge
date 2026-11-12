import { useContext, useEffect, type JSX } from "react";
import { RouterProvider } from "react-router-dom";

import { WonBridgeContext } from "@/store/WonBridge-Context";
import { registerLogoutFunction } from "@/services/api";

import "./App.css";

import router from "./Router";

function App(): JSX.Element {
  const { logout } = useContext(WonBridgeContext);
  useEffect(() => {
    registerLogoutFunction(logout);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
