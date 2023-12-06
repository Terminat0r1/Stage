import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "./authSlice";

/** This form allows users to register or log in. */
export default function AuthForm() {
  const navigate = useNavigate();

  // Handles swapping between login and register
  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altCopy = isLogin
    ? "Need an account? Register here."
    : "Already have an account? Login here.";

  // Controlled form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [location, setLocation] = useState("");

  // Form submission
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [register, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation();

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
    console.log(credentials);
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
          <h1>{authAction}</h1>
          <form onSubmit={attemptAuth}>
            <div className="mb-3">
              <label className="form-label">
                Username
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </label>
            </div>

            {!isLogin && (
              <div className="mb-3">
                <label className="form-labeln mb-3">
                  Location
                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    autoComplete="Location"
                  />
                </label>
                <label className="form-label mb-3">
                  Email
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </label>
                <label className="form-label mb-3">
                  Date of birth
                  <input
                    type="date"
                    className="form-control"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    autoComplete="birthDate"
                  />
                </label>
              </div>
            )}

            <label className="form-label mb-3">
              Password
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>

            <button type="submit" className="btn btn-primary mt-3">
              {authAction}
            </button>
          </form>
          <a onClick={() => setIsLogin(!isLogin)} className="mt-3 d-block">
            {altCopy}
          </a>

          {(loginLoading || registerLoading) && <p>Please wait...</p>}
          {loginError && <p role="alert">{loginError}</p>}
          {registerError && <p role="alert">{registerError}</p>}
        </div>
      </div>
    </div>
  );
}
