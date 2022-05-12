import { useEffect, useState } from "react";
//import EditForm from "./EditForm";

function DallasPostList() {
  const [posts, setPosts] = useState([]);

  const [editingPostId, setEditingPostId] = useState([]);

  useEffect(() => {
    fetch("/api/blogposts")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  const updatePost = (savePost) => {
    setPosts(() => {
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
    setEditingPostId(null);
  };

  const onDelete = async (id) => {
    try {
      const deleteResponse = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      if (deleteResponse.status === 200) {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(posts);
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
                  <button>View</button>
                  <button>Edit</button>
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
