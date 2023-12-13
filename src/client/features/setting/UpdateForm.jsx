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
  useDeleteUserMutation,
} from "./settingSlice";
import "./account.css";


const UpdateForm = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState("");
  const [oldPassword, setOldPassword] = useState(null);
  const [newpassword, setNewPassword] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateUsername] = useUpdateUsernameMutation();
  const [updateEmail] = useUpdateEmailMutation();
  const [updatebirthDate] = useUpdatebirthDateMutation();
  const [updatelocation] = useUpdatelocationMutation();
  const [updatephoto] = useUpdatephotoMutation();
  const [updatePassword] = useUpdatePasswordMutation();
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
      <div>
        {/* Update Username */}
        <div className="form-floating ">
          <form onSubmit={handleUpdateUsername}>
            <div className="form-floating">
              <label className="p-2">
                Username:
                <input
                  className="m-2 p-2"
                  type="text"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <button className="btn btn-dark">Update</button>
            </div>
          </form>
        </div>
        <br />
        {/* Update Email */}
        <div className="email">
          <div className="form-floating ">
            <form onSubmit={handleUpdateEmail}>
              <div className="form-floating">
                <label className="p-2">
                  Email:
                  <input
                    className="m-2 p-2"
                    type="text"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <button className="btn btn-dark">Update</button>
              </div>
            </form>
          </div>
        </div>
        <br />
        {/* Update BirthDate */}
        
        {/* Update Location */}
        <div className="location">
          <div className="form-floating ">
            <form onSubmit={handleUpdatelocation}>
              <div className="form-floating">
                <label className="p-2">
                  Location:
                  <input
                    className="m-2 p-2"
                    type="text"
                    value={location || ""}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>
                <button className="btn btn-dark">Update</button>
              </div>
            </form>
          </div>
        </div>
        <br />
        {/* Update Photo */}
        <div className="form-floating ">
          <form onSubmit={handleUpdatephoto}>
            <div className="form-floating">
              <label className="p-2">
                Image URL:
                <input
                  className="m-2 p-2"
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </label>
              <button className="btn btn-dark">Update</button>
            </div>
          </form>
        </div>
        <br />


        <div className="birthDate">
          <div className="form-floating ">
            <form onSubmit={handleUpdatebirthDate}>
              <div className="form-floating">
                <label className="p-2">
                  Birth Date:
                  <input
                    className="m-2 p-2"
                    type="date"
                    value={birthDate || ""}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </label>
                 <button className="btn btn-dark">Update</button>
              </div>
            </form>
          </div>
        </div>
        <br />
        {/* Update Password */}
        <div className="form-floating ">
          <form onSubmit={handleUpdatePassword}>
            <div className="form-floating">
              <label className="p-2">
                Old Password:
                <input
                  className="m-2 p-2"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </label>
              <label className="p-2">
                New Password:
                <input
                  className="m-2 p-2"
                  type="password"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <button className="btn btn-dark">Update</button>
            </div>
          </form>
        </div>
        <br />
        {/* Delete User */}
        <div className="form-floating border border-danger rounded">
          <form onSubmit={handleDeleteUser}>
            <div className="form-floating">
              <label className="p-2">
                Enter Password:
                <input
                  type="password"
                  value={confirmDelete}
                  onChange={(e) => setConfirmDelete(e.target.value)}
                />
              </label>
              <button className="btn btn-danger">Delete Account</button>
            </div>
          </form>
        </div>
        <br />
      </div>
    </>
  );
};

export default UpdateForm;
