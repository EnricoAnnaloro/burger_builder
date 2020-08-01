/*
API ROUTE: /api/users
DESC: User Related Routes (Registration)
ACCESS: Public
*/

const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../../models/user.model');

router.post('/', (req, res) => {
    const newUserData = req.body;

    if (!newUserData.username || !newUserData.password || !newUserData.name || !newUserData.last_name || !newUserData.phone_number || !newUserData.email) {
        return res.status(400).json({ msg: "Please fill in all fileds" });
    }

    const userPassword = newUserData.password;

    User.findOne({ email: newUserData.email }).then(firstCheckUser => {
        if (firstCheckUser) { 
            console.log(firstCheckUser);
            return res.status(400).json({ msg: "User with same email registered" })
        };

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

                                console.log("newUser.name", newUser.name)
                                console.log("newUser.username", newUser.username)
                                console.log("newUser.password", userPassword)
                                
                                const mailBody = (`
                                <div style="text-align: center;">
                                <h1>Registration confirmation</h1>
                                <hr style="border: 1px solid lightgrey; height: 1px; width: 80%;"></hr>
                                <p>Welcome <strong>${newUser.name}</strong>, we are so happy to meet you!</p>
                                <p>Here are your credentials, save them somewhere safe</p>
                                <p>username: <strong>${newUser.username}</strong></p>
                                <p>password: <strong>${userPassword}</strong></p>
                                <hr style="border: 1px solid lightgrey; height: 1px; width: 80%;"></hr>                                        
                                <p>Thank you for choosing us and welcome aboard!</p>
                                <p>Your Build-a-Burger Staff</p>
                                <div style="text-align: end; margin-top: 20px">
                                <p>Contacts</p>
                                <p>+34 55748393847</p>
                                <p>http://burger-builder-mern-app.herokuapp.com/</p>
                                </div>
                                </div>`
                                )
                                console.log("mailBody", mailBody)
                                
                                let mailOptions = {
                                    from: "build_a_burger@aol.com",
                                    to: newUser.email,
                                    subject: "Build-a-Burger - Registration Confirmation",
                                    html: mailBody
                                }
                                
                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) console.log("error sendMail", error);
                                    else console.log("Email Sent", info);
                                })
                                
                                console.log("here?", mailBody)

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