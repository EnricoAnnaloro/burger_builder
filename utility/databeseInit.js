const mongoose = require('mongoose');

const Order = require('../models/order.model');

const databaseInit = async () => {
    await Order.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Orders removed...");
        }
    });
};

module.exports = databaseInit;