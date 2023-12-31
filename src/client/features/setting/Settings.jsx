import React, { useState } from "react";
import userImg from "../ima/user.jpg";
import UpdateForm from "./UpdateForm";
import "./accnt_settings.less";

const Settings = () => {
  const [profilePicture, setProfilePicture] = useState(userImg);

  const handleProfilePictureChange = (e) => {
    const newProfilePicture = URL.createObjectURL(e.target.files[0]);
    setProfilePicture(newProfilePicture);
  };

  return (
    <div className="d-flex justify-content-center flex-wrap">
      <div className="container py-4 px-3 mx-auto">
        <div className="">
        <h1 className="text-center">Account Settings</h1>
        </div>
        <div className="card border-card rounded p-3 m-3 w-100">
          <div>
            <h3>Update Info</h3>
          </div>
          <UpdateForm />
        </div>
      </div>
    </div>
  );
};

export default Settings;
