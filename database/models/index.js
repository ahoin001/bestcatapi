const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};

// const sequelize = new Sequelize(
//     process.env.DB_DATABASE_URL,
//     process.env.DB_USERNAME,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//     },
// );

let sequelize;
if (config.use_env_variable) {
    
    console.log(`@@@@@@@@@@@@ PRODUCTION: `,env)
    console.log(`@@@@@@@@@@@@ CONFIG: `,config)

    sequelize = new Sequelize(config.use_env_variable, config);

} else {

    console.log(`@@@@@@@@@@@@ DEVELOPMENT: `,env)
    console.log(`@@@@@@@@@@@@ CONFIG: `,config)

    sequelize = new Sequelize(config.database, config.username, config.password, config);


}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;