import { useState } from 'react';

const EditForm = (props) => {
    // Initial student in case that you want to update a new student
    const {
      initialPost = {
        id: null,
        username: "",
        imageurl: "",
        alt: "",
        dish: "",
        restaurant: "",
        content: "",
        city: "",
        date: "",
      },
    } = props;
  
    // We're using that initial student as our initial state
    const [post, setPost] = useState(initialPost);
  
    //create functions that handle the event of the user typing into the form
    const handleUsernameChange = (event) => {
      const username = event.target.value;
      setPost((post) => ({ ...post, username }));
    };
  
    const handleImageURLChange = (event) => {
      const imageurl = event.target.value;
      setPost((post) => ({ ...post, imageurl }));
    };
  
    const handleAltChange = (event) => {
      const alt = event.target.value;
      setPost((post) => ({ ...post, alt }));
    };
  
    const handleDishChange = (event) => {
      const dish = event.target.value;
      setPost((post) => ({ ...post, dish }));
    };
  
    const handleRestaurantChange = (event) => {
      const restaurant = event.target.value;
      setPost((post) => ({ ...post, restaurant }));
    };
  
    const handleContentChange = (event) => {
      const content = event.target.value;
      setPost((post) => ({ ...post, content }));
    };
  
    const handleCityChange = (event) => {
      const city = event.target.value;
      setPost((post) => ({ ...post, city }));
    };
  
    const handleDateChange = (event) => {
      const date = event.target.value;
      setPost((post) => ({ ...post, date }));
    };
  
    //A function to handle the post request
    const makePost = (newPost) => {
      return fetch("/api/blogposts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("From the post ", data);
          props.savePost(data);
        });
    };
  
    //a function to handle the Update request
    const updatePost = (existingPost) => {
      return fetch(`/api/blogposts/${existingPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(existingPost),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("From put request ", data);
          props.savePost(data);
        });
    };
  
    // Than handle submit function now needs the logic for the update scenario
    const handleSubmit = (e) => {
      e.preventDefault();
      if (post.id) {
        updatePost(post);
      } else {
        makePost(post);
      }
    };
  
    return (
      <div>
        <h1>Dallas Ventures Heeere</h1>
  
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>Username</label>
            <input
              type="text"
              id="add-user-name"
              placeholder="Username"
              required
              value={post.username}
              onChange={handleUsernameChange}
            />
            <label>Image URL</label>
            <input
              type="text"
              id="add-image-url"
              placeholder="Image URL"
              required
              value={post.imageurl}
              onChange={handleImageURLChange}
            />
            <label>Alt</label>
            <input
              type="text"
              id="add-alt"
              placeholder="Alt"
              required
              value={post.alt}
              onChange={handleAltChange}
            />
            <label>Dish Name</label>
            <input
              type="text"
              id="add-dish-name"
              placeholder="Dish Name"
              required
              value={post.dish}
              onChange={handleDishChange}
            />
            <label>Restaurant Name</label>
            <input
              type="text"
              id="add-restaurant"
              placeholder="Restaurant Name"
              required
              value={post.restaurant}
              onChange={handleRestaurantChange}
            />
            <label>Content</label>
            <input
              type="text"
              id="add-content"
              placeholder="Content Here"
              required
              value={post.content}
              onChange={handleContentChange}
            />
            <label>City</label>
            <input
              type="text"
              id="add-city"
              placeholder="City Name"
              required
              value={post.city}
              onChange={handleCityChange}
            />
            <label>Date</label>
            <input
              type="date"
              id="add-date"
              placeholder="Date"
              required
              value={post.date}
              onChange={handleDateChange}
            />
          </fieldset>
  
          <button type="submit">{!post.id ? "Submit" : "Save"}</button>
        </form>
      </div>
    );
  };
  
  export default EditForm;