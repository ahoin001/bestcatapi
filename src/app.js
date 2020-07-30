// core modules
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// npm packages
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from "dotenv";
dotenv.config()

// routes
import { router as catRoutes } from '../routes/cat-routes.js';

// database
import db from './config/database.js'

// ? to define __dirname in node 10+
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.join(__dirname, '../public')

const app = express();

const testdb = async () => {
    try {
        await db.authenticate();
        console.log(`Connection to ${process.env.DATABASE} has been established successfully.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testdb()

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
