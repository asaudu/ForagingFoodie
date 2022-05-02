import { useState, useEffect } from "react";

const Dallas = (props) => {
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

  const [food, setFood] = useState([]);

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

  //A function to handle the api request
  // const loadApi = () => {
  //   fetch("http://localhost:8080/api/location-search")
  //     .then((response) => response.json())
  //     .then(food => {
  //       setFood(food);
  //     })
  // }

  // useEffect(() => {
  //   loadApi();
  // }, []);
  // console.log("restaurant names ", food)

  const getApi = (e) => {
    e.preventDefault();
    // let restaurantName = e.target.elements.restaurantName.value;
    // console.log("Line 81 info", restaurantName);
    fetch("/api/location-search", {
      method: "GET",
      headers: {"Content-Type": "application/json",
    },
    })
    .then((response) => response.json())
    .then((data) => {
      setFood(data.response.food);
    })
    .catch((err) => console.error(`Error: ${err}`));
  }

  useEffect(() => {
      getApi();
    }, []);
  console.log("restaurant names ", food)

  // if (!food) {
  //    <div>loading...</div>;
  // } else {
  //   return (
  //     <ul>
  //       {food.map(foods => (
  //         <li key={foods.id}>{foods.name} {foods.location}</li>
  //       ))}
  //     </ul>
  //   );
  // };
  
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

        <button type="submit">{!post.id ? "Submit" : "Save"}</button> <br/>
      </form>
      <button onClick={(e) => getApi(e)}>Api Render</button>
      <ul>
      {food.map((foods, alias) => 
        <li key={alias}>{foods.name} {foods.location}</li>
    )}
      </ul>
      <div className="card" style={{width: "18rem"}}>
        <img className="card-img-top" src="..." alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dallas;
