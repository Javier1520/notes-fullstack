
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
  ```json
  {
    "refresh": "refreshtoken",
    "access": "accesstoken"
  }
  ```
  
  - `200 OK` with access and refresh tokens on success
  - `400 Bad Request` if request data is invalid

### Refresh Token

- **URL:** `/api/token/refresh/`
- **Method:** `POST`
- **Request Body:**
  - `refresh` (string, required)
- **Response:**
  ```json
  {
    "access": "newaccesstoken"
  }
  ```
  - `200 OK` with new access token on success
  - `400 Bad Request` if request data is invalid

### Logout

- **URL:** `/api/logout/`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <access_token>` (required)
- **Response:**
  - `200 OK` on successful logout
  - `401 Unauthorized` if access token is missing or invalid

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
    ```json
    [
      {
        "id": 1,
        "title": "Note 1",
        "content": "Content of Note 1",
        "user": 1,
        "is_archived": false,
        "category": {
          "id": 1,
          "name": "Category 1"
        },
        "created_at": "2023-06-13T12:00:00Z",
        "updated_at": "2023-06-13T12:00:00Z"
      },
      ...
    ]
    ```
  - `201 Created` with new note data on successful `POST`
    ```json
    {
      "id": 1,
      "title": "New Note",
      "content": "Content of New Note",
      "user": 1,
      "is_archived": false,
      "category": null,
      "created_at": "2023-06-13T14:30:00Z",
      "updated_at": "2023-06-13T14:30:00Z"
    }
    ```
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
    ```json
    {
      "id": 1,
      "title": "Updated Note",
      "content": "Updated content",
      "user": 1,
      "is_archived": true,
      "category": {
        "id": 2,
        "name": "Category 2"
      },
      "created_at": "2023-06-13T12:00:00Z",
      "updated_at": "2023-06-13T15:00:00Z"
    }
    ```
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
    ```json
    [
      {
        "id": 2,
        "title": "Archived Note",
        "content": "Content of Archived Note",
        "user": 1,
        "is_archived": true,
        "category": null,
        "created_at": "2023-06-12T10:00:00Z",
        "updated_at": "2023-06-13T08:00:00Z"
      },
      ...
    ]
    ```
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
    ```json
    [
      {
        "id": 1,
        "name": "Category 1"
      },
      {
        "id": 2,
        "name": "Category 2"
      },
      ...
    ]
    ```
  - `201 Created` with new category data on successful `POST`
    ```json
    {
      "id": 3,
      "name": "New Category"
    }
    ```
  - `400 Bad Request` if request data is invalid
  - `401 Unauthorized` if access token is missing or invalid

### Retrieve/Delete Category

- **URL:** `/api/categories/<id>`
- **Method:** `GET` / `DELETE`
- **Headers:**
  - `Authorization: Bearer <access_token>` (required)
- **Responses:**
  - `200 OK` with category data on successful `GET`
    ```json
    {
      "id": 1,
      "name": "Category 1"
    }
    ```
  - `204 No Content` on successful `DELETE`
  - `401 Unauthorized` if access token is missing or invalid
  - `404 Not Found` if category doesn't exist
```
