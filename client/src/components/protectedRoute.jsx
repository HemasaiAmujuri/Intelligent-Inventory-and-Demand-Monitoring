import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useContext";

function ProtectedRoute({ children }) {
  const { accessToken } = useAuth();
  const token = localStorage.getItem("token"); // get token from localstorage
  if (!accessToken) {
    // check token exist or not
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
