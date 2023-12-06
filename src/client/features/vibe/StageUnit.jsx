import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import userImg from "../ima/user.jpg";
const StageUnit = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [follow, setFollow] = useState(false);

  const handleFollowClick = () => {
    // Toggle the liked state when the button is clicked
    setFollow(!follow);
  };
  const handleLikeClick = () => {
    // Toggle the liked state when the button is clicked
    setLiked(!liked);
  };

  return (
    <div
      className="stagecard card border border-dark rounded w-100 p-3 m-3"
      key={post.id}
    >
      <div className="card-header">
        <h4>{post.author.location}</h4>
      </div>

      <div className="d-flex card-body align-items-center text-center">
        <Link to={`/profile/${post.author.id}`}>
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="card-img-top userImg p-2"
              src={post.author.profilephoto}
              alt="Card image cap"
            />
            <h5 className="card-title p-2">{post.author.username}</h5>
          </div>
        </Link>

        <button
          className={`d-flex align-items-center justify-content-center ${
            liked ? "btn btn-danger" : "btn btn-outline-danger"
          }`}
          type="button"
          onClick={handleLikeClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-heart-fill me-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15m0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
          </svg>
          Like
        </button>
        <button
          className={`d-flex align-items-center justify-content-center m-2 ${
            follow ? "btn btn-dark" : "btn btn-outline-dark"
          }`}
          type="button"
          onClick={handleFollowClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle-fill me-2"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
          </svg>
          {follow ? "Following" : "Follow"}
        </button>
      </div>
      <h2>{post.content}</h2>
    </div>
  );
};

export default StageUnit;
