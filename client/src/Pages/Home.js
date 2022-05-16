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

  function checkShit(e) {
    e.preventDefault()
    console.log("what is thiss?!?!?")
  }

  //getting 1 profuct to render on the page
  posts.splice(1, 4);

  //Math.floor(Math.random(posts) * 4)

  //console.log("homepage post check", posts)
  return (
    <div>
      <h1 className="homePageTitle">Welcome to the Foraging Foodie</h1>
      <h2>Post of the Week</h2>
      {posts.map((post) => (
        <div key={post.id} className="card" style={{ width: "45rem" }}>
          <img
            className="card-img-top"
            src={post.imageurl}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{post.dish} from {post.restaurant}</h5>
            <p className="card-text-single">{post.content}</p>
            
            {/* <a onClick={checkShit} href="#" className="btn btn-primary">
              Go somewhere
            </a> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
