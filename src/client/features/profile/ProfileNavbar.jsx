import React from "react";

/**
 * Renders the navigation tabs for the profile page.
 * Each tab represents a different section of the profile.
 */
const ProfileNavTabs = () => {
    return (
      <ul className="nav nav-tabs">
        {/* Tab for posts */}
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            posts
          </a>
        </li>
        {/* Tab for following */}
        <li className="nav-item">
          <a className="nav-link" href="#">
            Following
          </a>
        </li>
        {/* Tab for liked */}
        <li className="nav-item">
          <a className="nav-link" href="#">
            Liked
          </a>
        </li>
      </ul>
    );
};
  
  export default ProfileNavTabs;








