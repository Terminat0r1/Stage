import React from "react";
import VibeUnit from "./VibeUnit";

const userMockData = [
  {
    id: 1,
    username: "Emmy",
    location: "Denver",
    post: "15",
    bookmark: "3",
    Following: "false",
  },
  {
    id: 2,
    username: "Noah",
    location: "Tampa",
    post: "95",
    bookmark: "76",
    Following: "false",
  },
  {
    id: 1,
    username: "Hanna",
    location: "Cincinnati",
    post: "58",
    bookmark: "26",
    Following: "false",
  },
];
const Vibe = () => {
  return (
    <>
      <div className="container  py-4 px-3 mx-auto">
        <div>
          <h1>The Vibe</h1>
        </div>

        <div className="row">
          <div className="col text-center">
            <form className="form-inline">
              <div className="form-group mb-2">
                <label htmlFor="staticEmail2" className="sr-only">
                  Find users by location
                </label>
                <br />
                <input
                  type="text"
                  readOnly=""
                  className="form-control-plaintext"
                  id="citysearch"
                  defaultValue="chicago"
                />
              </div>
              <button type="submit" className="btn btn-dark mb-2">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container  py-5 px-3 w-100">
        {userMockData.map((user) => (
          <VibeUnit user={user} key={user.id} />
        ))}
      </div>
    </>
  );
};

export default Vibe;
