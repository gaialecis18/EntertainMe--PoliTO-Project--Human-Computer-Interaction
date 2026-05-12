/**
 * All the API calls
 */
const BASEURL = '/api';

const getFilmLiked = async (userId) => {
  const response = await fetch(BASEURL + "/film-liked/1")
  if (!response.ok) {
    throw Error(response.status + response.statusText)
  }
  return response.json()
}

const getFilmWatched = async (userId) => {
  const response = await fetch(BASEURL + "/film-watched/1")
  if (!response.ok) {
    throw Error(response.status + response.statusText)
  }
  return response.json()
}

async function addFilmLiked(filmLiked) {
  const response = await fetch(BASEURL + "/add-film-liked", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filmLiked)
  })
  if (!response.ok) {
    throw Error(response.status + response.statusText)
  }
}


async function unlikeFilm(user_id, film_id) {
  const response = await fetch(BASEURL + "/unlike-film", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      film_id: film_id,
      user_id: 1
    })
  })
  if (!response.ok) {
    throw Error(response.status + response.statusText)
  }
}

async function addFilmWatched(filmWatched) {

  const response = await fetch(BASEURL + "/add-film-watched", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filmWatched)
  })
  if (!response.ok) {
    throw Error(response.status + response.statusText)
  }
}

async function getFilmList() {
  const response = await fetch(BASEURL + "/film-list")
  if (!response.ok) {
    throw Error(response.status + response.statusText)
  }
  return response.json()
}

const API = { unlikeFilm, getFilmWatched, addFilmLiked, addFilmWatched, getFilmLiked, getFilmList }
export default API;

