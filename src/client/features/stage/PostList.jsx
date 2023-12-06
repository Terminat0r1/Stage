import Post from "./Post";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useCreatePostMutation } from "./postSlice";
import { useState } from "react";
const mockData = [
  {
    id: 1,
    username: "Noah",
    post: "You only live once, but if you do it right, once is enough.",
    like: true,
  },
  {
    id: 2,
    username: "Emma",
    post: "So many books, so little time.",
    like: false,
  },
  {
    id: 3,
    username: "Hannah",
    post: "A room without books is like a body without a soul.",
    like: false,
  },
];

function PostList() {
  const token = useSelector(selectToken);
  const [newPost, setNewPost] = useState("");
  const [createPost] = useCreatePostMutation();

  const create = async (evt) => {
    evt.preventDefault();

    const credentials = {
      content: newPost,
    };
    try {
      await createPost(credentials).unwrap();
      setNewPost("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) {
    return (
      <div className="container  py-5 px-3 mx-auto">
        {mockData.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="container  py-4 px-3 mx-auto">
        <div>
          <h1>The Vibe</h1>
        </div>

        <div className="row">
          <div className="col text-center">
            <form onSubmit={create}>
              <div className="form-floating">
                <textarea
                  type="text"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="form-control "
                  placeholder="Post here"
                  style={{ width: "75%", height: 100 }}
                  defaultValue={""}
                />
              </div>
              <div className=" col-4 text-right">
                <button className="btn btn-dark">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container  py-5 px-3 w-100">
        {mockData.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </>
  );
}

export default PostList;
