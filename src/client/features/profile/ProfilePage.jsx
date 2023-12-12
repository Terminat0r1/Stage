import React, { useState } from "react";
import ProfileNavTabs from "./ProfileNavbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useGetUserQuery, useGetCurrentUserQuery } from "../stage/postSlice";
import {
  useDeletePostMutation,
  useUnfollowUserMutation,
  useFollowUserMutation,
  useLikeMutation,
  useUnlikeMutation,
} from "../stage/postSlice";

const ProfilePage = () => {
  let [liked, setLiked] = useState(false);
  const [follow, setFollow] = useState(false);

  // if (post.likes.length > 0) {
  //   liked = true;
  // }

  const token = useSelector(selectToken);
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetUserQuery(id);
  const { data: currentuser } = useGetCurrentUserQuery();
  const [deletePostMutation] = useDeletePostMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [followUser] = useFollowUserMutation();
  const [like] = useLikeMutation();
  const [unlike] = useUnlikeMutation();

  let showdelete = false;

  // Function to handle post deletion
  const handleDeletePost = async (postId) => {
    try {
      await deletePostMutation(postId).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error as needed
    }
  };

  const handleFollowClick = async () => {
    try {
      // If follow is true, unfollow the user using the mutation
      if (follow) {
        await unfollowUser(data.id).unwrap(); // Assuming post.author.id is the user's ID
      } else if (!follow) {
        await followUser(data.id).unwrap(); // Assuming post.author.id is the user's ID
      }
      // Toggle the follow state when the button is clicked
      setFollow(!follow);
    } catch (error) {
      console.error("Error unfollowing user:", error);
      // Handle error as needed
    }
  };
  const handleLikeClick = async () => {
    try {
      // Toggle the liked state when the button is clicked
      setLiked(!liked);

      // If liked is true, unlike the post using the mutation
      if (liked) {
        console.log(post.id);
        await unlike(post.id).unwrap(); // Assuming post.id is the post's ID
      } else {
        await like(post.id).unwrap(); // Assuming post.id is the post's ID
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      // Handle error as needed
    }
  };

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
  const numPosts = data.posts.length;
  let numFollowing = 0;
  if (data.following) {
    numFollowing = data.following.length;
  }
  if (data.userId == currentuser.userId) {
    showdelete = true;
  }

  console.log(data);
  console.log(currentuser.userId);
  console.log(showdelete);

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
              {`Post:  ${numPosts}          Followers:     ${numFollowing}`}
            </p>
            {!showdelete && (
              <button
                className={`d-flex align-items-center justify-content-center m-2 ${
                  follow ? "btn btn-dark" : "btn btn-outline-dark"
                }`}
                type="button"
                onClick={handleFollowClick}
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
          <div
            className="card-body d-flex flex-column border border-dark rounded p-3 m-3"
            key={post.id}
          >
            <div className="card-body d-flex flex-row">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    className="card-img-top userImg p-2"
                    src={data.profilePhoto}
                    alt="Card image cap"
                  />
                  <h5 className="card-title p-2">
                    {" "}
                    {data.username.charAt(0).toUpperCase() +
                      data.username.slice(1)}
                  </h5>
                </div>
              </div>
              <div className="card-body">
                <div className="m-3 p-3">
                  <h4>
                    {data.username.charAt(0).toUpperCase() +
                      data.username.slice(1)}{" "}
                    is listening to <a href={post.link}>Music Track</a> by The
                    Foundations on Spotify.
                  </h4>
                  <h4>"{post.content}"</h4>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex flex-row">
              <div>
                <h4>
                  {" "}
                  {data.location.charAt(0).toUpperCase() +
                    data.location.slice(1)}
                </h4>
              </div>
              {showdelete ? (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete Post
                </button>
              ) : (
                <button
                  className={`d-flex align-items-center justify-content-center ${
                    liked ? "btn btn-danger" : "btn btn-outline-danger"
                  }`}
                  type="button"
                  onClick={handleLikeClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chat-heart-fill me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15m0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                  </svg>
                  Like
                </button>
              )}
            </div>
            {/* <div className="card-title m-3 d-flex flex-column">
                  <h4>{post.content}</h4>
                </div>
                <div>{post.link}</div>
                <div className="card-text m-3">{post.createdAt}</div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete Post
                </button> */}
          </div>
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
