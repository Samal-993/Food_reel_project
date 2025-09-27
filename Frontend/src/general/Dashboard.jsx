import React from "react";
import { Link } from "react-router-dom";
import "../general/Dashbord.css";

const Dashbord = () => {
  return (
    <div className="home-container">
      {/* Reel-like Video Section */}
      <div className="video-section">
        <video autoPlay loop muted className="video-bg">
          <source src="/sample-reel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
        <div className="branding">
          <h1>FoodieHub</h1>
          <p>Discover & Share Food Moments</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        {/* User Section */}
        <div className="card user-section">
          <h2>For Users</h2>
          <Link to="/user/register" className="btn primary">
            User Register
          </Link>
          <Link to="/user/login" className="btn secondary">
            User Login
          </Link>
        </div>

        {/* Food Partner Section */}
        <div className="card partner-section">
          <h2>For Food Owners</h2>
          <Link to="/food-partner/register" className="btn primary">
            Partner Register
          </Link>
          <Link to="/food-partner/login" className="btn secondary">
            Partner Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Dashbord;
