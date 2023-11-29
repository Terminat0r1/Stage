import React from "react";

const VibeUnit = ({ user }) => {
  return (
    <div class="card border border-dark rounded p-3 m-3" key={user.id}>
      <div class="card-header">{user.location}</div>
      <div class="card-body">
        <h5 class="card-title">{user.username}</h5>
        <p class="card-text">
          Post: {user.post} , Bookmark: {user.bookmark}
        </p>
        <a href="#" class="btn btn-dark">
          Follow
        </a>
      </div>
    </div>
  );
};

export default VibeUnit;
