import React, { useState } from "react";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    // Toggle the liked state when the button is clicked
    setLiked(!liked);
  };

  return (
    <div
      className="row align-items-md-stretch d-flex justify-content-around "
      key={post.id}
    >
      <div className="col-md-5 w-100 m-3">
        <div className="h-100 p-5 bg-body-tertiary border rounded-3">
          <h2>{post.username}</h2>
          <p>{post.post}</p>
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
            <button
              className={`${
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
                className="bi bi-chat-heart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15m0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
              </svg>
              <br />
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
