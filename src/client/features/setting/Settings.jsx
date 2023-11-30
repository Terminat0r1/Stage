import React from "react";
import userImg from "../ima/user.jpg";

const Settings = () => {
  return (
    <div class="d-flex justify-content-center flex-wrap">
      <div className="container  py-4 px-3 mx-auto">
        <div>
          <h1>Account Settings</h1>
        </div>
        <div className="card border border-dark rounded p-3 m-3 w-100">
          <div className="card-header m-3 ">New Work</div>

          <div className="card-body d-flex">
            <img className="card-img-top" src={userImg} alt="Card image cap" />
            <h5 className="card-title m-3">Olivia</h5>
            <br />
            <p className="card-text m-3">Post: 58 , Bookmark: 26</p>
          </div>
        </div>
        <div className="card border border-dark rounded p-3 m-3 w-100">
          <div>
            <h3>Update Info</h3>
          </div>
          {/* insert here */}
          <form>
            <div className="d-flex flex-column justify-content-center">
              <div class="input-group mb-3">
                <span class="input-group-text m-3" id="basic-addon1">
                  @
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <>
                <div className="mb-3">
                  <label
                    htmlFor="formGroupExampleInput2"
                    className="form-label m-3"
                  >
                    Birthday
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="mm/dd/yyyy"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="formGroupExampleInput"
                    className="form-label m-3"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Change location"
                  />
                </div>
              </>
            </div>
            <div class="d-flex justify-content-end">
              {" "}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
