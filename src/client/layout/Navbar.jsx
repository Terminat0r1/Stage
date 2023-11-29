import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";

import "./Navbar.less";

/**
 * A simple navigation bar that displays "Log In" if the user is not logged in,
 * and "Log Out" if the user is logged in.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="top">
      <h1>Music App</h1>
      <menu>
        <button type="button" class="btn btn-outline-dark m-2">
          <NavLink to="/">The Stage</NavLink>
        </button>
        <button type="button" class="btn btn-outline-dark m-2">
          <NavLink to="/vibe">The Vibe</NavLink>
        </button>

        {token ? (
          <>
            <button type="button" class="btn btn-outline-dark m-2">
              <NavLink to="/bkmark">Bookmark</NavLink>
            </button>{" "}
            <button type="button" class="btn btn-outline-dark m-2">
              <NavLink to="/settings">Account Settings</NavLink>
            </button>{" "}
            <button type="button" class="btn btn-outline-dark m-2">
              <a onClick={handleLogout}>Log Out</a>
            </button>
          </>
        ) : (
          <button type="button" class="btn btn-outline-dark m-2">
            <NavLink to="/login">Log In</NavLink>
          </button>
        )}
      </menu>
    </nav>
  );
}
