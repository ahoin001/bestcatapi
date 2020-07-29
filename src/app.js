// built i node moudules
const path = require('path')

// npm modules
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

import models, { sequelize } from './models';

// routes
const catRoutes = require('../routes/cat-routes');

const app = express();

console.log(path.join(__dirname, '../public/'))
const publicDirectory = path.join(__dirname,'../public')

// Allow Clients to access api
app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json());

// set static assets for use
app.use(express.static(publicDirectory))

// ? Create sever listening for requests on PORT
app.listen(process.env.PORT || 2000, () => {
    if (process.env.PORT) {
        console.log(`App listening on port ${process.env.PORT}!`);
    } else {
        console.log(`App listening on port! 2000`);
    }
});

app.use('/', catRoutes);
