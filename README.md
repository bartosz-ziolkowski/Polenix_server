# "Polenix" - full-stack single-page web application

This is a concept application designed for a potential Polish restaurant in Copenhagen, developed using React.js and Node.js.

<a href="https://polenix-4ee0a.web.app/" target="_blank">Click here to open live demo</a>

## Table of Contents

- [General Info](/#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Local Setup](#local-setup)
- [Project Status](#project-status)
- [Future Work](#future-work)

## General Information

- As an avid cook and enthusiast of Polish cuisine, I've collected several pictures of dishes, including many traditional Polish recipes, in my photo gallery. Combined with my love for Copenhagen, I decided to turn this into a web application, which resulted in the project you see here.

- The Polish community is the second-largest national minority in Denmark, and while there is a shop in Copenhagen selling Polish products that is doing very well, **there is no restaurant serving Polish food**. Given the potential target audience, opening and running such a restaurant sounds like a sensible business idea.

- The aim of the project is to provide a web application concept for a restaurant serving Polish cuisine in Copenhagen.

- The web application would be presented to anyone interested in opening such a restaurant and can serve as a real, ready-made product or as an inspiration for an actual one.

## Technologies Used

- Frontend (go to the [frontend repository](https://github.com/bart-ziolkowski/Polenix_client))
  - Languages and Frameworks
    - ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
    - ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
    - ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  - Forms
    - ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
    - Formik 
  - API Calls
    - ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
  - Styling
    - ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
    - ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
    - ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
    - ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
    - Styled JSX
  - Authentication Strategy
    - ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
  - Deployment (see more on *firebase-deploy* branch)
    - ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

- Backend
  - Languages and Frameworks
    - ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
    - ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
    - ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  - API Client
    - ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
  - Authentication
    - ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
  - Database and ORM
    - ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
    - ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
  - Deployment
    - ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Features

- own design of application subpages
- weather widget
- contact form
- photo galleries in the form of a slideshow
- browsing the list of today's dishes
- ordering meals
- access to order history
- account creation
- login and logout
- validation of forms
- responsiveness

## Screenshots

|      ![Top of Home Page](https://i.ibb.co/LZ8sQTR/home-Page-Top.png)               |
| :------------------------------------------------------------: |
|                       _Top of Home Page_                       |
|      ![Middle of Home Page](https://i.ibb.co/82PbDKs/home-Page-Middle.png)            |
|                     _Middle of Home Page_                      |
|      ![Bottom of Home Page](https://i.ibb.co/XFFXjdS/home-Page-Bottom.png)       |
|                     _Bottom of Home Page_                      |
|         ![Top of 'About us' Page](https://i.ibb.co/x7N8ZyJ/about-Page-Top.png)         |
|                        _Top of 'About us' Page_                         |
| ![Bottom of 'About us' Page](https://i.ibb.co/kBxGm7k/about-Page-Bottom.png) |
|                     _Bottom of 'About us' Page_                   |
| ![Top of Menu Page](https://i.ibb.co/xY9j2kL/menu-Page-Top.png) |
|                     _Top of Menu Page_                     |
| ![Top of Cart Page](https://i.ibb.co/VjM35pD/cart-Page-Top.png) |
|                     _Top of Cart Page_                     |
| ![Middle of Cart Page](https://i.ibb.co/jTMbkFZ/cart-Page-Middle.png) |
|                     _Middle of Cart Page_                     |
| ![Top of User Account Page](https://i.ibb.co/Qb3sbQb/account-Page-Top.png) |
|                     _Top of User Account Page_                     |

## Local Setup

- You must have a MySQL database and Node.js installed on the device.
- You will find the dependencies for the backend in this repository in the package.json file.
- In turn, you will find the dependencies for the frontend in its repository respectively.

### How to run the project

1. Create a database in MySQL.
2. Create a folder called e.g. "Polenix" and navigate to it in the terminal.
3. Clone the frontend repository:

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
   - REACT_APP_APOLLO_URL

7. Navigate to "Polenix" folder and clone the backend repository:

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

In this moment, the project is in a finished phase, but there is still room for improvement.

## Future Work

- allow users with the role of "EMPLOYEE" to manage dishes and orders
- integrate app with CMS
- allow users with the role of "ADMIN" to manage users
