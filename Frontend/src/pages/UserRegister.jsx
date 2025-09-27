import React from 'react'
import '../styles/variables.css'
import '../styles/auth.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const UserRegister = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.fullname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        // console.log(name);
        // console.log(email);
        // console.log(password);

        try {
          const response =  await axios.post("http://localhost:3000/api/auth/user/register",{
               fullName:name,
               email,
               password
           },{
               withCredentials:true
           }
   
        )
           
         toast.success("Registation Successful! 🎉", {
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
        navigate('/home');
      }, 1000);
          
        } catch (error) {
           console.error(error);
           toast.error("Registation failed. Please check your credentials.");
        }

    }




  return (
    <div className="auth-root">
       <Link to='/' id="back_icon">←</Link>
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create user account</h2>
          <p className="auth-sub">Minimal account creation for customers</p>
        </div>
       <i id='Back_icon' class="ri-arrow-left-line"></i>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input className="input"name='fullname' placeholder="John Doe" />
          </div>

          <div className="field">
            <label>Email</label>
            <input className="input"name='email' type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input className="input"name="password" type="password" placeholder="Enter a secure password" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Create account</button>
            <Link to='/user/login' type="button" className="btn secondary">Sign in</Link>
          </div>

          <p className="note">By creating an account you agree to the terms. (UI only)</p>
        </form>
      </div>
    </div>
  )
}

export default UserRegister