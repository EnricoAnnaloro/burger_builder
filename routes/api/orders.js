/*
API ROUTE: /api/orders
DESC: Orders Routes
ACCESS: Private
*/

const router = require('express').Router();

const Order = require('../../models/order.model.js');
const authMiddleware = require('../../middleware/auth');

router.get('/', authMiddleware, (req, res) => {
    Order
        .find()
        .then(order => res.json(order))
        .catch(error => res.status(400).json({ msg: error }));
});

router.post('/', authMiddleware, (req, res) => {
    const orderData = req.body;

    const newOrderData = {
        ingredients: orderData.ingredients,
        order: orderData.order,
        price: orderData.price
    }
    console.log(newOrderData)
    const newOrder = new Order(newOrderData);
    console.log(newOrder)

    newOrder.save()
        .then(() => res.json({ msg: null }))
        .catch(error => res.status(400).json({ msg: error }));
});

router.delete('/:id', authMiddleware, (req, res) => {
    Order
        .findById(req.params.id)
        .then(orderToDelete => orderToDelete.remove().then(() => res.json({ msg: null })))
        .catch(error => res.status(404).json({ msg: error }));
});

module.exports = router;