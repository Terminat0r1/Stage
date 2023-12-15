import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import {
  useUpdateUsernameMutation,
  useUpdateEmailMutation,
  useUpdatebirthDateMutation,
  useUpdatelocationMutation,
  useUpdatephotoMutation,
  useUpdatePasswordMutation,
  useUpdateAboutMeMutation,
  useDeleteUserMutation,
} from "./settingSlice";
import "./accnt_settings.less";

const UpdateForm = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState("");
  const [oldPassword, setOldPassword] = useState(null);
  const [newpassword, setNewPassword] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [aboutMe, setAboutMe] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateUsername] = useUpdateUsernameMutation();
  const [updateEmail] = useUpdateEmailMutation();
  const [updatebirthDate] = useUpdatebirthDateMutation();
  const [updatelocation] = useUpdatelocationMutation();
  const [updatephoto] = useUpdatephotoMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [updateAboutMe] = useUpdateAboutMeMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    const credentials = {
      username: username,
    };
    try {
      await updateUsername(credentials).unwrap();
      setUsername(null);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
    };
    try {
      await updateEmail(credentials).unwrap();
      setEmail(null);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleUpdatebirthDate = async (e) => {
    e.preventDefault();
    const credentials = {
      birthDate: birthDate,
    };
    try {
      await updatebirthDate(credentials).unwrap();
      setBirthDate(null);
    } catch (error) {
      console.error("Error updating birthDate:", error);
    }
  };

  const handleUpdatelocation = async (e) => {
    e.preventDefault();
    const credentials = {
      location: location,
    };
    try {
      await updatelocation(credentials).unwrap();
      setLocation(null);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const handleUpdatephoto = async (e) => {
    e.preventDefault();
    const credentials = {
      profilePhoto: photo,
    };
    console.log(credentials);
    try {
      await updatephoto(credentials).unwrap();
      setPhoto(null);
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  const handleUpdateAboutMe = async (e) => {
    e.preventDefault();
    const credentials = {
      aboutMe: aboutMe,
    };
    try {
      await updateAboutMe(credentials).unwrap();
      setAboutMe(null);
    } catch (error) {
      console.error("Error updating aboutMe:", error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const credentials = {
      oldPassword: oldPassword,
      newPassword: newpassword,
    };
    try {
      await updatePassword(credentials).unwrap();
      setOldPassword(null);
      setNewPassword(null);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const credentials = {
      password: confirmDelete,
    };
    console.log(credentials);
    try {
      await deleteUser(credentials).unwrap();
      setConfirmDelete(null);
      navigate("/login");
      await dispatch(logout());
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="form-section">
        {" "}
        {/* This is the container for all form groups */}
        {/* Update Username */}
        <div className="form-group d-flex flex-column">
          {" "}
          {/* This is a single form group */}
          <form onSubmit={handleUpdateUsername}>
            <label>
              <div className="m-2">Username:</div>

              <input
                type="text"
                value={username || ""}
                style={{ width: "500px" }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <button className="btn btn-dark">Update</button>
          </form>
        </div>
        {/* Update Email */}
        <div className="form-group d-flex flex-column">
          <form onSubmit={handleUpdateEmail}>
            <label>
              <div className="m-2">Email:</div>

              <input
                type="text"
                value={email || ""}
                style={{ width: "500px" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button className="btn btn-dark">Update</button>
          </form>
        </div>
        {/* Update Location */}
        <div className="form-group d-flex flex-column">
          <form onSubmit={handleUpdatelocation}>
            <label>
              <div className="m-2">Location:</div>

              <input
                type="text"
                value={location || ""}
                style={{ width: "500px" }}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <button className="btn btn-dark">Update</button>
          </form>
        </div>
        {/* Update Photo */}
        <div className="form-group d-flex flex-column">
          <form onSubmit={handleUpdatephoto}>
            <label>
              <div className="m-2">Profile Photo (Image URL):</div>

              <input
                type="text"
                value={photo}
                style={{ width: "500px" }}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </label>
            <button className="btn btn-dark">Update</button>
          </form>
        </div>
        {/* Update About Me */}
        <div className="form-group d-flex flex-column">
          <form onSubmit={handleUpdateAboutMe}>
            <label>
              <div className="m-2">About Me:</div>

              <textarea
                type="text"
                value={aboutMe || ""}
                style={{ width: "500px", height: "150px" }}
                onChange={(e) => setAboutMe(e.target.value)}
              />
            </label>
            <button className="btn btn-dark">Update</button>
          </form>
        </div>
        {/* Update BirthDate */}
        <div className="form-group d-flex flex-column">
          <form onSubmit={handleUpdatebirthDate}>
            <label>
              <div className="m-2">Birth Date:</div>

              <input
                type="date"
                value={birthDate || ""}
                style={{ width: "500px" }}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </label>
            <button className="btn btn-dark">Update</button>
          </form>
        </div>
        {/* Update Password */}
        <div className="form-group d-flex flex-column">
          <form onSubmit={handleUpdatePassword}>
            <label>
              <div className="m-2">Old Password:</div>

              <input
                type="password"
                value={oldPassword}
                style={{ width: "500px" }}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
            <label>
              <div className="m-2">New Password:</div>

              <input
                type="password"
                value={newpassword}
                style={{ width: "500px" }}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <button className="btn btn-dark">Update</button>
          </form>
        </div>
        {/* Delete User */}
        <div className="form-group border border-danger p-3 d-flex flex-column">
          <form onSubmit={handleDeleteUser}>
            <label>
              <div className="m-2"> Enter Password to Delete Account:</div>

              <input
                type="password"
                value={confirmDelete}
                style={{ width: "500px" }}
                onChange={(e) => setConfirmDelete(e.target.value)}
              />
            </label>
            <button className="btn btn-danger">Delete Account</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
