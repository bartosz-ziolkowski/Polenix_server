const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const db = require("./models");

const mealRouter = require('./routes/Meal');
app.use("/meals", mealRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    });
});

