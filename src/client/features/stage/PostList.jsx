import Post from "./Post";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useCreatePostMutation, useGetFollowingPostsQuery } from "./postSlice";
import { useState } from "react";

import "./stage.less";

const mockData = [
  {
    id: 45,
    content: "Post 3 by user_4893",
    createdAt: "2023-12-06T19:23:53.235Z",
    authorId: 15,
    author: {
      id: 15,
      username: "user_4893",
      profilePhoto:
        "https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg",
      location: "Pittsburgh",
    },
    likes: [],
  },
  {
    id: 44,
    content: "Post 2 by user_4893",
    createdAt: "2023-12-06T19:23:52.170Z",
    authorId: 15,
    author: {
      id: 15,
      username: "user_4893",
      profilePhoto:
        "https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg",
      location: "Pittsburgh",
    },
    likes: [],
  },
  {
    id: 43,
    content: "Post 1 by user_4893",
    createdAt: "2023-12-06T19:23:50.692Z",
    authorId: 15,
    author: {
      id: 15,
      username: "user_4893",
      profilePhoto:
        "https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg",
      location: "Pittsburgh",
    },
    likes: [],
  },
  {
    id: 24,
    content: "Post 3 by user_8705",
    createdAt: "2023-12-06T19:23:18.008Z",
    authorId: 8,
    author: {
      id: 8,
      username: "user_8705",
      profilePhoto:
        "https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg",
      location: "Pittsburgh",
    },
    likes: [],
  },
  {
    id: 23,
    content: "Post 2 by user_8705",
    createdAt: "2023-12-06T19:23:17.924Z",
    authorId: 8,
    author: {
      id: 8,
      username: "user_8705",
      profilePhoto:
        "https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg",
      location: "Pittsburgh",
    },
    likes: [],
  },
  {
    id: 22,
    content: "Post 1 by user_8705",
    createdAt: "2023-12-06T19:23:17.842Z",
    authorId: 8,
    author: {
      id: 8,
      username: "user_8705",
      profilePhoto:
        "https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg",
      location: "Pittsburgh",
    },
    likes: [],
  },
  {
    id: 18,
    content: "Post 3 by user_9404",
    createdAt: "2023-12-06T19:23:17.307Z",
    authorId: 6,
    author: {
      id: 6,
      username: "user_9404",
      profilePhoto:
        "https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg",
      location: "Pittsburgh",
    },
    likes: [],
  },
  {
    id: 17,
    content: "Post 2 by user_9404",
    createdAt: "2023-12-06T19:23:17.215Z",
    authorId: 6,
    author: {
      id: 6,
      username: "user_9404",
      profilePhoto:
        "https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg",
      location: "Pittsburgh",
    },
    likes: [],
  },
  {
    id: 16,
    content: "Post 1 by user_9404",
    createdAt: "2023-12-06T19:23:17.125Z",
    authorId: 6,
    author: {
      id: 6,
      username: "user_9404",
      profilePhoto:
        "https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg",
      location: "Pittsburgh",
    },
    likes: [],
  },
];

function PostList() {
  const token = useSelector(selectToken);
  const [newPost, setNewPost] = useState("");
  const [musicLink, setMusicLink] = useState(""); // Added state for music link
  const [createPost] = useCreatePostMutation();
  const { data: posts, refetch } = useGetFollowingPostsQuery();

  function handleRefetchOne() {
    // force re-fetches the data
    refetch();
  }

  let followingposts = posts || mockData;

  const create = async (evt) => {
    evt.preventDefault();

    const credentials = {
      content: newPost,
      link: musicLink, // Include music link in the credentials
    };
    try {
      await createPost(credentials).unwrap();
      setNewPost("");
      setMusicLink(""); // Clear music link after posting
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) {
    return (
      <div className="container  py-5 px-3 mx-auto">
        <h4>Login to see posts</h4>
      </div>
    );
  }
  return (
    <>
      <div className="container  py-4 px-3 mx-auto">
        <div>
          <h1 className="title">The Vibe</h1>
        </div>

        <div className="row">
          <div className="col text-center align-items-center">
            <form onSubmit={create} className="w-75 mx-auto">
              <div className="form-floating align-items-center">
                {/* Input field for music link */}
                <div className="form-floating mt-2">
                  <input
                    type="text"
                    value={musicLink}
                    onChange={(e) => setMusicLink(e.target.value)}
                    className="form-control m-2 p-2"
                    placeholder="Share what you're listening to..."
                  />
                </div>
                <textarea
                  type="text"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="form-control  m-2 p-2"
                  placeholder="Share your thoughts here..."
                  style={{ height: 100 }}
                  defaultValue={""}
                />
              </div>
              <div className=" d-flex justify-content-center p-3 ">
                <button className="btn btn-primary">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container  py-5 px-3 w-100">
        {followingposts.map((post) => (
          <Post post={post} key={post.id} refetch={handleRefetchOne} />
        ))}
      </div>
    </>
  );
}

export default PostList;
