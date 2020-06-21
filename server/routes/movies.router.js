const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require('../modules/pool');

//get request to get array of all movie objects from db
router.get('/', (req, res) => {
    const query = 'SELECT * FROM movies';
    pool.query(query)
        .then(response => {
            //send the array of movie objects in db (response.rows) back to index.js
            res.send(response.rows);
        })
        .catch(error => {
            console.log('problem with movies.router get:', error);
        })
})

module.exports = router;