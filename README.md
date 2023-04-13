# "Polenix" - web application

This is a concept for a web application designed for a potential Polish restaurant in Copenhagen, developed using React.js and Node.js.

To see how the app works, please watch the video available [_here_](https://www.example.com).

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)

## General Information

- As an avid cook and enthusiast of Polish cuisine, I've collected several pictures of dishes, including many traditional Polish recipes, in my photo gallery. Combined with my love for Copenhagen, I decided to turn this into a web application, which resulted in the project you see here.

- The Polish community is the second-largest national minority in Denmark, and while there is a shop in Copenhagen selling Polish products that is doing very well, **there is no restaurant serving Polish food**. Given the potential target audience, opening and running such a restaurant sounds like a sensible business idea.

- The aim of the project is to provide a web application concept for a restaurant serving Polish cuisine in Copenhagen.

- The web application would be presented to anyone interested in opening such a restaurant and can serve as a real, ready-made product or as an inspiration for an actual one.

## Technologies Used

- Frontend (go to the [frontend repository](https://github.com/bart-ziolkowski/Polenix_client))
  - JavaScript
  - HTML
  - CSS
  - Bootstrap
  - Styled Components
  - Font Awesome
  - Typewriter.js
  - React.js
  - Apollo Client
  - GraphQL
  - JWT Decode
  - Email.js
- Backend
  - JavaScript
  - Node.js
  - Express.js
  - Apollo Server
  - GraphQL
  - Bcrypt.js
  - Jsonwebtoken
  - Sequelize
  - MySQL

## Features

- own design of application subpages
- weather widget
- contact form
- photo galleries in the form of a slideshow
- browsing the list of today's dishes
- account creation
- login and logout
- validation of forms

## Screenshots

|      ![Top of Home Page](./README_img/homeTopScreen.png)       |
| :------------------------------------------------------------: |
|                       _Top of Home Page_                       |
|      ![Bottom of Home Page](./README_img/homeBottom.png)       |
|                     _Bottom of Home Page_                      |
|         ![About us Page](./README_img/aboutScreen.png)         |
|                        _About us Page_                         |
| ![Restaurant Menu Page](./README_img/restaurantMenuScreen.png) |
|                     _Restaurant Menu Page_                     |

## Setup

- You must have a MySQL database and Node.js installed on the device.
- You will find the dependencies for the backend in this repository in the package.json file.
- In turn, you will find the dependencies for the frontend in its repository respectively.

### How to run the project

1. Create a database in MySQL.
2. Create a folder called e.g. "Polenix" and navigate to it in the terminal.
3. Create two subfolders: "Polenix_client" and "Polenix_server".
4. Navigate to "Polenix_client" folder and clone the frontend repository to the "Polenix_client" folder:

```
git clone https://github.com/bart-ziolkowski/Polenix_client.git
```

5. Install the frontend dependencies:

```
npm install
```

6. Create a .env file for frontend and add the following variables:

   - REACT_APP_SERVICE_ID
   - REACT_APP_TEMPLATE_ID
   - REACT_APP_USER_ID

7. Navigate to "Polenix_server" folder and clone the backend repository to the "Polenix_server" folder:

```
git clone https://github.com/bart-ziolkowski/Polenix_server.git
```

8. Install the backend dependencies:

```
npm install
```

9. Create a .env file for backend and add the following variables:

- DATABASE_URL
- PORT
- NODE_ENV
- REACT_APP_WEATHER_API_KEY
- JWT_SECRET

10. Navigate to the "Polenix_client" folder and run the frontend:

```
npm start
```

11. Navigate to the "Polenix_server" folder and run the backend:

```
npm start
```

## Project Status

Project is in progress.

## Room for Improvement

To improve:

- the database is already adapted for user management, it only remains to implement access to the appropriate functions depending on the role "CUSTOMER", "ADMIN" and "EMPLOYEE"
- allow users with the role of "EMPLOYEE" to add dishes and browse orders
- allow users with the role of "ADMIN" to manage users
- expand food with a description and a photo
- improve information about the dishes
- replace CSS with SCSS for better readability, among other things
- design improvement and correction of the user's cart and profile

To do:

- add responsiveness
- add dishes to the cart to purchase orders
- app deployment
