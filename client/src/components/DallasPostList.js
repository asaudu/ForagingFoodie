import { useEffect, useState } from "react";
//import IndividualPost from "./IndividualPost";
//import EditForm from "./EditForm";

function DallasPostList(props) {
  const [posts, setPosts] = useState([]);

  //let selected = props;

  const [editingPostId, setEditingPostId] = useState([]);

  useEffect(() => {
    fetch("/api/blogposts")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  //A function to handle the post request
  const newPosts = async (newPost) => {
    const response = await fetch("/api/blogposts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    console.log("From the post ", data);
    props.savePost(data);
  };

  const updatePost = (savePost) => {
    setPosts((posts) => {
      const newPost = [];
      for (let post of posts) {
        if (post.id === savePost.id) {
          newPost.push(savePost);
        } else {
          newPost.push(post);
        }
      }
      return newPost;
    });
    //this is meant to close the form
    setEditingPostId(null);
  };

  const onDelete = async (id) => {
    try {
      const deleteResponse = await fetch(`/api/blogposts/${id}`, {
        method: "DELETE",
      });
      if (deleteResponse.status === 200) {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (posts.id) {
      updatePost(posts);
    } else {
      newPosts(posts);
    }
  };

  //connecting the switchDisplayView functionality from the Dallas component
  let onClickHandler = (post) => {
    props.passingSelected(post);
  };

  //console.log(posts);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="card"
                className="mb-4 mt-4"
                style={{ width: "20rem" }}
              >
                <img
                  className="card-img-top"
                  src={post.imageurl}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{post.dish}</h5>
                  <p
                    className="card-text"
                    style={{
                      height: "1.5rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {post.content}
                  </p>
                  {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
                  <button
                    onClick={() => {
                      onClickHandler(post);
                    }}
                  >
                    View
                  </button>
                  <button onClick={handleSubmit}>Edit</button>
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(post.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DallasPostList;
