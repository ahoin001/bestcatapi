'use strict';

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