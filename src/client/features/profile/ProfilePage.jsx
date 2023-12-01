import React from 'react';
import ProfileNavTabs from './ProfileNavbar';



 <ProfileNavTabs /> 

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src="https://example.com/profile-picture.jpg"
          alt="Profile"
          className="profile-picture"
        />
        <h1 className="profile-name">John Doe</h1>
        <p className="profile-bio">Web Developer</p>
      </div>

      <div className="profile-content">
        <h2>About Me</h2>
        <p>
          Hi, I'm John Doe, a passionate web developer with a focus on creating
          awesome user experiences. I love coding and exploring new technologies.
        </p>

        <h2>Skills</h2>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          {/* Add more skills as needed */}
        </ul>

        {/* Add more sections such as education, work experience, projects, etc. */}
      </div>
    </div>
  );
};

export default ProfilePage;



