// core modules
path = require('path')

// npm packages
require('dotenv').config()
express = require('express')
cors = require('cors')
bodyParser = require('body-parser')


// routes
const catRoutes = require('./routes/cat-routes');

const publicDirectory = path.join(__dirname, '../public')

const app = express();

// Allow Clients to access api
app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json());

// set static assets for use
app.use(express.static(publicDirectory))

app.use('/', catRoutes);


app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT} !`),
);
