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

// import React from 'react';

// function YourComponent() {
//   return (
//     <>
//       <ul className="nav nav-tabs" id="myTab" role="tablist">
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link active"
//             id="home-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#home-tab-pane"
//             type="button"
//             role="tab"
//             aria-controls="home-tab-pane"
//             aria-selected="true"
//           >
//             Home
//           </button>
//         </li>
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link"
//             id="profile-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#profile-tab-pane"
//             type="button"
//             role="tab"
//             aria-controls="profile-tab-pane"
//             aria-selected="false"
//           >
//             Profile
//           </button>
//         </li>
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link"
//             id="contact-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#contact-tab-pane"
//             type="button"
//             role="tab"
//             aria-controls="contact-tab-pane"
//             aria-selected="false"
//           >
//             Contact
//           </button>
//         </li>
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link"
//             id="disabled-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#disabled-tab-pane"
//             type="button"
//             role="tab"
//             aria-controls="disabled-tab-pane"
//             aria-selected="false"
//             disabled
//           >
//             Disabled
//           </button>
//         </li>
//       </ul>
//       <div className="tab-content" id="myTabContent">
//         <div
//           className="tab-pane fade show active"
//           id="home-tab-pane"
//           role="tabpanel"
//           aria-labelledby="home-tab"
//           tabIndex="0"
//         >
//           ...
//         </div>
//         <div
//           className="tab-pane fade"
//           id="profile-tab-pane"
//           role="tabpanel"
//           aria-labelledby="profile-tab"
//           tabIndex="0"
//         >
//           ...
//         </div>
//         <div
//           className="tab-pane fade"
//           id="contact-tab-pane"
//           role="tabpanel"
//           aria-labelledby="contact-tab"
//           tabIndex="0"
//         >
//           ...
//         </div>
//         <div
//           className="tab-pane fade"
//           id="disabled-tab-pane"
//           role="tabpanel"
//           aria-labelledby="disabled-tab"
//           tabIndex="0"
//         >
//           ...
//         </div>
//       </div>
//     </>
//   );
// }

// export default YourComponent;
