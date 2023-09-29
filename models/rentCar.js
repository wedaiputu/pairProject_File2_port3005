'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentCar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RentCar.hasMany(models.Unit)
    }
  }
  RentCar.init({
    name: DataTypes.STRING,
    branchId: DataTypes.STRING,
    office: DataTypes.STRING,
    enterprise: DataTypes.STRING
  },
  {hooks: {
    beforeCreate: (store,options) => {
      if(store.category === "ELSE"){
        store.code =`001-${new Date().getTime()}`
      }else if(store.category === "CV"){
        store.code =`002-${new Date().getTime()}`
      }else if(store.category === "PT"){
        store.code =`003-${new Date().getTime()}`
      }
    }
  },
    sequelize,
    modelName: 'RentCar',
  });
  return RentCar;
};