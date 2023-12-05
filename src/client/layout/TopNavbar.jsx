
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";

import "./Navbar.less";

/**
 * A simple navigation bar that displays "Log In" if the user is not logged in,
 * and "Log Out" if the user is logged in.
 */
export default function NavbarMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="top">
      <h1></h1>
      <menu>
        <li>
          <NavLink to="/profile">profile </NavLink>
        </li>
        {token ? (
          <li>
            <a onClick={handleLogout}>Log Out</a>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Log out</NavLink>
          </li>
        )}
      </menu>
    </nav>
  );
}



// <nav class="navbar bg-body-tertiary">
//   <div class="container">
//     <a class="navbar-brand" href="#">
//       <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="30" height="24">
//     </a>
//   </div>
// </nav>


// {/* this is a nav bar with a search button  */}
// <nav class="navbar bg-body-tertiary">
//   <div class="container-fluid">
//     <a class="navbar-brand">Navbar</a>
//     <form class="d-flex" role="search">
//       <input class="form-control me-2" type="button" placeholder="logout" aria-label="Search">
//       <button class="btn btn-outline-success" type="submit">logout</button>
//     </form>
//   </div>
// </nav>
