const express = require('express');
const router = express.Router();
const { Meal } = require('../models');

router.get("/", async (req, res) => {
    const allMeals = await Meal.findAll();
    res.json(allMeals);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Meal.create(post);
    res.json(post);
});

module.exports = router
