const { Unit, RentCar, sequelize } = require("../models")
const { Op } = require("sequelize")
const  formatPrice  = require("../helpers/formatPrice")
const { options } = require("../routes")

class Controller {
    static showRentcars(req,res){
        RentCar.findAll()
        .then((result) => {
            res.render("rentCarsTablePage", {result})
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    }

    static showUnits(req,res){
        const { position } = req.query
        let option = {
            include: [{ model : RentCar }]
        }
        // option.order = [["name","ASC"]]
        let unit;
        if (position){
            unit = Unit.getUnitByDuration(option,durability)
        }else{
            unit = Unit.findAll(option)
        }
        unit
        .then((result) => {
            console.log(result);
            result.forEach(el =>{
                el.dataValues.formatPrice = formatPrice(el.dataValues.price)
            })
            res.render("unitList", {result})
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    }

    static addRentCar(req,res){
        res.render("addRentCar")
    }

    static createRentCar(req,res){
        const { name, office, enterprise } = req.body
        RentCar.create({ name, office, enterprise })
        .then((result) =>{
            res.redirect("/")
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    }


    static addUnitForm(req,res){
        const { errors } = req.query;
        const { rentCarId } = req.params; 
        let option = {
            where: {id: +rentCarId}
        }
        RentCar.findOne(option)
        .then((result) => {
            res.render("addUnit",{result,errors})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    }

    static createEmployee(req,res){
        const { rentCarId } = req.params; 
        const { firstName,lastName,dateOfBirth,education,position,salary } = req.body
        Unit.create({ firstName,lastName,dateOfBirth,education,position,StoreId : storeId,salary } )
        .then((result) => {
            res.redirect(`/stores/${rentCarId}`)
        })
        .catch((err) => {
            if (err.name === "SequelizeValidationError") {
                err = err.errors.map((el) => {
                    return el.message
                })
                res.redirect(`/rentCars/${rentCarId}/units/add?errors=${err.join(';')}`)
            }else{
                //console.log(err);
                res.send(err)
            }
        })
    }

    static editUnitForm(req,res){
        const { errors } = req.query;
        const { rentCarId, unitId } = req.params;
        let option = {
            include: {
              model: RentCar,
              where: {id: +rentCarId}
            }
        }
        option.where = {id: +unitId}
        Unit.findOne(option)
            .then((result) => {
                const date = new Date(result.releaseDate); 
                const year = date.getFullYear();
                const month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
                const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                const formattedDate = `${year}-${month}-${day}`
                res.render("editUnit",{result, formattedDate, errors})
                //res.send(result)
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            })
    }

    static updateUnit(req,res){
        const { name,type,releaseDate,durability,rentDuration,price } = req.body
        const { rentCarId,unitId } = req.params;
        Unit.update(
            { name,type,releaseDate,durability,rentDuration,price },
            { where: {id: +unitId}}
        )
            .then((result) => {
                res.redirect(`/rentCars/${rentCarId}`);
            })
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    err = err.errors.map((el) => {
                        return el.message
                    })

                    res.redirect(`/rentCars/${rentCarId}/units/${unitId}/edit?errors=${err.join(';')}`)
                }else{
                    //console.log(err);
                    res.send(err)
                }
            })
    }

    //router.get('/stores/:storeId/employees/:employeeId/delete', Controller.deleteEmployee)
    static deleteForm(req,res){
        const { rentCarId,unitId } = req.params;
        let deletedUnitFullName;
        Unit.findByPk(+employeeId)
          .then((result) => {
            deletedUnitFullName = `${result.name}` 
            return Unit.destroy({ where: { id: +unitId } });
          })
          .then((del) => {
            //res.send(del)
            res.redirect(`/rentCars/${rentCarId}?alert=${deletedUnitFullName}`);
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          });
    }

    static homepage(req, res){
        RentCar.findAll()
        .then((result) => {
            res.render("homepage")
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    }
}

module.exports = Controller

