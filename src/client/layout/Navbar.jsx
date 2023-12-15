import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";
import { useGetCurrentUserQuery } from "../features/stage/postSlice";
import "./Navbar.less";

/**
 * A simple navigation bar that displays "Log In" if the user is not logged in,
 * and "Log Out" if the user is logged in.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const { data: currentUser } = useGetCurrentUserQuery();

  const currId = currentUser?.userId;

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="top">
      <h1 className="logo">Stage</h1>
      <div className="menu">
        {token ? (
          <>
            <button type="button" className="btn btn-outline-dark m-2">
              <NavLink to="/">The Vibe</NavLink>
            </button>
            <button type="button" className="btn btn-outline-dark m-2">
              <NavLink to="/stage">The Stage</NavLink>
            </button>
            <button type="button" className="btn btn-outline-dark m-2">
              <NavLink to={`/profile/${currId}`}>Profile</NavLink>
            </button>
            {/* 
              <button type="button" className="btn btn-outline-dark m-2">
                <NavLink to="/bkmark">Bookmark</NavLink>
              </button>
            */}
            <button type="button" className="btn btn-outline-dark m-2">
              <NavLink to="/settings">Account Settings</NavLink>
            </button>
            <button type="button" className="btn btn-outline-dark m-2">
              <span onClick={handleLogout}>Logout</span>
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-outline-dark m-2">
            <NavLink to="/login">Login</NavLink>
          </button>
        )}
      </div>
    </nav>
  );
}