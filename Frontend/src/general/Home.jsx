import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const navigate = useNavigate()


const handleLogout = async () => {
  const userType = localStorage.getItem("userType");
  const logoutUrl =
    userType === "user"
      ? "http://localhost:3000/api/auth/user/logout"
      : "http://localhost:3000/api/auth/food-partner/logout";

  try {
    await axios.get(logoutUrl, { withCredentials: true });
    // console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    localStorage.removeItem("userType"); // frontend data
    window.location.href = "/"; // redirect to login page
  }
};

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems);
        // console.log(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  async function likeVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: item._id },
      { withCredentials: true }
    );
    if (response.data.like) {
      // console.log("Video Liked");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v
        )
      );
    } else {
      // console.log("Video Unliked");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v
        )
      );
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            // Pause all other videos first
            videoRefs.current.forEach((v) => {
              if (v && v !== video) {
                v.pause();
                v.currentTime = 0; // restart when revisited
                v.muted = true;
              }
            });
            // Play the current one
            video.play();
            video.muted = false;
          } else {
            video.pause();
            video.muted = true;
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  async function saveVideo(item) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.save) {
      // console.log("Video Bookmarked");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount + 1} : v
        )
      );
    } else {
      // console.log("Video Unbookmarked");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount - 1} : v
        )
      );
    }
  } catch (err) {
    console.error(err);
  }
}
  

  return (
    <div className="reels-container">
      
      {videos.map((v, i) => (
        <section className="reel" key={v.id || i}>
          <video
            ref={(el) => (videoRefs.current[i] = el)}
            src={v.video}
            className="reel-video"
            loop
            playsInline
            muted
            onClick={() => toggleAudio(i)}
          />
          {/* Audio popup effect */}

          {/* Gradient overlay for better visibility */}
          <div className="video-overlay"></div>
            <button onClick={handleLogout} className="Logbtn">Logout</button>
          

          {/* Right-side Action Buttons */}
          <div className="side-actions">
            <button
              onClick={() => likeVideo(v)}
              className="action"
              aria-label="Like"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>
            <div className="reel-action__count">
              {v.likeCount ?? v.likeCount ?? v.likes ?? 0}
            </div>

            <button
              onClick={() => saveVideo(v)}
              className="action"
              aria-label="Like"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
              </svg>
            </button>
            <div className="reel-action__count">
              {v.savesCount ?? v.bookmarks ?? v.saves ?? 0}
            </div>
            <button
              onClick={() => likeVideo(v)}
              className="action"
              aria-label="Like"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
              </svg>
            </button>
            <div className="reel-action__count">
              {v.commentsCount ??
                (Array.isArray(v.comments) ? v.comments.length : 0)}
            </div>
          </div>

          {/* Bottom Left Overlay */}
          <div className="bottom-left">
            <div className="desc">{v.description}</div>
            <Link
              className="visit-btn"
              to={`/food-partner/${v.foodPartner}`}
          
            >
              Visit Store
            </Link>
          </div>
        </section>
      ))}

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav">
        <div className="nav- item">🏠 Home</div>
        <div className="nav-item">⭐ Saved</div>
      </div>
    </div>
  );
};

export default Home;
