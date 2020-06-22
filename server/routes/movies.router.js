const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require('../modules/pool');
const { Query } = require("pg");

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

router.get('/:id', (req, res) => {
    //using the id given, get details from one movie from database.
    //one query for general info, one complex query for genres
    //bundle into one object!
    const query = `SELECT * FROM movies WHERE id=$1`;
    pool.query(query, [req.params.id])
        .then(response => {
            console.log('response from first query:', response);
            let details= response.rows[0];
            let genreQuery = `SELECT "genres"."name" FROM "movies"
            JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movies_id"
            JOIN "genres" ON "movies_genres"."genres_id" = "genres"."id"
            WHERE "movies"."id" = $1;`;
            pool.query(genreQuery, [req.params.id])
                .then(response => {
                    let genreResult= response.rows;
                    let genreArray=[];
                    for (object of genreResult){
                        genreArray.push(object.name);
                    }
                    details.genres=genreArray;
                    res.send(details);
                })
        })
        .catch(error => {
            console.log('problem with movies.router get:', error);
        })
})

module.exports = router;