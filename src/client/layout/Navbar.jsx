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
      <h1>Task Tracker</h1>
      <menu>
        <li>
          <NavLink to="/">The Stage</NavLink>
        </li>
        <li>
          <NavLink to="/vibe">The Vibe</NavLink>
        </li>
        {token ? (
          <>
            <li>
              <NavLink to="/bkmark">Bookmark</NavLink>
            </li>
            <li>
              <NavLink to="/settings">Account Settings</NavLink>
            </li>
            <li>
              <a onClick={handleLogout}>Log Out</a>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        )}
      </menu>
    </nav>
  );
}
