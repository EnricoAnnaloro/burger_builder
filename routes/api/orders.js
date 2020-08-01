/*
API ROUTE: /api/orders
DESC: Orders Routes
ACCESS: Private
*/

const router = require('express').Router();

const Order = require('../../models/order.model.js');
const User = require('../../models/user.model.js');
const authMiddleware = require('../../middleware/auth');
const { findOne, findOneAndUpdate } = require('../../models/order.model.js');
const { response } = require('express');

router.post('/', authMiddleware, (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(400).json({ msg: "Orders not found" });

        res.json({ orders: user.orders });
    })
});

router.post('/new', (req, res) => {
    const orderData = req.body;
    
    const newOrderData = {
        ingredients: orderData.ingredients,
        order: orderData.order,
        price: orderData.price
    }
    const newOrder = new Order(newOrderData);
    
    newOrder.save()
    .then(() => {
        console.log(!orderData.username)
        if (!orderData.username) {
            return res.json({ msg: null });
        }

        User.findOneAndUpdate(
            { username: orderData.username },
            { $push: { orders: newOrder } },
            (error, success) => {
                if (error) console.log(error);
                else {
                    console.log(success)
                    return res.json({ msg: null });
                }
            }
        )

        })
        .catch(error => res.status(400).json({ msg: error }));
});

router.delete('/:id', authMiddleware, (req, res) => {
    Order
        .findById(req.params.id)
        .then(orderToDelete => orderToDelete.remove().then(() => res.json({ msg: null })))
        .catch(error => res.status(404).json({ msg: error }));
});

module.exports = router;