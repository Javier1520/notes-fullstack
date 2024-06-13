# API Documentation

## Authentication

### Register User

- **URL:** `/api/register/`
- **Method:** `POST`
- **Request Body:**
 - `username` (string, required)
 - `email` (string, required)
 - `password` (string, required)
- **Response:**
 - `201 Created` on success
 - `400 Bad Request` if request data is invalid

### Login (JWT)

- **URL:** `/api/login/`
- **Method:** `POST`
- **Request Body:**
 - `username` (string, required)
 - `password` (string, required)
- **Response:**
 - `200 OK` with access and refresh tokens on success
 - `400 Bad Request` if request data is invalid

### Refresh Token

- **URL:** `/api/token/refresh/`
- **Method:** `POST`
- **Request Body:**
 - `refresh` (string, required)
- **Response:**
 - `200 OK` with new access token on success
 - `400 Bad Request` if request data is invalid

## Notes

### List/Create Notes

- **URL:** `/api/notes`
- **Method:** `GET` / `POST`
- **Headers:**
 - `Authorization: Bearer <access_token>` (required)
- **Query Parameters (GET):**
 - `category_id` (optional)
- **Request Body (POST):**
 - `title` (string, required)
 - `content` (string, required)
 - `category_id` (integer, optional)
- **Responses:**
 - `200 OK` with list of notes on successful `GET`
 - `201 Created` with new note data on successful `POST`
 - `400 Bad Request` if request data is invalid
 - `401 Unauthorized` if access token is missing or invalid

### Retrieve/Update/Delete Note

- **URL:** `/api/notes/<id>`
- **Method:** `GET` / `PUT` / `DELETE`
- **Headers:**
 - `Authorization: Bearer <access_token>` (required)
- **Request Body (PUT):**
 - `title` (string, optional)
 - `content` (string, optional)
 - `is_archived` (boolean, optional)
 - `category_id` (integer, optional)
- **Responses:**
 - `200 OK` with note data on successful `GET` or `PUT`
 - `204 No Content` on successful `DELETE`
 - `400 Bad Request` if request data is invalid
 - `401 Unauthorized` if access token is missing or invalid
 - `404 Not Found` if note doesn't exist

### Unset Note Category

- **URL:** `/api/notes/<note_id>/unset-category`
- **Method:** `POST`
- **Headers:**
 - `Authorization: Bearer <access_token>` (required)
- **Response:**
 - `200 OK` on success
 - `401 Unauthorized` if access token is missing or invalid
 - `404 Not Found` if note doesn't exist

### List Archived Notes

- **URL:** `/api/notes/archived`
- **Method:** `GET`
- **Headers:**
 - `Authorization: Bearer <access_token>` (required)
- **Query Parameters:**
 - `category` (optional)
- **Response:**
 - `200 OK` with list of archived notes
 - `401 Unauthorized` if access token is missing or invalid

## Categories

### List/Create Categories

- **URL:** `/api/categories`
- **Method:** `GET` / `POST`
- **Headers:**
 - `Authorization: Bearer <access_token>` (required)
- **Request Body (POST):**
 - `name` (string, required)
- **Responses:**
 - `200 OK` with list of categories on successful `GET`
 - `201 Created` with new category data on successful `POST`
 - `400 Bad Request` if request data is invalid
 - `401 Unauthorized` if access token is missing or invalid

### Retrieve/Delete Category

- **URL:** `/api/categories/<id>`
- **Method:** `GET` / `DELETE`
- **Headers:**
 - `Authorization: Bearer <access_token>` (required)
- **Responses:**
 - `200 OK` with category data on successful `GET`
 - `204 No Content` on successful `DELETE`
 - `401 Unauthorized` if access token is missing or invalid
 - `404 Not Found` if category doesn't exist