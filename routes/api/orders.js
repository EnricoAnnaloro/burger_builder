/*
API ROUTE: /api/orders
DESC: Orders Routes
ACCESS: Private
*/

const router = require('express').Router();
const nodemailer = require('nodemailer');

const Order = require('../../models/order.model.js');
const User = require('../../models/user.model.js');
const authMiddleware = require('../../middleware/auth');

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
            // Sending Confirmation Email
            let transporter = nodemailer.createTransport({
                host: "smtp.aol.com",
                port: "587",
                secure: false,
                auth: {
                    service: "aol",
                    user: "build_a_burger",
                    pass: "fhtudxmzcqkjcbvw"
                }
            })

            // Set up ingredients
            let ingredients = [];
            for (let ingredient in newOrderData.ingredients) {
                ingredients.push(`<span style="margin-right: 5px;">${ingredient} (${newOrder.ingredients[ingredient]})</span>`)
            }

            let ingredientsBody = "";
            ingredients.forEach(ingredient => {
                ingredientsBody = ingredientsBody.concat(ingredient);
            });

            const mailBody = (`
                <div style="text-align: center;">
                    <h1>Your Order</h1>
                    <hr style="border: 1px solid lightgrey; height: 1px; width: 80%;"></hr>
                    <p>Recipient: <strong>${newOrder.order.name}</strong></p>
                    <p>Address: <strong>${newOrder.order.street}, ${newOrder.order.zipCode}, ${newOrder.order.country}</strong></p>
                    <p>Ingredients</p>
                    ${ingredientsBody}
                    <p>Price: <strong>${newOrder.price.toFixed(2)} $</strong></p>
                    <p>Delivery: <strong>${newOrder.order.deliveryMethod}</strong></p>
                    <p>Ordered on <strong>${newOrder.createdAt.toUTCString()}</strong></p>
                    <hr style="border: 1px solid lightgrey; height: 1px; width: 80%;"></hr>
                    <p>Thank you for choosing us!</p>
                    <p>Your Build-a-Burger Staff</p>
                    <div style="text-align: end; margin-top: 20px">
                        <p>Contacts</p>
                        <p>+34 55748393847</p>
                        <p>http://burger-builder-mern-app.herokuapp.com/</p>
                    </div>
                </div>`
            )

            let mailOptions = {
                from: "build_a_burger@aol.com",
                to: newOrderData.order.email,
                subject: "Build-a-Burger - Your Order Confirmation",
                html: mailBody
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.log("error sendMail", error);
                else console.log("Email Sent", info);
            })

            // Response to app depending is auth or not
            if (!orderData.username) {
                return res.json({ msg: null });
            }

            console.log("Passed user check")
            User.findOneAndUpdate(
                { username: orderData.username },
                { $push: { orders: newOrder } },
                (error, success) => {
                    if (error) console.log(error);
                    else {
                        console.log("user updated");
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