const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
const app = express();
app.use(express.static(REACT_BUILD_DIR));

//trying the set up from S.O
const yelp = require('yelp-fusion');
const { response } = require('express');
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

/* 'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('YOUR_API_KEY');

client.business('gary-danko-san-francisco').then(response => {
  console.log(response.jsonBody.name);
}).catch(e => {
  console.log(e);
});

'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('YOUR_API_KEY');

client.search({
  term: 'Four Barrel Coffee',
  location: 'san francisco, ca',
}).then(response => {
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log(e);
});
*/

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());


//creates an endpoint for the route /api;
app.get('/', (req, res) => {
    res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});


app.get("/api/business/:alias", async (req, res) => {
    yelpResponse = await client.business(req.params.alias);
    res.send(yelpResponse.jsonBody)
    try {
        const data = await response.json
        console.log(data);
    } catch (err) {
        console.error(err);
        res.send(err)
    }
});

//creates an endpoint for the route /api; this one is beautiful
app.get("/api/location-search", cors(), async (req, res) => {
    location = req.query.location;
    console.log("Line 48 check", location);

    yelpResponse = await client.search({
        term: 'brunch',
        location: 'Richardson, TX'
    });
    res.send(yelpResponse.jsonBody)
});

//the get request for the restaurant location for the post with original request method
// app.get("/api/location-search", async (req, res) => {
//     const term = req.body.term;
//     const location = req.query.location;
//     const url = `https://api.yelp.com/v3/businesses/search?term=brunch&location=richardson, TX`

    
//     client.search({
//         term,
//         location
//     })
//    try {
//     const response = await fetch(url)
//     const data = await response.json()
//     console.log(data);
//     //res.send(data);
//    } catch (error) {
//     console.error(error);
//     res.send(error)
//    };
// });



//yelp api call from S.O, called immedieately instead of on cue
// client.search(searchRequest)
//   .then((response) => {
//     console.log(response.jsonBody);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//users get request
app.get('/api/users', cors(), async (req, res) => {
    
    // const STUDENTS = [

    //     { id: 1, firstName: 'Lisa', lastName: 'Lee' },
    //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
    //     { id: 3, firstName: 'Fariba', lastName: 'Dako' },
    //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
    //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
    // ];
    // res.json(STUDENTS);
    try{
        const { rows: user } = await db.query('SELECT * FROM users');
        res.send(user);
    } catch (e){
        console.log(e);
        return res.status(400).json({e});
    }
});

//blogposts get request
app.get('/api/blogposts', cors(), async (req, res) => {
    
    try{
        const { rows: posts } = await db.query('SELECT * FROM blogposts');
        res.send(posts);
    } catch (e){
        console.log(e);
        return res.status(400).json({e});
    }
});

//users POST request
app.post('/api/users', cors(), async (req, res) => {
    const newUser = { username: req.body.username, email: req.body.email }
    console.log([newUser.username, newUser.email]);
    const result = await db.query(
        'INSERT INTO users(username, email) VALUES($1, $2) RETURNING *',
        [newUser.username, newUser.email]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

//blogposts POST request
app.post('/api/blogposts', cors(), async (req, res) => {
    const newPost = req.body.newPost
    console.log([newUser.firstname, newUser.lastname]);
    const result = await db.query(
        'INSERT INTO blogposts(imageurl, alt, dish, restaurant, content, city, date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [newPost.imageurl, newPost.alt, newPost.dish, newPost.restaurant, newPost.content, newPost.city, newPost.date]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// users delete request
app.delete('/api/users/:userId', cors(), async (req, res) =>{
    const userId = req.params.userId;
    //console.log(req.params);
    await db.query('DELETE FROM users WHERE id=$1', [userId]);
    res.status(200).end();

});

// blogposts delete request
app.delete('/api/blogposts/:postId', cors(), async (req, res) =>{
    const postId = req.params.postId;
    //console.log(req.params);
    await db.query('DELETE FROM blogposts WHERE id=$1', [postId]);
    res.status(200).end();

});

// blogposts Put request - Update request
app.put('/api/blogposts/:postId', cors(), async (req, res) =>{
    const postId = req.params.postId;
    const updatePost = req.body
    //console.log(req.params);
    // UPDATE students SET lastname = 'TestMarch' WHERE id = 1;
    console.log(postId);
    console.log(updatePost);
    const query = `UPDATE blogposts SET imageurl=$1, alt=$2, dish=$3, restaurant=$4, content=$5, city=$6, date=$7 WHERE id = ${postId} RETURNING *`;
    console.log(query);
    const values = [updatePost.imageurl, updatePost.alt, updatePost.dish, updatePost.restaurant, updatePost.content, updatePost.city, updatePost.date];
    try{
        const updated = await db.query(query, values);
        console.log(updated.rows[0]);
        res.send(updated.rows[0]);
    } catch (e){
        console.log(e);
        return res.status(400).json({e});
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