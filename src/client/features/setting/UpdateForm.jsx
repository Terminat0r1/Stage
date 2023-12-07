import React, { useState } from "react";
import {
  useUpdateUsernameMutation,
  useUpdateEmailMutation,
  useUpdatebirthDateMutation,
  useUpdatephotoMutation,
  useUpdatelocationMutation,
  useUpdatePasswordMutation,
} from "./settingSlice";

const UpdateForm = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [updateFields, setUpdateFields] = useState({
    username: false,
    email: false,
    birthDate: false,
    location: false,
    oldPassword: false,
    newPassword: false,
    imageUrl: false,
  });

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      if (updateFields.username) {
        await updateUsername(username);
      }

      // Repeat similar checks for other fields...
      if (updateFields.email) {
        await updateEmail(email);
      }
      if (updateFields.birthDate) {
        await updateBirthDate(birthDate);
      }
      if (updateFields.location) {
        await updateLocation(location);
      }
      if (updateFields.imageUrl) {
        await updateImageUrl(imageUrl);
      }
      console.log("Fields updated successfully!");
    } catch (error) {
      console.error("Error updating fields:", error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword({ oldPassword, newPassword });
      console.log("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleUpdateAll = async (e) => {
    e.preventDefault();
    try {
      // Update all fields
      await Promise.all([
        updateFields.username && updateUsername(username),
        updateFields.email && updateEmail(email),
        updateFields.birthDate && updateBirthDate(birthDate),
        updateFields.location && updateLocation(location),
        updateFields.imageUrl && updateImageUrl(imageUrl),
        updateFields.oldPassword &&
          updatePassword({ oldPassword, newPassword }),
      ]);

      console.log("All fields updated successfully!");
    } catch (error) {
      console.error("Error updating fields:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleUpdateUsername}>
        {/* Update Username */}
        <label className=" p-2">
          Username:
          <input
            className="p-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        {/* Update Email */}
        <label className=" p-2">
          Email:
          <input
            className="p-2"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        {/* Update Birth Date */}
        <label className="p-2">
          Birth Date:
          <input
            className="p-2"
            type="date"
            value={birthDate}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>{" "}
        <br />
        {/* Update Location */}
        <label className="p-2">
          Location:
          <input
            className="m-2 p-2"
            type="text"
            step=".01"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br />
        {/* Update Image URL */}
        <label className="p-2">
          Image URL:
          <input
            className="m-2 p-2"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>{" "}
        <br />
        {/* Update Password */}
        <label className="p-2">
          Old Password:
          <input
            className="m-2 p-2"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </label>{" "}
        <label className="p-2">
          New Password:
          <input
            className="m-2 p-2"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>{" "}
        <button onClick={handleUpdatePassword}>Update Password</button>
        <br />
        <br />
        <button type="submit">Update All</button>
      </form>
    </>
  );
};

export default UpdateForm;
