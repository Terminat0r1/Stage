import Post from "./Post";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
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
          <h1>The Stage</h1>
        </div>

        <div className="row">
          <div className="col text-center">
            <div className="form-floating">
              <textarea
                className="form-control "
                placeholder="Post here"
                id="floatingTextarea2"
                style={{ width: "75%", height: 100 }}
                defaultValue={""}
              />
            </div>
            <div className=" col-4 text-right">
              <button className="btn btn-primary">Post</button>
            </div>
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
