'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Cat extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Cat.init({
//     catId: DataTypes.STRING,
//     catImageUrl: DataTypes.STRING,
//     loved: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Cat',
//   });
//   return Cat;
// };

module.exports = (sequelize, DataTypes) => {

  const Cat = sequelize.define('Cat', {
    catId: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    catImageUrl: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    loved: {
      type: DataTypes.BOOLEAN,
    }
  }, {})

  return Cat

};