import React ,{ useState } from 'react';
import ProfileNavTabs from './ProfileNavbar';
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";


// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectToken } from './redux/authSlice';

// import ProfileNavTabs from './ProfileNavTabs';






const mockProfileData = {
  user: {
    id: 1,
    username: 'john_doe',
    fullName: 'John Doe',
    avatar: 'https://example.com/profile-picture.jpg',
    bio: 'Passionate web developer',
    about: ' I like long walks on the beach and exploring new places.',
  },
  stats: {
    posts: 15,
    followers: 120,
    following: 80,
  },
  posts: [
    {
      id: 1,
      imageUrl: "https://example.com/post1.jpg",
      caption: "Beautiful sunset view! 🌅 #Nature",
    },
    {
      id: 2,
      imageUrl: "https://example.com/post2.jpg",
      caption: "Exploring new places! 🗺️ #Travel",
    },
    // Add more posts as needed
  ],
  following: [
    { id: 2, username: 'user1' },
    { id: 3, username: 'user2' },
    // Add more followed users as needed
  ],
  likedPosts: [
    { id: 16, imageUrl: 'https://example.com/post16.jpg', caption: 'Liked post caption 1' },
    { id: 20, imageUrl: 'https://example.com/post20.jpg', caption: 'Liked post caption 2' },
    // Add more liked posts as needed
  ],
};






const ProfilePage = () => {
  const { user, stats, posts, following, likedPosts } = mockProfileData;
 

  const [activeTab, setActiveTab] = useState("posts");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const token = useSelector(selectToken);
  const [isEditing, setIsEditing] = useState(false);
  

  
  // if (!token) {
  //   return (
  //     <div>
  //       <h1>You must be logged in to see your profile.</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="profile-page">
      <div className="profile-header">
        {isEditing ? (
          <div>
            <img src={user.avatar} alt={user.username} className="profile-picture" />
            <h1 className="profile-name">{user.fullName}</h1>
            <textarea
              value={user.about}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, about: e.target.value }))
              }
            />
            <button onClick={() => setIsEditing(false)}>Save</button>
          </div>
        ) : (
          <div>
            <img src={user.avatar} alt={user.username} className="profile-picture" />
            <h1 className="profile-name">{user.fullName}</h1>
            <p className="profile-bio">{user.bio}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>

      <div className="profile-content">
        <section>
          <h2>About Me</h2>
          <p>{user.about}</p>
        </section>

        <section>
          <h2>Stats</h2>
          <ProfileNavTabs />
          <p>Posts: {stats.posts}</p>
          <p>Followers: {stats.followers}</p>
          <p>Following: {stats.following}</p>
        </section>

       
      <section>
          <h2>Posts</h2>
          <div className="posts">
            {posts.map(post => (
              <div key={post.id} className="post">
                <img src={post.imageUrl} alt={`Post ${post.id}`} />
                <p>{post.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Following</h2>
          <ul>
            {following.map(followedUser => (
              <li key={followedUser.id}>{followedUser.username}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Liked Posts</h2>
          <div className="liked-posts">
            {likedPosts.map(likedPost => (
              <div key={likedPost.id} className="post">
                <img src={likedPost.imageUrl} alt={`Liked Post ${likedPost.id}`} />
                <p>{likedPost.caption}</p>
              </div>
            ))}
          </div>
        </section>




  
      </div>
    </div>
  );
};
    
export default ProfilePage;
































  
// const ProfilePage = () => {
//   const { user, stats, posts, following, likedPosts } = mockProfileData;
 
//   const token = useSelector(selectToken);
 
//   // Commented out for testing purposes
//   // if (!token) {
//   //   return (
//   //     <div>
//   //       <h1>You must be logged in to see your profile.</h1>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="profile-page">
//       <div className="profile-header">
//         <img src={user.avatar} alt={user.username} className="profile-picture" />
//         <h1 className="profile-name">{user.fullName}</h1>
//         <p className="profile-bio">{user.bio}</p>
//       </div>

//       <div className="profile-content">
//         <section>
//           <h2>About Me</h2>
//           <p>{user.about}</p>
//         </section>

//         <section>
//           <h2>Stats</h2>
//           <ProfileNavTabs />
//           <p>Posts: {stats.posts}</p>
//           <p>Followers: {stats.followers}</p>
//           <p>Following: {stats.following}</p>
//         </section>

//         <section>
//           <h2>Posts</h2>
//           <div className="posts">
//             {posts.map(post => (
//               <div key={post.id} className="post">
//                 <img src={post.imageUrl} alt={`Post ${post.id}`} />
//                 <p>{post.caption}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section>
//           <h2>Following</h2>
//           <ul>
//             {following.map(followedUser => (
//               <li key={followedUser.id}>{followedUser.username}</li>
//             ))}
//           </ul>
//         </section>

//         <section>
//           <h2>Liked Posts</h2>
//           <div className="liked-posts">
//             {likedPosts.map(likedPost => (
//               <div key={likedPost.id} className="post">
//                 <img src={likedPost.imageUrl} alt={`Liked Post ${likedPost.id}`} />
//                 <p>{likedPost.caption}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };
    
//     export default ProfilePage;
    





<div>
      {/* ... */}
      {/* <section>
        <h2>Posts</h2>
        {activeTab === "posts" && (
          <div className="posts">
            {posts.map((post) => (
              <div key={post.id} className="post">
                <img src={post.imageUrl} alt={`Post ${post.id}`} />
                <p>{post.caption}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Following</h2>
        {activeTab === "following" && (
          <ul>
            {following.map((followedUser) => (
              <li key={followedUser.id}>{followedUser.username}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Liked Posts</h2>
        {activeTab === "liked" && (
          <div className="liked-posts">
            {likedPosts.map((likedPost) => (
              <div key={likedPost.id} className="post">
                <img src={likedPost.imageUrl} alt={`Liked Post ${likedPost.id}`} />
                <p>{likedPost.caption}</p>
              </div>
            ))}
          </div>
        )}
      </section> */}

      {/* ... */}
    </div>