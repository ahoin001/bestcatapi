require('dotenv').config(); 
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        // "use_env_variable": process.env.DB_DATABASE_URL,
        "use_env_variable": "postgres://pxdpjxsxmzbebl:e2bbda48ceaa829326c7fcf23e53c5ece849d10d1794c7e0eb804c67d2ff3be2@ec2-54-91-178-234.compute-1.amazonaws.com:5432/d10ghdm8v5vegb",
        "dialect": "postgres"
    }
};