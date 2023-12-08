import { useState } from "react";
import React from "react";
import {
  useGetCurrentUserQuery,
  useDeletePostMutation,
} from "../stage/postSlice";

const CurrUserPosts = ({ post }) => {
  let currUser = false;

  const { data: currentUser } = useGetCurrentUserQuery();
  const [deletePostMutation] = useDeletePostMutation();

  const currId = currentUser?.userId;

  if (post.id === currId) {
    currUser = true;
  }

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
      className="card-body d-flex flex-column border border-dark rounded p-3 m-3"
      key={post.id}
    >
      <div className="card-title m-3 d-flex flex-column">
        <h4>{post.content}</h4>
      </div>
      <div className="card-text m-3">{post.createdAt}</div>
      <button
        className="btn btn-danger"
        onClick={() => handleDeletePost(post.id)}
      >
        Delete Post
      </button>
    </div>
  );
};

export default CurrUserPosts;
