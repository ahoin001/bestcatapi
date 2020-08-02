// core modules
path = require('path')
http = require('http')
db = require("../database/models/index")

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

app.set('port', process.env.PORT || 2000);

// set static assets for use
app.use(express.static(path.join(__dirname, '../public')))


app.use('/', catRoutes);

app.get('/apikeys', (req, res) => {
    res.json({
        status: process.env.NODE_ENV || 'development',
    })
});

// app.listen(port, () =>
//     console.log(`Example app listening on port ${port} !`),
// );

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

db.sequelize.sync().then(function () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});