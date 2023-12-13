import React, { useState } from "react";
import ProfileNavTabs from "./ProfileNavbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import {
  useGetUserQuery,
  useGetCurrentUserQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../stage/postSlice";
import ProfilePost from "./ProfilePost";
import "./Profile.less";

const ProfilePage = () => {
  // if (post.likes.length > 0) {
  //   liked = true;
  // }

  const token = useSelector(selectToken);
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetUserQuery(id);
  const { data: currentuser } = useGetCurrentUserQuery();
  const [unfollowUser] = useUnfollowUserMutation();
  const [followUser] = useFollowUserMutation();

  const [follow, setFollow] = useState(data?.isFollowing);

  function handleRefetchOne() {
    // force re-fetches the data
    refetch();
  }

  const handleFollowClick = async (userId) => {
    console.log("User ID:", userId);
    try {
      // If follow is true, unfollow the user using the mutation

      if (follow) {
        await unfollowUser(userId).unwrap(); // Assuming post.author.id is the user's ID
      } else if (!follow) {
        await followUser(userId).unwrap(); // Assuming post.author.id is the user's ID
      }
      console.log(follow);
      // Toggle the follow state when the button is clicked
      setFollow(!follow);
    } catch (error) {
      console.error("Error unfollowing user:", error);
      // Handle error as needed
    }
  };
  let showdelete = false;

  // Function to handle post deletion

  if (!token) {
    return <p>You must be logged in.</p>;
  }
  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">Error fetching data: {error.message}</div>
    );
  }
  const numPosts = data?.posts.length;
  let numFollowing = 0;
  const numFollowers = data?.followers.length || 0;

  if (data.userId == currentuser.userId) {
    showdelete = true;
  }

  // console.log("data", data);
  // console.log("currentuser", currentuser.userId);
  // console.log(showdelete);

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <div className="card-header d-flex flex-row">
        <div className="user d-flex flex-column">
          <div className="photo">
            {" "}
            <img
              className="card-img"
              src={data.profilePhoto}
              alt="User Profile"
            />
          </div>
          <div className="username">
            <h5 className="card-title m-3">{data.username}</h5>
          </div>
          <div className="location">
            <h4>{data.location}</h4>
          </div>
        </div>
        <div className="content d-flex flex-column">
          <div className="content">
            <h5>{data.aboutMe}</h5>
          </div>
          <div className="description d-flex flex-row">
            <p className="card-text m-3">
              {`Post:  ${numPosts}          Followers:     ${numFollowers}`}
            </p>
            {!showdelete && (
              <button
                className={`d-flex align-items-center justify-content-center m-2 ${
                  follow ? "btn btn-dark" : "btn btn-outline-dark"
                }`}
                type="button"
                onClick={() => handleFollowClick(data.userId)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-circle-fill me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
                {follow ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card border border-dark rounded p-3 m-3 w-100">
        <div className="card-header m-3">
          <h4>Posts</h4>
        </div>
        {data.posts.map((post) => (
          <ProfilePost
            post={post}
            key={post.id}
            refetch={handleRefetchOne}
            data={data}
            currentuser={currentuser}
          />
        ))}

        <div className="card-body d-flex flex-column"></div>
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
