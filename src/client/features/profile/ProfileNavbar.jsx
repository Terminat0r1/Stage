import React, { useState } from "react";

const ProfileNavTabs = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ul className="nav nav-tabs">
      {/* Tab for posts */}
      <li className={`nav-item ${activeTab === "posts" ? "active" : ""}`}>
        <a className="nav-link" onClick={() => handleTabClick("posts")} href="#">
          posts
        </a>
      </li>
      {/* Tab for following */}
      <li className={`nav-item ${activeTab === "following" ? "active" : ""}`}>
        <a className="nav-link" onClick={() => handleTabClick("following")} href="#">
          Following
        </a>
      </li>
      {/* Tab for liked */}
      <li className={`nav-item ${activeTab === "liked" ? "active" : ""}`}>
        <a className="nav-link" onClick={() => handleTabClick("liked")} href="#">
          Liked
        </a>
      </li>
    </ul>
  );
};

export default ProfileNavTabs;





