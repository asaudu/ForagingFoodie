import { useState } from "react";

const DallasForm = (props) => {
  const {
    initialPost = {
      id: null,
      username: "",
      imageurl: "",
      alt: "",
      dish: "",
      restaurant: "",
      content: "",
      date: "",
      alias: "",
    },
  } = props;

  // We're using that initial student as our initial state
  const [post, setPost] = useState(initialPost);

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
    //setPost("");
    //event.target.value = showRestaurant;
  };

  const handleContentChange = (event) => {
    const content = event.target.value;
    setPost((post) => ({ ...post, content }));
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
        console.log("checking fetchRestaurant ", matchingRestaurantsTemp);
        //console.log("checking restaurants ", restaurant);
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

  //function to define how to populate the Restaurant Name with the clicked option
  function chosenRestaurant(restaurant) {
    let input = restaurant;
    setPost((post) => ({
      ...post,
      restaurant: restaurant.name,
      alias: restaurant.alias,
    }));
    console.log("inputCheck", input);
  }

  return (
    <div>
      <h1>Dallas Ventures Heeere</h1>

      <form
        className="blogForm"
        onSubmit={handleSubmit}
        style={{ height: "21.5rem", width: "38rem" }}
      >
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
          <label>Date</label>
          <input
            type="date"
            id="add-date"
            placeholder="Date"
            required
            value={post.date}
            onChange={handleDateChange}
          />
          <br />
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
            placeholder="Image Description"
            required
            value={post.alt}
            onChange={handleAltChange}
          />
          <br />
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
          <label>Content</label> <br />
          <textarea
            type="text"
            id="add-content"
            placeholder="Dish the Deets Here"
            required
            value={post.content}
            onChange={handleContentChange}
            style={{ height: "10rem", width: "20rem" }}
          />
          <input type="hidden" id="alias" required value={post.alias} />
          <br />
          <button type="submit">{!post.id ? "Submit" : "Save"}</button>
        </fieldset>
      </form>

      <div>
        {matchingRestaurants.map((restaurant) => (
          <ul key={restaurant.id}>
            <li>
              {" "}
              <a onClick={() => chosenRestaurant(restaurant)}>
                {" "}
                {restaurant.name} {JSON.stringify(restaurant)}{" "}
              </a>{" "}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DallasForm;
