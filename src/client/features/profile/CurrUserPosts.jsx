import { useState } from "react";
import React from "react";
import {
  useUnfollowUserMutation,
  useGetCurrentUserQuery,
  useFollowUserMutation,
  useLikeMutation,
  useUnlikeMutation,
} from "../stage/postSlice";

const CurrUserPosts = ({ post }) => {
  const [follow, setFollow] = useState(false);
  const [unfollowUser] = useUnfollowUserMutation();
  const [followUser] = useFollowUserMutation();

  const handleFollowClick = async () => {
    try {
      // Toggle the follow state when the button is clicked
      setFollow(!follow);

      // If follow is true, unfollow the user using the mutation
      if (follow) {
        await unfollowUser(post.author.id).unwrap(); // Assuming post.author.id is the user's ID
      } else if (!follow) {
        await followUser(post.author.id).unwrap(); // Assuming post.author.id is the user's ID
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      // Handle error as needed
    }
  };
  console.log(post);
  return (
    <div
      className="stagecard card border border-dark rounded w-100 p-3 m-3"
      key={post.id}
    >
      <div className="card-header">
        {/* <h4>
          {" "}
          {post.author.location.charAt(0).toUpperCase() +
            post.author.location.slice(1)}
        </h4> */}
      </div>

      <div className="d-flex card-body align-items-center text-center">
        <div className="d-flex align-items-center justify-content-center">
          {/* <img
            className="card-img-top userImg p-2"
            src={post.author.profilephoto}
            alt="Card image cap"
          /> */}
          {/* <h5 className="card-title p-2">
            {" "}
            {post.author.username.charAt(0).toUpperCase() +
              post.author.username.slice(1)}
          </h5> */}
        </div>

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
      </div>
      <h2>{post.content}</h2>
    </div>
  );
};

export default CurrUserPosts;
