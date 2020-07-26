const express = require("express");
const router = express.Router();

const startingIngredients = {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 1
};

router.get('/', (req, res) => {
    res.json(startingIngredients);
});

module.exports = router;