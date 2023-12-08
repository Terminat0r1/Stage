import React, { useState } from "react";
import {
  useUnfollowUserMutation,
  useGetCurrentUserQuery,
  useFollowUserMutation,
  useLikeMutation,
  useUnlikeMutation,
} from "./postSlice";
import "./stage.less"

const Post = ({ post }) => {
  let [liked, setLiked] = useState(false);
  const [follow, setFollow] = useState(true);

  const { data: currentUser } = useGetCurrentUserQuery();
  const [unfollowUser] = useUnfollowUserMutation();
  const [followUser] = useFollowUserMutation();
  const [like] = useLikeMutation();
  const [unlike] = useUnlikeMutation();

  const currentId = currentUser?.userId;

  // console.log(currentId);
  // console.log(post.likes);

  if (post.likes.some((obj) => obj.likerId === currentId)) {
    liked = true;
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
  const handleLikeClick = async () => {
    try {
      // If liked is true, unlike the post using the mutation
      if (liked) {
        console.log(post.id);
        await unlike(post.id).unwrap(); // Assuming post.id is the post's ID
      } else {
        await like(post.id).unwrap(); // Assuming post.id is the post's ID
      }
      // Toggle the liked state when the button is clicked
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      // Handle error as needed
    }
  };

  // Function to update likes in your state or Redux store
  const updatePostLikes = (postId, updatedLikes) => {
    // Implement the logic to update the likes in your state or Redux store
    // This depends on how you are managing your state or Redux store
    // Example Redux dispatch action:
    // dispatch(updatePostLikesAction(postId, updatedLikes));
  };

  return (
    <div
      className="row align-items-md-stretch d-flex justify-content-around "
      key={post.id}
    >
      <div className="col-md-5 w-100 m-3">
        <div className="h-100 p-5 bg-body-tertiary border rounded-3">
          <p>{post.author.location}</p>
          <h2>
            {" "}
            {post.author.username.charAt(0).toUpperCase() +
              post.author.username.slice(1)}
          </h2>

          <h4>{post.content}</h4>
          <p>{post.createdAt}</p>
          <div>
            <iframe
              width="100%"
              height={300}
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/286058615&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            />
            <div
              style={{
                fontSize: 10,
                color: "#cccccc",
                lineBreak: "anywhere",
                wordBreak: "normal",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontFamily:
                  "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                fontWeight: 100,
              }}
            >
              <a
                href="https://soundcloud.com/kerina-gray"
                target="_blank"
                style={{ color: "#cccccc", textDecoration: "none" }}
              >
                Kerina Gray
              </a>{" "}
              ·{" "}
              <a
                href="https://soundcloud.com/kerina-gray/sets/chrismas-songs"
                title="chrismas songs"
                style={{ color: "#cccccc", textDecoration: "none" }}
              >
                chrismas songs
              </a>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            {" "}
            <button
              className={`d-flex align-items-center justify-content-center m-3 ${
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
            <button
              className={`d-flex align-items-center justify-content-center m-3 ${
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
                className="bi bi-plus-circle-fill me-2 "
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
              {follow ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
