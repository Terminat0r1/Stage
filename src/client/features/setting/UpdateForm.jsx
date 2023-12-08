import React, { useState } from "react";
import {
  useUpdateUsernameMutation,
  useUpdateEmailMutation,
} from "../stage/postSlice";

const UpdateForm = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const updateUsername = useUpdateUsernameMutation();
  const updateEmail = useUpdateEmailMutation();

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
        <br />
      </div>
    </>
  );
};

export default UpdateForm;
