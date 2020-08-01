'use strict';

module.exports = (sequelize, DataTypes) => {

  const Cat = sequelize.define('Cat', {
    catId: {
      type: DataTypes.STRING,
      alowNull: false,
      // get: function () {
      //   return JSON.parse(this.getDataValue('catId'));
      // },
    },
    catImageUrl: {
      type: DataTypes.STRING,
      alowNull: false,
      // get: function () {
      //   return JSON.parse(this.getDataValue('catImageUrl'));
      // },
    },
    loved: {
      type: DataTypes.BOOLEAN,
      // get: function () {
      //   return JSON.parse(this.getDataValue('loved'));
      // },
      // alowNull: false
    }
  }, {})

  return Cat

};
