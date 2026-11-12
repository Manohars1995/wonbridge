import { createBrowserRouter } from "react-router-dom";
import type { JSX } from "react";

import ProtectedRoute from "@/protectedRoute/Protected";
import PublicRoute from "@/protectedRoute/PublicRoute";

import Layout from "@/Layout";
import Signin from "@/pages/sign-in";
import NotFoundPage from "@/pages/FallBackPages/404-pageNotFound";
import ForbiddenPage from "@/pages/FallBackPages/403-Forbidden";
import UnauthorizedPage from "@/pages/FallBackPages/401-Unauthorized";


import Admins from "@/pages/admins";
import SupplierForm from "@/pages/suppliers";
import Profile from "@/pages/profile";
import Dashboard from "@/pages/Dashboard";
import RecordLogs from "@/pages/logs";
import Managers from "@/pages/managers";
import Staff from "@/pages/staff";
import Customers from "@/pages/customers";
import Suppliers from "@/pages/suppliers";
import AdminSettings from "@/pages/settings";
import TransitHistory from "@/pages/transit-history";
import LandingPage from "@/pages/LandingPage";
import Terms from "./components/LandingPage/Terms";
import Privacy from "./components/LandingPage/Privacy";
import Refund from "./components/LandingPage/Refund";
import PrivacyPolicyPage from "@/components/LandingPage/PrivacyPolicyPage";
import Weighments from "./pages/weighments";
import MissedWeighments from "./pages/weighments-missed";

export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  STAFF: "supervisor",
  SUPERADMIN: "super_admin"
};

const withRoleProtection = (
  element: JSX.Element,
  allowedRoles: string[]
): JSX.Element => (
  <ProtectedRoute element={element} allowedRoles={allowedRoles} />
);

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <PublicRoute element={<Signin />} />
  },
  { path: "/home", element: <LandingPage /> },
  { path: "/features", element: <LandingPage /> },  
{ path: "/pricing",  element: <LandingPage /> },  
{ path: "/contact",  element: <LandingPage /> },  
  { path: "/terms", element: <Terms /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/refund", element: <Refund /> },
  { path: "/privacy-policy", element: <PrivacyPolicyPage /> },

  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: withRoleProtection(<Dashboard />, [
          ROLES.ADMIN,
          ROLES.MANAGER,
          ROLES.STAFF,
          ROLES.SUPERADMIN
        ])
      },

      {
        path: "admins",
        element: withRoleProtection(<Admins />, [ROLES.ADMIN, ROLES.SUPERADMIN])
      },
      {
        path: "admins/:clientId/:mineId",
        element: withRoleProtection(<SupplierForm />, [
          ROLES.ADMIN,
          ROLES.SUPERADMIN
        ])
      },
      {
        path: "managers",
        element: withRoleProtection(<Managers />, [
          ROLES.ADMIN,
          ROLES.SUPERADMIN
        ])
      },
      {
        path: "staff",
        element: withRoleProtection(<Staff />, [
          ROLES.ADMIN,
          ROLES.MANAGER,
          ROLES.SUPERADMIN
        ])
      },
      {
        path: "customers",
        element: withRoleProtection(<Customers />, [
          ROLES.ADMIN,
          ROLES.SUPERADMIN,
          ROLES.MANAGER,
          ROLES.STAFF
        ])
      },
      {
        path: "suppliers",
        element: withRoleProtection(<Suppliers />, [
          ROLES.ADMIN,
          ROLES.SUPERADMIN,
          ROLES.STAFF
        ])
      },
      {
        path: "logs",
        element: withRoleProtection(<RecordLogs />, [
          ROLES.ADMIN,
          ROLES.SUPERADMIN
        ])
      },
      {
        path: "transit-history/:id",
        element: withRoleProtection(<TransitHistory />, [
          ROLES.ADMIN,
          ROLES.SUPERADMIN
        ])
      },
      {
        path: "profile",
        element: withRoleProtection(<Profile />, [
          ROLES.ADMIN,
          ROLES.MANAGER,
          ROLES.STAFF,
          ROLES.SUPERADMIN
        ])
      },
      {
        path: "dashboard",
        element: withRoleProtection(<Dashboard />, [
          ROLES.ADMIN,
          ROLES.MANAGER,
          ROLES.STAFF,
          ROLES.SUPERADMIN
        ])
      },
      {
        path: "settings",
        element: withRoleProtection(<AdminSettings />, [
          ROLES.ADMIN,
          ROLES.SUPERADMIN
        ])
      },
      {
        path: "weighments/:id",
        element: withRoleProtection(<Weighments />, [
          ROLES.ADMIN,
          ROLES.SUPERADMIN
        ])
      },
      {
        path: "missed/weighments/:id",
        element: withRoleProtection(<MissedWeighments />, [
          ROLES.ADMIN,
          ROLES.SUPERADMIN
        ])
      },

      { path: "403", element: <ForbiddenPage /> },
      { path: "401", element: <UnauthorizedPage /> }
    ]
  }
]);

export default router;
