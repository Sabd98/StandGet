// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../store/authContext";

export default function PrivateRoute({
  allowedRoles,
}: {
  allowedRoles: ("user" | "admin")[];
}) {
  const { user, isAuthChecked } = useAuth();

  if (!isAuthChecked) {
    // Show loading spinner or skeleton screen
    return <div>Loading...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  !allowedRoles.includes("admin") ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/admin" replace />
  );

  return <Outlet />;
}
