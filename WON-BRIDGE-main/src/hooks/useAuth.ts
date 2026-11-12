import { useContext } from "react";
import { WonBridgeContext } from "@/store/WonBridge-Context";

export const useAuth = () => {
  console.log("useAuth hook called");
  const { isLoggedIn, userRole, userID, logoutHandler } = useContext(WonBridgeContext);

  return {
    isLoggedIn,
    userRole,
    userID,
    logoutHandler
  };
};
