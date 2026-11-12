import { useLocation, Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";

import Header from "@/shared/components/Navigation/Header.tsx";
import Sidenav from "@/shared/components/Navigation/Sidenav.tsx";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import navItems from "@/shared/components/Navigation/SideNavItems";
import BurgerSideNav from "@/shared/components/Navigation/Hamburger/HamburgerMenu";

const Layout = () => {
  const location = useLocation();

  const { setActiveTab } = useContext(WonBridgeContext) as {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  };

  const getTabFromPath = (pathname: string) => {
    const segments = pathname.split("/");
    return segments[1] || "dashboard";
  };

  useEffect(() => {
    const tab = getTabFromPath(location.pathname);

    const matchedItem = navItems.find((item) => item.key === tab);

    // Avoid setting tab for fallback pages
    const fallbackPages = ["403", "404"];
    if (matchedItem && !fallbackPages.includes(matchedItem?.key)) {
      setActiveTab(matchedItem?.key);
    }
  }, [location.pathname, setActiveTab]);

  return (
  <div translate="no" className="notranslate flex w-full h-screen bg-[var(--background-paper)] text-[var(--text-primary)] p-2 overflow-hidden">
    {/* Desktop Sidebar */}
    <aside className="hidden md:block w-20 bg-[var(--background-default)] rounded-lg shrink-0">
      <Sidenav />
    </aside>

    {/* Burger Menu on Mobile */}
    <aside className="md:hidden shrink-0">
      <BurgerSideNav />
    </aside>

    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header className="h-13 flex shrink-0">
        <Header />
      </header>

      <main className="flex-1 min-w-0 overflow-hidden pl-2 rounded-lg">
        <Outlet />
      </main>
    </div>
  </div>
);
};

export default Layout;
