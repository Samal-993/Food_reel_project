import React, { useState } from "react";
import "../styles/variables.css";
import "../styles/auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    //axios post request
    try {
      await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          name: businessName,
          contactName,
          address,
          phone,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Registration Successful! 🎉", {
        icon: <FaCheckCircle color="#fff" size={20} />,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          background: "#4caf50",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "12px",
          padding: "12px 20px",
        },
      });

      setTimeout(() => navigate("/create-food"), 2200);
    } catch (error) {
      toast.error("Registration Failed! ❌", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="auth-root">
    
    <Link to='/' id="back_icon">←</Link>
      <ToastContainer
        position={window.innerWidth < 768 ? "top-center" : "top-right"}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="auth-card">


        <div className="auth-header">
          <h2 className="auth-title">Food partner registration</h2>
          <p className="auth-sub">Register your restaurant or kitchen</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Business Name</label>
            <input
              name="businessName"
              className="input"
              placeholder="Your business name"
            />
          </div>

          <div className="field">
            <label>Contact Name</label>
            <input
              name="contactName"
              className="input"
              placeholder="Owner or contact person"
            />
          </div>

          <div className="field">
            <label>Address</label>
            <input
              name="address"
              className="input"
              placeholder="Business address"
            />
          </div>

          <div className="field">
            <label>Phone</label>
            <input
              name="phone"
              className="input"
              placeholder="Contact phone number"
            />
          </div>

          <div className="field">
            <label>Contact email</label>
            <input
              name="email"
              className="input"
              type="email"
              placeholder="contact@restaurant.com"
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Choose a password"
            />
          </div>

          <div className="actions">
            <button className="btn" type="submit">
              Register
            </button>
            <Link
              to="/food-partner/login"
              type="button"
              className="btn secondary"
            >
              Sign in
            </Link>
          </div>

          <p className="note">Provide valid details. (UI only)</p>
        </form>
      </div>
    </div>
  );
};

export default PartnerRegister;
