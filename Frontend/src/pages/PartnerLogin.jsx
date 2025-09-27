import React from 'react';
import '../styles/variables.css';
import '../styles/auth.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const PartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "https://food-reel-project-2.onrender.com/api/auth/food-partner/login",
        { email, password },
        { withCredentials: true }
      );

      // console.log(response.data);

      // Show success toast
      toast.success("Login Successful! 🎉", {
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

      // Redirect after short delay to let toast show
      setTimeout(() => {
        navigate('/create-food');
      }, 1000);

    } catch (error) {
      // console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };


  return (
    <div className="auth-root">
       <Link to='/' id="back_icon">←</Link>
      <ToastContainer/>
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Food partner sign in</h2>
          <p className="auth-sub">Access your partner dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input className="input" name="email" placeholder="partner@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input className="input" name="password" placeholder="Your password" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Sign in</button>
            <Link to='/food-partner/register' type="button" className="btn secondary">Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PartnerLogin