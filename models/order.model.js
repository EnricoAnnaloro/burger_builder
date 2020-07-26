const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    ingredients: {
        salad: Number,
        bacon: Number,
        cheese: Number,
        meat: Number
    },
    order: {
        country: String,
        deliveryMethod: String,
        email: String,
        name: String,
        street: String,
        zipCode: String,
    },
    price: Number
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;