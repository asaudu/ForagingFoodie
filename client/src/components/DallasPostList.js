import { useEffect, useState } from "react";
//import IndividualPost from "./IndividualPost";
//import EditForm from "./EditForm";
import Form from "./Form";

function DallasPostList(props) {
  const [posts, setPosts] = useState([]);

  //let selected = props;

  const [editingPostId, setEditingPostId] = useState(null);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetch("/api/blogposts/dallas")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  const loadUser = () => {
    fetch("/api/me")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return undefined;
        }
      })
      .then((user) => {
        setUser(user);
      });
  };

  useEffect(() => {
    loadUser();
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

  const updatePost = (updatedPost) => {
    setPosts((posts) => {
      const newPostList = [];
      for (let post of posts) {
        if (post.id === updatedPost.id) {
          newPostList.push(updatedPost);
        } else {
          newPostList.push(post);
        }
      }
      return newPostList;
    });
    //this is meant to close the form
    setEditingPostId(null);
  };

//a function to grab the post id of the student that we want to edit
const onEdit = (post) => {
  const editingId = post.id;
  console.log(editingId);
  setEditingPostId(editingId);
};

  //logic for deleting an existing post by id
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

  //logic for submitting a new post and saving changes made to an existing post
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

  const addPost = (newPost) => {
    //console.log(newPost);
    setPosts((posts) => [...posts, newPost]);
  };

  //console.log(posts);
  return (
    <div>
      {posts.map((post) => {
        if (post.id === editingPostId) {
          console.log("dpList prop check", post);
          return <Form header={"Editing Mode"} location={"Dallas, TX"} initialPost={post} addPost={addPost}/>;
        } else {
          return (
        <div key={post.id} className="cardPostList" style={{ width: "20rem" }}>
          <img
            className="card-img-top"
            src={post.imageurl}
            alt="Card image cap"
            style={{ width: "500px", height: "400px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{post.dish}</h5>
            <p
              className="card-text"
              style={{
                height: "1.5rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.content}
            </p>
            <button
              onClick={() => {
                onClickHandler(post);
              }}
            >
              View
            </button>
            {user && (
              <>
                <button onClick={(e) => {
                  e.preventDefault();
                  onEdit(post)
                }}>Edit</button>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(post.id);
                  }}
                >
                  Delete
                </button>
                </>
            )}
          </div>
        </div>
          )
                }
              })}
    </div>
  );
}

export default DallasPostList;
