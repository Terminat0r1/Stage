import React, { useState } from "react";
import ProfileNavTabs from "./ProfileNavbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useGetUserQuery } from "../stage/postSlice";
import { useDeletePostMutation } from "../stage/postSlice";
import CurrUserPosts from "./CurrUserPosts";

const ProfilePage = () => {
  const token = useSelector(selectToken);
  const { id } = useParams();
  const { data, error, isLoading } = useGetUserQuery(id);
  const [deletePostMutation] = useDeletePostMutation();

  // Function to handle post deletion
  const handleDeletePost = async (postId) => {
    try {
      await deletePostMutation(postId).unwrap();
    } catch (error) {
      console.error("Error deleting post:", error);
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
  // console.log(data);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="card border border-dark rounded p-3 m-3 w-100">
        <div className="card-header m-3">
          <h4>{data.location}</h4>
        </div>

        <div className="card-body d-flex flex-column">
          <img
            className="card-img"
            src={data.profilePhoto}
            alt="User Profile"
          />
          <h4 className="card-title m-3">{data.username}</h4>
          <h5>{data.aboutMe}</h5>
          <p className="card-text m-3">
            {`Post:  ${numPosts}          Followers:     ${numFollowing}`}
          </p>
        </div>
      </div>
      <div className="card border border-dark rounded p-3 m-3 w-100">
        <div className="card-header m-3">
          <h4>Posts</h4>
        </div>
        {data.posts.map((post) => (
          <CurrUserPosts post={post} key={post.id} />
          // <div
          //   className="card-body d-flex flex-column border border-dark rounded p-3 m-3"
          //   key={post.id}
          // >
          //   <div className="card-title m-3 d-flex flex-column">
          //     <h4>{post.content}</h4>
          //   </div>
          //   <div className="card-text m-3">{post.createdAt}</div>
          //   <button
          //     className="btn btn-danger"
          //     onClick={() => handleDeletePost(post.id)}
          //   >
          //     Delete Post
          //   </button>
          // </div>
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
