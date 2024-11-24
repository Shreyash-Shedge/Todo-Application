import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/", "/signup"];
    const userId = localStorage.getItem("userId");

    if (!userId && !publicRoutes.includes(location.pathname)) {
      navigate("/"); 
    }

    const handleStorageChange = (event) => {
      if (event.key === "userId" && event.newValue === null) {
        navigate("/"); 
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, location]);

  return <>{children}</>;
};

export default AuthWrapper;
