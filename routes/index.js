const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/',(req, res) => {
      res.redirect('/rentCars')
    })

router.get('/homepage', Controller.homepage)

router.get('/rentCars', Controller.showRentcars)

router.get('/units', Controller.showUnits)
router.get('/units/add', Controller.addRentCar)
router.post('/units/add', Controller.createRentCar)

router.get('/rentCars/:rentCarId/units/:unitId/edit', Controller.editUnitForm)
router.post('/rentCars/:rentCarId/units/:unitId/edit', Controller.updateUnit)


router.get('/stores/:storeId/employees/add', Controller.addUnitForm)
router.post('/stores/:storeId/employees/add', Controller.createEmployee)
router.get('/stores/:storeId/employees/:employeeId/delete', Controller.deleteForm)


module.exports = router