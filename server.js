const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const databaseInit = require('./utility/databeseInit');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => { console.log("MongoDB connection succesful") });

// Database Init
// databaseInit();

app.use('/api/startingIngredients', require('./routes/api/startingIngredients'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/user', require('./routes/api/user'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Starting on port: ${port}`);
});

