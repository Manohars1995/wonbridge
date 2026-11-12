// protectedRoute/PublicRoute.tsx

import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { WonBridgeContext } from "@/store/WonBridge-Context";

interface PublicRouteProps {
  element: JSX.Element;
}

export default function PublicRoute({ element }: PublicRouteProps) {
  const { isLoggedIn } = useContext(WonBridgeContext);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
}