'use strict';

const express = require('express');
const morgan = require('morgan');
const { check, validationResult } = require('express-validator'); // validation middleware
const filmDao = require('./film-dao'); // module for accessing the DB


const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Format express-validate errors as strings
  return `${location}[${param}]: ${msg}`;
};

const app = new express();
const PORT = 3001;

app.use(morgan('dev'));
app.use(express.json());


/*** APIs ***/

// GET /api/film-list 
app.get('/api/film-list',
  [],
  async (req, res) => {

    try {
      const filmList = await filmDao.getFilms();

      let results = []
      let genres = []
      let actors = []
      for (let film of filmList) {
        genres = await filmDao.getFilmGenres(film.id)
        if (genres.errors) {
          genres = []
        }
        actors = await filmDao.getFilmActors(film.id)
        if (actors.errors) {
          actors = []
        }
        results = results.concat({ ...film, genres: genres, actors: actors })
      }
      res.json(results);
      res.status(200)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: `Database error while reading films` }).end();
    }
  });

// POST /api/add-advice
app.post('/api/add-advice',
  [
    check(['user_id']).isInt(),
    check('description').isLength({ min: 1, max: 160 }),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }).end(); // error message is a single string with all error joined together
    }

    const advice = {
      description: req.body.description,
      user_id: req.body.user_id
    };

    try {
      await filmDao.addAdvice(advice);
      res.json()
      res.status(201)
    } catch (err) {
      res.status(500).json({ error: `Database error while adding a new advice: ${err}.` }).end();
    }
  });

// DELETE  unlike film /api/<id>

app.delete('/api/unlike-film',
  [check('user_id').isInt(),
  check('film_id').isInt()],
  async (req, res) => {
    try {
      const errors = validationResult(req).formatWith(errorFormatter); // format error message
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array().join(", ") }).end(); // error message is a single string with all error joined together
      }
      await filmDao.unlikeFilm(req.body.user_id, req.body.film_id);
      res.status(200).json();
    } catch (err) {
      res.status(500).json({ error: `Database error during unlike the film  ${req.body.film_id}` }).end();
    }
  });


// POST /api/add-film-liked
app.post('/api/add-film-liked',
  [
    check('user_id').isInt(),
    check('film_id').isInt(),
    check('date').isString(),

  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }).end(); // error message is a single string with all error joined together
    }

    const filmLiked = {
      film_id: req.body.film_id,
      user_id: req.body.user_id,
      date: req.body.date
    };

    try {
      await filmDao.addFilmLiked(filmLiked);
      res.json()
      res.status(201)
    } catch (err) {
      res.status(500).json({ error: `Database error while liking the film: ${err}.` }).end();
    }
  });

// GET /api/film-liked/<user_id>
app.get('/api/film-liked/:user_id',
  [check('user_id').isInt()],
  async (req, res) => {
    try {
      const errors = validationResult(req).formatWith(errorFormatter); // format error message
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array().join(", ") }).end(); // error message is a single string with all error joined together
      }
      const result = await filmDao.getFilmLikedByUser(req.params.user_id);
      if (result.error)
        res.status(422).json(result);
      else {
        res.json(result);
        res.status(200)
      }
    } catch (err) {
      res.status(500).json({ error: `Database error while getting film liked: ${err}.` }).end();
    }
  });

// GET /api/film-watched/<user_id>
app.get('/api/film-watched/:user_id',
  [check('user_id').isInt()],
  async (req, res) => {
    try {
      const errors = validationResult(req).formatWith(errorFormatter); // format error message
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array().join(", ") }).end(); // error message is a single string with all error joined together
      }
      const result = await filmDao.getFilmWatchedByUser(req.params.user_id);
      if (result.error)
        res.status(422).json(result);
      else {
        res.json(result);
        res.status(200)
      }
    } catch (err) {
      res.status(500).json({ error: `Database error while getting film watched: ${err}.` }).end();
    }
  });

// PUT /api/add-film-watched
app.put('/api/add-film-watched',
  [
    check(['film_id', 'user_id']).isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }).end(); // error message is a single string with all error joined together
    }

    const filmWatched = {
      user_id: req.body.user_id,
      rate: req.body.rate,
      date: req.body.date,
      film_id: req.body.film_id
    };

    try {
      const result = await filmDao.hasUserWatchedAFilm(filmWatched.user_id, filmWatched.film_id)
      if (result.length == 0) {
        await filmDao.addFilmWatched(filmWatched)
      }
      else {
        await filmDao.updateFilmWatched(filmWatched)
      }
      res.json();
      res.status(201);
    } catch (err) {
      res.status(500).json({ error: `Database error during the update of film ${req.body.film_id}` }).end();
    }

  });

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));

