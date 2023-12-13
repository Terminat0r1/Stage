import React, { useState } from "react";
import {
  useDeletePostMutation,
  useUnfollowUserMutation,
  useFollowUserMutation,
  useLikeMutation,
  useUnlikeMutation,
} from "../stage/postSlice";

const ProfilePost = ({ post, refetch, data, currentuser }) => {
  let [liked, setLiked] = useState(false);

  if (post.likes.length > 0) {
    liked = true;
  }
  const [deletePostMutation] = useDeletePostMutation();
  const [like] = useLikeMutation();
  const [unlike] = useUnlikeMutation();

  let showdelete = false;
  const handleDeletePost = async (postId) => {
    try {
      await deletePostMutation(postId).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error as needed
    }
  };

  const handleLikeClick = async (postId) => {
    try {
      // Toggle the liked state when the button is clicked
      setLiked(!liked);

      // If liked is true, unlike the post using the mutation
      if (liked) {
        console.log(postId);
        await unlike(postId).unwrap(); // Assuming post.id is the post's ID
      } else {
        await like(postId).unwrap(); // Assuming post.id is the post's ID
      }
      refetch();
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      // Handle error as needed
    }
  };

  if (data.userId == currentuser.userId) {
    showdelete = true;
  }

  return (
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
              {data.username.charAt(0).toUpperCase() + data.username.slice(1)}
            </h5>
          </div>
        </div>
        <div className="card-body">
          <div className="m-3 p-3">
            <h4>
              {data.username.charAt(0).toUpperCase() + data.username.slice(1)}{" "}
              is listening to{" "}
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                Music Track
              </a>
            </h4>
            <h4>"{post.content}"</h4>
          </div>
        </div>
      </div>
      <div className="card-footer d-flex flex-row">
        <div>
          <h4>
            {" "}
            {data.location.charAt(0).toUpperCase() + data.location.slice(1)}
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
            onClick={() => handleLikeClick(post.id)}
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
    </div>
  );
};

export default ProfilePost;
