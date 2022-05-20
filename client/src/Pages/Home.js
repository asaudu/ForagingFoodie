import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/blogposts")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  //getting 1 profuct to render on the page
  posts.splice(1, 4);

  //Math.floor(Math.random(posts) * 4)

  //console.log("homepage post check", posts)
  return (
    <div>
      <h1 className="homePageTitle">Welcome to the Foraging Foodie</h1>

      <div className="cardDiv" style={{ margin: "auto", width: "40rem" }}>
        <h2>Post of the Week</h2>
        {posts.map((post) => (
          <div key={post.id} className="card">
            <img
              className="card-img-top"
              className="rounded-circle"
              src={post.imageurl}
              alt="Card image cap"
              style={{
                width: "600px",
                height: "500px",
                paddingTop: "5px",
                alignItems: "center",
              }}
            />
            <div
              className="card-body"
              style={{ backgroundColor: "#084b83", borderRadius: "4px" }}
            >
              <h5 className="card-title">
                {post.dish} from {post.restaurant}
              </h5>
              <p className="card-text-single">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
