"use client";

import React, { useState } from "react";
import { slide as BurgerMenu } from "react-burger-menu";
import { useLocation } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import SideNav from "@/shared/components/Navigation/Sidenav";
import "./BurgerStyles.css";

export default function BurgerSideNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]); 

  return (
    <BurgerMenu
      width={120}
      isOpen={menuOpen}
      onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
      customBurgerIcon={<HiOutlineMenuAlt2 />}
      pageWrapId="page-wrap"
      outerContainerId="outer-container"
      className="!bg-[var(--background-default)] text-black"
    >
      <SideNav />
    </BurgerMenu>
  );
}
