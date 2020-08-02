if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize')
        , sequelize = null

    if (process.env.DB_DATABASE_URL) {
        // the application is executed on Heroku ... use the postgres database
        sequelize = new Sequelize(process.env.DB_DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            port: match[4],
            host: match[3],
            logging: true //false
        })
    } else {
        // the application is executed on the local machine ... use mysql
        console.log('CONNECTING IN DEVELOPMENT USING: ', config)
        sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    // global.db = {
    //     Sequelize: Sequelize,
    //     sequelize: sequelize,
    //     User: sequelize.import(__dirname + '/user')
        // add your other models here
    // }

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

    /*
      Associations can be defined here. E.g. like this:
      global.db.User.hasMany(global.db.SomethingElse)
    */
}

module.exports = global.db