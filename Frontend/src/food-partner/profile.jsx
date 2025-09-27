import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

 useEffect(() => {
  axios.get(`https://food-reel-project-2.onrender.com/api/food-partner/${id}`, { withCredentials: true })
    .then(response => {
      const partner = response.data.foodPartner;
      setProfile(partner);
      setVideos(partner.foodItems || []);
      // console.log('Videos fetched:', partner.foodItems);
    })
}, [id]);

  return (
    <div
      className="profile-container"
      style={{
        background: "#000",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}

    >
          <Link to='/' id="back_icon">←</Link>
      {/* Top Section */}
      <div
        className="top-overlay"
        style={{
          marginTop: "32px",
          marginBottom: "16px",
          width: "90%",
          maxWidth: "400px",
          background: "var(--overlay-bg)",
        }}
      >
        <div
          className="profile-avatar"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "var(--accent)",
            margin: "0 auto 12px auto",
          }}
        ></div>
        <div
          className="profile-info"
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <h1
            className="visit-btn"
            style={{
              background: "var(--accent)",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {profile?.name}
          </h1>
          <h1
            className="visit-btn"
            style={{
              background: "var(--accent)",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {profile?.address}
          </h1>
        </div>
        <div
          className="profile-stats"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            marginTop: "8px",
          }}
        >
          <div
            className="profile-stat"
            style={{ textAlign: "center", flex: 1 }}
          >
            <span
              className="profile-stat-label"
              style={{ color: "var(--muted)", fontSize: "15px" }}
            >
              Total Meals
            </span>
            <span
              className="profile-stat-value"
              style={{
                color: "var(--accent)",
                fontWeight: "bold",
                fontSize: "20px",
                display: "block",
              }}
            >
              {profile?.totalMeals}
            </span>
          </div>
          <div
            className="profile-stat"
            style={{ textAlign: "center", flex: 1 }}
          >
            <span
              className="profile-stat-label"
              style={{ color: "var(--muted)", fontSize: "15px" }}
            >
              Customers Served
            </span>
            <span
              className="profile-stat-value"
              style={{
                color: "var(--accent)",
                fontWeight: "bold",
                fontSize: "20px",
                display: "block",
              }}
            >
              {profile?.customersServed}
            </span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div
        className="profile-video-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          padding: "16px",
        }}
      >
        {videos.map((v) => (
          <div key={v.id}>
            <video
              className="profile-grid-video"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src={v.video}
                
            ></video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
