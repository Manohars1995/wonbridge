import { createContext, useState, useEffect } from "react";
import { getAuthenticatedUser } from "@/services/authService";
import { registerLogoutFunction } from "@/services/api";
import { logout } from "@/services/auth/auth";

// --- Types ---
type UserDetails = {
  company_name: string;
  image: string;
  full_name: string;
};

type WonBridgeContextType = {
  isLoggedIn: boolean;
  isCheckingAuth: boolean;
  activeTab: string;
  theme: string;
  userRole: string;
  userID: string;
  userDetails: UserDetails;

  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setActiveTab: (activeTab: string) => void;
  setTheme: (theme: string) => void;
  setUserRole: (role: string) => void;
  setUserID: (ID: string) => void;
  logoutHandler: () => void;
  setUserDetails: (details: UserDetails) => void;
};

const WonBridgeContext = createContext<WonBridgeContextType>({
  isLoggedIn: false,
  isCheckingAuth: true,
  activeTab: "dashboard",
  theme: "light",
  userRole: "",
  userID: "",
  userDetails: {
    company_name: "",
    image: "",
    full_name: ""
  },

  setIsLoggedIn: () => {},
  setActiveTab: () => {},
  setTheme: () => {},
  setUserRole: () => {},
  setUserID: () => {},
  logoutHandler: () => {},
  setUserDetails: () => {}
});

const WonBridgeContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState("light");
  const [userRole, setUserRole] = useState("");
  const [userID, setUserID] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetails>({
    company_name: "",
    image: "",
    full_name: ""
  });

  /* -----------------------------------
     Logout Handler
  ----------------------------------- */
  const logoutHandler = async () => {
    try {
      await logout();
    } catch {
      // ignore
    } finally {
      setIsLoggedIn(false);
      setUserRole("");
      setUserID("");
      setUserDetails({ company_name: "", image: "", full_name: "" });
      window.location.replace("/signin");
    }
  };

  /* -----------------------------------
     Session Initialization
  ----------------------------------- */
  useEffect(() => {
    const initSession = async () => {
      try {
        const user = await getAuthenticatedUser();
        console.log(user,'sdhvbsdvsg')

        setUserRole(user.role);
        setUserID(user.reference_id || user._id);
        setUserDetails({
          company_name: user?.profile?.company_name || "",
          image: user?.profile?.image || "",
          full_name: user?.profile?.full_name || ""
        });

        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    initSession();
  }, []);

  /* -----------------------------------
     Register logout for interceptor
  ----------------------------------- */
  useEffect(() => {
    registerLogoutFunction(logoutHandler);
  }, []);

  /* -----------------------------------
     Persist active tab
  ----------------------------------- */
  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) setActiveTab(storedTab);
  }, []);

  const onSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const contextValues: WonBridgeContextType = {
    isLoggedIn,
    isCheckingAuth,
    activeTab,
    theme,
    userRole,
    userID,
    userDetails,
    setIsLoggedIn,
    setActiveTab: onSetActiveTab,
    setTheme,
    setUserRole,
    setUserID,
    logoutHandler,
    setUserDetails
  };

  return (
    <WonBridgeContext.Provider value={contextValues}>
      {children}
    </WonBridgeContext.Provider>
  );
};

export { WonBridgeContext };
export default WonBridgeContextProvider;