import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/check-login", {
          withCredentials: true,
        });
        setIsLoggedIn(res.data.loggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
