import React from "react";
import userImg from "../ima/user.jpg";
const VibeUnit = ({ user }) => {
  return (
    <div className="card border border-dark rounded p-3 m-3" key={user.id}>
      <div className="card-header">{user.location}</div>

      <div className="card-body text-center">
        <img className="card-img-top" src={userImg} alt="Card image cap" />
        <h5 className="card-title">{user.username}</h5>
        <p className="card-text">
          Post: {user.post} , Bookmark: {user.bookmark}
        </p>
        <a href="#" className="btn btn-dark">
          Follow
        </a>
      </div>
    </div>
  );
};

export default VibeUnit;
