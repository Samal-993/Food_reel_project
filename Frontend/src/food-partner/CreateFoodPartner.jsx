import axios from "axios";
import "../styles/createFood.css"; // separate CSS for this page
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef();

  const navigate = useNavigate()

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setVideoFile(file); // store actual file
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setVideoFile(file); // store dropped file
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", videoFile);

    try {
      const response = await axios.post("https://food-reel-project-2.onrender.com/api/food", formData, {
        withCredentials: true,
      });
      // console.log(response.data);

      navigate("/")

    } catch (error) {
      console.error("Error uploading food:", error);
    }
  };

  return (
    <div className="create-food-wrapper">
      <div className="create-food-card animate-fadein">
        <h2>Create Food</h2>

        <form className="create-food-form" onSubmit={onSubmit}>
          <label>Food Video</label>

          <div
            className={`video-upload-box ${videoPreview ? "has-video" : ""} ${
              dragActive ? "drag-active" : ""
            }`}
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
          >
            {videoPreview ? (
              <div className="video-preview-wrapper animate-slideup">
                <video src={videoPreview} controls className="video-preview" />
                <span className="play-overlay">&#9658;</span>
              </div>
            ) : (
              <div className="upload-placeholder">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="upload-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 8l-4-4-4 4m4-4v12"
                  />
                </svg>
                <p>Drag & Drop or Click to Upload</p>
              </div>
            )}
            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              onChange={handleVideoChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              id="foodName"
              required
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="foodName">Food Name</label>
          </div>

          <div className="input-group">
            <textarea
              id="foodDescription"
              required
              rows="4"
              placeholder=" "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="foodDescription">Description</label>
          </div>

          <button type="submit" className="btn-3d">
            🚀 Create Food
          </button>
        </form>
      </div>
        <Link to="/home" className="btn-1d">
            🏠 Go Home
          </Link>
    </div>
  );
};

export default CreateFood;
