const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userIngredientsSchema = new Schema({
    salad: {
        type: Number,
        required: true,
    },
    bacon: {
        type: Number,
        required: true,
    },
    cheese: {
        type: Number,
        required: true,
    },
    meat: {
        type: Number,
        required: true,
    },
})