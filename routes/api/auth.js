const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');
const authMiddleware = require('../../middleware/auth');
const { route } = require("./users");

/*
API ROUTE: /api/auth
DESC: Authentication Route
ACCESS: Public
*/
router.post('/', (req, res) => {
    const userData = req.body;
    console.log(userData);

    if (!userData.username || !userData.password ) {
        return res.status(400).json({ msg: "Please fill in all fileds" });
    }

    User.findOne({ username: userData.username }).then(userFound => {
        if (!userFound) return res.status(400).json({ msg: "User does not exist" });

        // Validate Password
        bcrypt.compare(userData.password, userFound.password).then(isMatch=> {
            if (!isMatch) return res.status(400).json({ msg: "Password does not match" });

            jwt.sign(
                { id: userFound.id },
                process.env.JWT_PASS,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;

                    res.json({
                        token: token,
                        user: {
                            id: userFound.id,
                            username: userFound.username,
                            name: userFound.name,
                            last_name: userFound.last_name,
                            phone_number: userFound.phone_number,
                            email: userFound.email
                        }
                    })
                }
            )            
        })
    
    })
})

/*
API ROUTE: /api/auth/user
DESC: Get user data
ACCESS: Private
*/
router.get('/users', authMiddleware, (req, res) => {
    User.findById(req.user.id)
        .select('-password')    // Get everything except password
        .then( user => res.json({user: user}))
})

module.exports = router;