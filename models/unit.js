'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Unit.belongsTo(models.RentCar)
    }

    static getUnitsByrentDuration(option,rentDuration){
      if(rentDuration !== "All"){
        option.where = { rentDuration: rentDuration }
      }
      return Employee.findAll(option)
    }


    get Age() {
      const birthDate = new Date(this.dateOfBirth)
      const currentDate = new Date()
      const ageInMilliSeconds = currentDate - birthDate
      return Math.floor(ageInMilliSeconds / (365.25 * 24 * 60 * 60 * 1000));
    }
    

  }
  Unit.init({
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // notEmpty: {
        //   args: true,
        //   msg: "Name tidak boleh kosong"
        // },
        // notNull : {
        //   args: true,
        //   msg: "Name tidak boleh kosong"
        // }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // notEmpty: {
        //   args: true,
        //   msg: "Type tidak boleh kosong"
        // },
        // notNull : {
        //   args: true,
        //   msg: "Type tidak boleh kosong"
        // }
      }
    },
    releaseDate:{
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
      //   notEmpty: {
      //     args: true,
      //     msg: "Release Date tidak boleh kosong"
      //   },
      //   notNull : {
      //     args: true,
      //     msg: "Release Date tidak boleh kosong"
      //   },
      //   isAgeOldEnough(){
      //     const unitAge = new Date(this.releaseDate)
      //     const currentDate = new Date()
      //     const ageInMilliSeconds = currentDate - unitAge
      //     const unitAgeResult = Math.floor(ageInMilliSeconds / (365.25 * 24 * 60 * 60 * 1000));
      //     if(unitAgeResult <= 10 ){
      //       throw new Error('The Cars Is Way to OLD');
      //     }
      // }
      }
    },
    durability: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // notEmpty: {
        //   args: true,
        //   msg: "Duration tidak boleh kosong"
        // },
        // notNull : {
        //   args: true,
        //   msg: "Duration tidak boleh kosong"
        // },
        // checkEducationAndrentDuration(){
        //   if((this.durability === "B" || this.durability === "A") && (this.rentDuration !== "Monthly" && this.rentDuration !== "Weakly")){
        //     throw new Error('Bisa di sewa dengan durasi kurang dari seminggu');
        //   } else if((this.durability === "C" || this.durability === "D") && (this.rentDuration !== "Daily")) {
        //     throw new Error('Its SERVICE TIME!!, cant be rented fo to long');
        //   }
        // }
      }
    },
    rentDuration: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // notEmpty: {
        //   args: true,
        //   msg: "rentDuration tidak boleh kosong"
        // },
        // notNull : {
        //   args: true,
        //   msg: "rentDuration tidak boleh kosong"
        // },
      }
    },
    RentCarId: DataTypes.INTEGER,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // notEmpty: {
        //   args: true,
        //   msg: "Price tidak boleh kosong"
        // },
        // notNull : {
        //   args: true,
        //   msg: "Price tidak boleh kosong"
        // },
        // min: {
        //   args: 1,
        //   msg: "Price tidak boleh nol"
        // }
      }
    }
  }, {
    sequelize,
    modelName: 'Unit',
  });
  return Unit;
};