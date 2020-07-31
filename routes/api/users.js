/*
API ROUTE: /api/users
DESC: User Related Routes (Registration)
ACCESS: Public
*/

const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');

router.post('/', (req, res) => {
    const newUserData = req.body;

    if (!newUserData.username || !newUserData.password || !newUserData.name || !newUserData.last_name || !newUserData.phone_number || !newUserData.email) {
        return res.status(400).json({ msg: "Please fill in all fileds" });
    }

    User.findOne({ email: newUserData.email }).then(firstCheckUser => {
        if (firstCheckUser) return res.status(400).json({ msg: "User with same email registered" });

        User.findOne({ username: newUserData.username }).then(secondCheckUser => {
            if (secondCheckUser) return res.status(400).json({ msg: "User with same username registered" });

            const newUser = new User({
                username: newUserData.username,
                password: newUserData.password,
                name: newUserData.name,
                last_name: newUserData.last_name,
                phone_number: newUserData.phone_number,
                email: newUserData.email
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser.save().then(user => {

                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_PASS,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;

                                res.json({
                                    token: token,
                                    user: {
                                        id: user.id,
                                        username: user.username,
                                        name: user.name,
                                        last_name: user.last_name,
                                        phone_number: user.phone_number,
                                        email: user.email
                                    }
                                })
                            }
                        )
                    })
                })
            })
        })
    })
})

module.exports = router;