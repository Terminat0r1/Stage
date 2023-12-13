import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import "./Auth.less";

export default function AuthForm() {
  const navigate = useNavigate();

  // Handles swapping between login and register
  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin ? " Register " : " Login ";

  // Controlled form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [location, setLocation] = useState("");

  // Form submission
  const [login, { isLoading: loginLoading, error: loginError }] = useLoginMutation();
  const [register, { isLoading: registerLoading, error: registerError }] = useRegisterMutation();

  /** Send the requested authentication action to the API */
  const attemptAuth = async (evt) => {
    evt.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = isLogin
      ? { username, password }
      : {
          username,
          email,
          password,
          birthDate,
          location,
          isAdmin: false,
        };

    try {
      await authMethod(credentials).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="d-flex justify-content-center">
            <h1>{authAction}</h1>
          </div>
          <form onSubmit={attemptAuth}>
            <div className="form-group">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            {!isLogin && (
              <>
                <div className="form-group">
                  <label className="form-label">Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    autoComplete="Location"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Date of Birth:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    autoComplete="birthDate"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              {authAction}
            </button>
          </form>

          <div className="registerBtn">
            <a onClick={() => setIsLogin(!isLogin)} className="btn btn-primary mt-3 d-block justify-content-center">
              {altCopy}
            </a>
          </div>

          {(loginLoading || registerLoading) && <p>Please wait...</p>}
          {loginError && <p role="alert">{loginError}</p>}
          {registerError && <p role="alert">{registerError}</p>}
        </div>
      </div>
    </div>
  );
}