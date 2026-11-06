import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { getSession } from "./auth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();

  if (!getSession()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
