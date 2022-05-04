import { useState, useEffect } from "react";
import DallasPostList from "../components/DallasPostList";

const Dallas = (props) => {
  // Initial post in case that you want to update a new post
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

  const [restaurants, setRestaurants] = useState({alias: "", name: "", address: ""});

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

//getting the API data from the server
  function getRestaurants(e) {
    e.preventDefault();
    fetch("/api/location-search", {
      method: "GET",
      headers: {"Content-Type": "application/json",},
    }) .then((response) => response.json())
    .then((data) => {
      console.log("data check line 13 ", data.businesses[0]);
      let fetchRestaurant = {
        alias: data.businesses[0].alias,
        name: data.businesses[0].name,
        address: data.businesses[0].location.display_address
      }
      setRestaurants(fetchRestaurant);
      console.log("checking restaurants line 24 ", restaurants)
    }) .catch((err) => console.error(err))
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
          <label>Image Description</label>
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
        <button type="submit">{!post.id ? "Submit" : "Save"}</button> <br />
      </form>

      <button onClick={getRestaurants}>Api Render</button>
      {!restaurants.alias ? (<p>Testing here</p>) : (<div> <p>{restaurants.alias}</p> <p>{restaurants.name}</p> <p>{restaurants.address}</p> </div>)}

    <DallasPostList />
    </div>
  );
};

export default Dallas;
