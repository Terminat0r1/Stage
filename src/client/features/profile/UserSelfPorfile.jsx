import React from "react";
import userImg from "../ima/user.jpg";

const UserSelfPorfile = () => {
  return (
    <div>
      {" "}
      <div className="card border border-dark rounded p-3 m-3 w-100">
        <div className="card-header m-3">New Work</div>

        <div className="card-body d-flex">
          <img className="card-img-top" src={userImg} alt="User Profile" />
          <h5 className="card-title m-3">Olivia</h5>
          <p className="card-text m-3">Post: 58, Followers: 26</p>
        </div>
      </div>
    </div>
  );
};

export default UserSelfPorfile;
