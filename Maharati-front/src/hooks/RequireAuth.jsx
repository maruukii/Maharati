import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { useState, useEffect } from "react";

const RequireAuth = (props) => {
  const { auth } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [auth]);
  if (!isLoading) {
    return props.allowedRole.includes(auth?.user?.Role) ? (
      props.children
    ) : auth?.accessToken ? (
      <Navigate to="/" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
};

export default RequireAuth;
