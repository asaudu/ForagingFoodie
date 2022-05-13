//import { useState, useEffect } from "react";

function IndividualPost(props) {
    const {post} = props;
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("/api/blogposts")
//       .then((response) => response.json())
//       .then((posts) => {
//         setPosts(posts);
//       });
//   }, []);
console.log("individual post ", post);

  return (
    <div>
      <h1 className="homePageTitle">Welcome to the Foraging Foodie</h1>
      <h2>Post of the Week</h2>
      <div className="card" style={{ width: "45rem" }}>
        <img
          className="card-img-top"
          src={post.imageurl}
          alt="desciption"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{post.dish}</h5>
        <p className="card-text-single">
          {post.restaurant} {post.display_address}
        </p>
        <p className="card-text-single">{post.content}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default IndividualPost;
