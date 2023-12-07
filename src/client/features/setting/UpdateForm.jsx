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

  const updateUsernameMutation = useUpdateUsernameMutation();
  const updateEmailMutation = useUpdateEmailMutation();
  const updateBirthDateMutation = useUpdatebirthDateMutation();
  const updateLocationMutation = useUpdatelocationMutation();
  const updatePhotoMutation = useUpdatephotoMutation();
  const updatePasswordMutation = useUpdatePasswordMutation();

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
      // Call the respective mutation functions for updating other fields
      await updateUsernameMutation.mutateAsync(username);
      await updateEmailMutation.mutateAsync(email);
      await updateBirthDateMutation.mutateAsync(birthDate);
      await updateLocationMutation.mutateAsync(location);
      await updatePhotoMutation.mutateAsync(imageUrl);

      console.log("All fields updated successfully!");
    } catch (error) {
      console.error("Error updating fields:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdateAll}>
        {/* Update Username */}
        <label className=" p-2">
          Username:
          <input
            className="m-2 p-2"
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
            className="m-2 p-2"
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
            className="m-2 p-2"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
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
