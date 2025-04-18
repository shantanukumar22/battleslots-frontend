import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or show a loader if you want

  return user ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
