# Human Computer Interaction

## Team name: Cinemini

Team members:

* 314876 Arianna Ferraris
* 313983 Gabriele Monteleone
* 317630 Gaia Lecis
* 308312 Pietro Uras

## How to correclty view the prototype

* The prototype MUST be visualized with Google Chrome's Inspector. 
* You have to select as device size: iPhone 12 Pro.

## How to run

* To start the server, after running `npm install` in the server folder, execute the command `nodemon`.
* To start the client, after running `npm install` in the client folder, execute the command `npm run start`. <br>
Note that, this command could fail if you have an old node version. In case it fails and the issue is 
*bad option: --openssl-legacy-provider*, please go to the `package.json` file and remove the `--openssl-legacy-provider` from line 25 and 26, in order to have eventually the following configuaration:
``` JSON
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",  
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

## List of APIs offered by the server

### Get contents list
* HTTP method: `GET`  URL: `/api/film-list`
* Description: get the list of the contents to propose.
* Request param: none
* Request body: none
* Response: `200 OK` (success)
* Response body: array of contents
``` JSON
[{
    "id":1,
    "name": "Content name",
    "picture": "picture.png",
    "year": 2000,
    "kind": "movie",
    "feeling": "happy",
    "platform": "netflix",
    "genres": [{
        "genre": "horror"
    }],
    "actors": [{
        "name": "name",
        "surname": "surname"
    }],
}]
```
* Error responses: `500 Internal Server Error` (database error)

### Add advice
* HTTP method: `POST`  URL: `/api/add-advice`
* Description: Add a new advice added by an user.
* Request param: none
* Request body: id of the user and advice
``` JSON
{
    "description": "description",
    "user_id": 1
}
```
* Response: `201 OK` (success)
* Response body: none
* Error responses:  `422 Unprocessable Entity` (values do not satisfy validators), `500 internal Server Error` (database error)

### Unlike content
* HTTP method: `DELETE`  URL: `/api/unlike-film`
* Description: Remove content liked in the past by an user.
* Request param: none
* Request body: id of the user and id of the content
``` JSON
{
    "film_id": 1,
    "user_id": 1
}
```
* Response: `200 OK` (success)
* Response body: none
* Error responses:  `422 Unprocessable Entity` (values do not satisfy validators), `500 internal Server Error` (database error)

### Like content
* HTTP method: `POST`  URL: `/api/add-film-liked`
* Description: Add content liked by an user.
* Request param: none
* Request body: id of the user and id of the content
``` JSON
{
    "film_id": 1,
    "user_id": 1,
    "date":"Fri, 20 Jan 2023 17:09:29 GMT"
}
```
* Response: `201 OK` (success)
* Response body: none
* Error responses:  `422 Unprocessable Entity` (values do not satisfy validators), `500 internal Server Error` (database error)

### Get contents liked by an user
* HTTP method: `GET`  URL: `/api/film-liked/:user_id`
* Description: Get the contents liked by an user.
* Request param: id of the user
* Request body: none
* Response: `201 OK` (success)
* Response body: array of contents liked by the user which id is received in the req params
``` JSON
[{
    "film_id": 1,
    "user_id": 1,
    "date": "Fri, 20 Jan 2023 17:09:29 GMT"
}]
```
* Error responses:  `422 Unprocessable Entity` (values do not satisfy validators), `500 internal Server Error` (database error)

### Get contents watched by an user
* HTTP method: `GET`  URL: `/api/film-watched/:user_id`
* Description: Get the contents watched by the user.
* Request param: id of the user
* Request body: none
* Response: `201 OK` (success)
* Response body: List of contents watched by the user which id is received in the req params
``` JSON
[{
    "film_id": 1,
    "user_id": 1,
    "date": "Fri, 20 Jan 2023 17:09:29 GMT",
    "rate": 4
}]
```
* Error responses:  `422 Unprocessable Entity` (values do not satisfy validators), `500 internal Server Error` (database error)

### Add content watched by an user
* HTTP method: `PUT`  URL: `/api/add-film-watched`
* Description: Add a content watched by an user or update the rate given by the user or update the date (e.g. content watched a second time).
* Request param: none
* Request body: user_id, film_id of the content watched, user rate (could be null) and date on which the content was watched 
``` JSON
{
    "film_id": 1,
    "user_id": 1,
    "date": "Fri, 20 Jan 2023 17:09:29 GMT",
    "rate": 4
}
```
* Response: `201 OK` (success)
* Response body: none
* Error responses:  `422 Unprocessable Entity` (values do not satisfy validators), `500 internal Server Error` (database error)
