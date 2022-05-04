const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");
const { auth } = require("express-openid-connect");
require("dotenv").config();
const db = require("../server/db/db-connection.js");
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "build");
const app = express();

//auth0 config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
};

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(auth(config));

//trying the set up from S.O
const yelp = require("yelp-fusion");
const { response } = require("express");
const apiKey = process.env.API_KEY;

// const searchRequest = {
//     term: 'restaurants',
//     location: 'Dallas'
// };

// const searchRequest = {
//     term: 'restaurants',
//     location: 'Gunsan'
// };

const client = yelp.client(apiKey);
//S.O stuff stops here

//creates an endpoint for the route /api;
app.get("/", (req, res) => {
  //console.log(req.oidc.isAuthenticated());
  //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

app.get("/api/me", (req, res) => {
  console.log(req.oidc.isAuthenticated());

  if (req.oidc.isAuthenticated()) {
    console.log(req.oidc.user);
    res.json(req.oidc.user);
  } else {
    res.status(401).json({ error: "Error with auth0" });
  }
});

app.use(express.static(REACT_BUILD_DIR));

app.get("/api/business/:alias", async (req, res) => {
  yelpResponse = await client.business(req.params.alias);
  res.send(yelpResponse.jsonBody);
  try {
    const data = await response.json;
    console.log(data);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

//creates an endpoint for the route /api; this one is beautiful
app.get("/api/location-search", cors(), async (req, res) => {
  location = req.query.location;
  console.log("Line 48 check", location);

  yelpResponse = await client.search({
    term: "brunch",
    location: "Richardson, TX",
  });
  res.send(yelpResponse.jsonBody);
});

//users get request
app.get("/api/users", cors(), async (req, res) => {
  try {
    const { rows: user } = await db.query("SELECT * FROM users");
    res.send(user);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//blogposts get request
app.get("/api/blogposts", cors(), async (req, res) => {
  try {
    const { rows: posts } = await db.query("SELECT * FROM blogposts");
    res.send(posts);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//users POST request
app.post("/api/users", cors(), async (req, res) => {
  const newUser = { username: req.body.username, email: req.body.email };
  console.log([newUser.username, newUser.email]);
  const result = await db.query(
    "INSERT INTO users(username, email) VALUES($1, $2) RETURNING *",
    [newUser.username, newUser.email]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

//blogposts POST request
app.post("/api/blogposts", cors(), async (req, res) => {
  const newPost = req.body.newPost;
  console.log([newUser.firstname, newUser.lastname]);
  const result = await db.query(
    "INSERT INTO blogposts(id, user_id, imageurl, alt, dish, restaurant, content, city, date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [
      newPost.id,
      newPost.user_id,
      newPost.imageurl,
      newPost.alt,
      newPost.dish,
      newPost.restaurant,
      newPost.content,
      newPost.city,
      newPost.date,
    ]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// users delete request
app.delete("/api/users/:userId", cors(), async (req, res) => {
  const userId = req.params.userId;
  //console.log(req.params);
  await db.query("DELETE FROM users WHERE id=$1", [userId]);
  res.status(200).end();
});

// blogposts delete request
app.delete("/api/blogposts/:postId", cors(), async (req, res) => {
  const postId = req.params.postId;
  //console.log(req.params);
  await db.query("DELETE FROM blogposts WHERE id=$1", [postId]);
  res.status(200).end();
});

// blogposts Put request - Update request
app.put("/api/blogposts/:postId", cors(), async (req, res) => {
  const postId = req.params.postId;
  const updatePost = req.body;
  //console.log(req.params);
  // UPDATE students SET lastname = 'TestMarch' WHERE id = 1;
  console.log(postId);
  console.log(updatePost);
  const query = `UPDATE blogposts SET imageurl=$1, alt=$2, dish=$3, restaurant=$4, content=$5, city=$6, date=$7 WHERE id = ${postId} RETURNING *`;
  console.log(query);
  const values = [
    updatePost.imageurl,
    updatePost.alt,
    updatePost.dish,
    updatePost.restaurant,
    updatePost.content,
    updatePost.city,
    updatePost.date,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//the post request for the restaurant location for the post
let location;
app.post("/api/location-search", (req, res) => {
  location = req.body.location;
  res.redirect("/restaurantLocation");
});

//api request usual format
// app.get("/api/weather", cors(), async (req, res) => {
//     city = req.query.city;
//      const url = `https://api.yelp.com/v3/businesses/search${process.env.API_KEY}`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log(data);
//       res.send(data);
//     } catch (err) {
//       console.error("Fetch error: ", err);
//     }
//   });

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
