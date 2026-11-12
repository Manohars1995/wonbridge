import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { WonBridgeContext } from "@/store/WonBridge-Context";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

export default function ProtectedRoute({
  element,
  allowedRoles,
}: ProtectedRouteProps) {

  const { isLoggedIn, userRole, isCheckingAuth } =
    useContext(WonBridgeContext);
    console.log(userRole,'roleeee')

  // Wait until auth check finishes
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  

  // Logged in but wrong role
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/403" replace />;
  }

  // Authorized
  return element;
}