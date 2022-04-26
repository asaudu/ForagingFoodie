const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
const app = express();
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});

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
    const newPost = req.body
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

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});