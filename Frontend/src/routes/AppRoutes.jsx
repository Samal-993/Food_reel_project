import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import PartnerRegister from "../pages/PartnerRegister";
import PartnerLogin from "../pages/PartnerLogin";
import Profile from "../food-partner/profile";
import Home from "../general/Home";
import CreateFood from "../food-partner/CreateFoodPartner";
import Dashbord from "../general/Dashboard";

import ProtectedRoute from "../pages/protectedRoute";

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("https://food-reel-project-2.onrender.com/api/auth/check-login", {
          withCredentials: true,
        });
        setIsLoggedIn(res.data.loggedIn);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) return <div>Loading...</div>; // optional loading

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />

        {/* Root route */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <PartnerLogin />}
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashbord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-food"
          element={
            <ProtectedRoute>
              <CreateFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-partner/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

