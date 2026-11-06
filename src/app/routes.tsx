import { createBrowserRouter, Navigate } from "react-router";
import ProtectedRoute from "./auth/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyEventsPage from "./pages/MyEventsPage";
import RegisterPage from "./pages/RegisterPage";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/register", Component: RegisterPage },
  { path: "/login", Component: LoginPage },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/events",
    element: (
      <ProtectedRoute>
        <EventsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-events",
    element: (
      <ProtectedRoute>
        <MyEventsPage />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
