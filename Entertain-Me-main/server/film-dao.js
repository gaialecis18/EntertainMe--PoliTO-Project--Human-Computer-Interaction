'use strict';

const db = require('./db');

// get films genres
exports.getFilmGenres = (filmId) => {
  return new Promise((resolve,reject) => {
    const sql = 'SELECT genre FROM film_has_genre WHERE film_id = ? ';
    db.all(sql,[filmId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  })
}

// get films actors
exports.getFilmActors = (filmId) => {
  return new Promise((resolve,reject) => {
    const sql = 'SELECT actor_id,name,surname FROM actor_plays_film WHERE film_id = ? ';
    db.all(sql,[filmId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  })
}

// get all films
exports.getFilms = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM film';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

// add a new advice
// the advice id is added automatically by the DB
exports.addAdvice = (advice) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO advice (description, user_id) VALUES(?, ?)';
    db.run(sql, [advice.description, advice.user_id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

// add film liked by user
exports.addFilmLiked = (fimlLiked) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO user_likes_film (film_id, user_id,date) VALUES(?, ?,?)';
    db.run(sql, [fimlLiked.film_id, fimlLiked.user_id,fimlLiked.date], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

// add film watched by user
exports.addFilmWatched = (fimlWatched) => {
  return new Promise((resolve, reject) => {

    const sql = 'INSERT INTO film_watched (film_id, user_id,date,rate) VALUES(?, ?,?,?)';
    db.run(sql, [fimlWatched.film_id, fimlWatched.user_id,fimlWatched.date,fimlWatched.rate], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

// get films liked by user 
exports.getFilmLikedByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user_likes_film WHERE user_id = ?';
    db.all(sql,[userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

// get films watched by user 
exports.getFilmWatchedByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM film_watched WHERE user_id = ?';
    db.all(sql,[userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

// get films watched by user 
exports.hasUserWatchedAFilm = (userId,filmId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM film_watched WHERE user_id = ? AND film_id = ?';
    db.all(sql,[userId,filmId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};


// update rate and date of a film 
exports.updateFilmWatched = (filmWatched) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE film_watched SET rate = ?, date = ? WHERE film_id = ? and user_id = ?';
    db.run(sql, [filmWatched.rate,filmWatched.date,filmWatched.film_id,filmWatched.user_id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null); 
    });
  });
};


exports.unlikeFilm = (user_id, film_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM user_likes_film WHERE user_id = ? AND film_id = ?';
    db.run(sql, [user_id, film_id], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}


