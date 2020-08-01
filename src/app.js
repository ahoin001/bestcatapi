// core modules
path = require('path')

// npm packages
require('dotenv').config()
express = require('express')
cors = require('cors')

// routes
const catRoutes = require('./routes/cat-routes');

const app = express();


const port = process.env.PORT || 2000;

// Allow Clients to access api
app.use(cors())

// support parsing of application/json type post data
app.use(express.json());

// set static assets for use
app.use(express.static( path.join(__dirname, '../public')))
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.use('/', catRoutes);

app.listen(port, () =>
    console.log(`Example app listening on port ${port} !`),
);
