// core modules
path = require('path')

// npm packages
require('dotenv').config()
express = require('express')
cors = require('cors')

// routes
const catRoutes = require('./routes/cat-routes');

const app = express();


const port = 2000 || process.env.PORT;

// Allow Clients to access api
app.use(cors())

// support parsing of application/json type post data
app.use(express.json());

// set static assets for use
app.use(express.static( path.join(__dirname, '../public')))

app.use('/', catRoutes);

app.listen(port, () =>
    console.log(`Example app listening on port ${port} !`),
);
