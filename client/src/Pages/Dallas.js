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
      alias: "",
      date: "",
    },
  } = props;

  // We're using that initial student as our initial state
  const [post, setPost] = useState(initialPost);

  // const [selectedRestaurant, setSelectedRestaurant] = useState({
  //   alias: "",
  //   name: "",
  //   address: "",
  // });

  const [showRestaurant, setShowRestaurant] = useState("");

  const [matchingRestaurants, setMatchingRestaurants] = useState([]);

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
    const restaurantQuery = event.target.value;
    getRestaurants(event, restaurantQuery);
    setPost((post) => ({ ...post, restaurant: restaurantQuery }));
    setPost("");
    //event.target.value = showRestaurant;
  };

  const handleContentChange = (event) => {
    const content = event.target.value;
    setPost((post) => ({ ...post, content }));
  };

  const handleAliasChange = (event) => {
    const alias = event.target.value;
    setPost((post) => ({ ...post, alias }));
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setPost((post) => ({ ...post, date }));
  };

  //getting the API data from the server
  function getRestaurants(event, restaurant) {
    event.preventDefault();
    //restaurant
    fetch(`/api/location-search?term=${restaurant}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data check line 76 ", data.businesses);
        let matchingRestaurantsTemp = data.businesses.map((business) => ({
          alias: business.alias,
          name: business.name,
          address: business.location.display_address,
        }));
        setMatchingRestaurants(matchingRestaurantsTemp);
        console.log(
          "checking fetchRestaurant ",
          matchingRestaurantsTemp
        );
        console.log("checking restaurants ", restaurant);
      })
      .catch((err) => console.error(err));
  }

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
      newPosts(post);
    }
  };

  function changeValue(restaurantName) {
    let input = restaurantName
    setShowRestaurant(input);
    console.log("inputCheck" , input)
  }

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

      
      <div>
        {matchingRestaurants.map((restaurant) => (
          <ul key={restaurant.id}>
            <li> <a onClick={() => changeValue(restaurant)}> {restaurant.name} {JSON.stringify(restaurant)} </a> </li>
          </ul>
        ) )}
      </div>

      <DallasPostList />
    </div>
  );
};

export default Dallas;
