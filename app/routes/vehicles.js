const Vehicle = require('../models/vehicle')
const express = require('express')
const router = express.Router()

const send = (res, err, data) => {
    if (err) {
        res.send(err)
    }
    res.json(data)
}

router.get('/', (req, res) => {
    res.json({message: 'Welcome to our API'})
})

router.route('/vehicles')
    .post((req, res) =>{
        let vehicle = new Vehicle()
        const {make, model, color} = req.body
        vehicle.make = make
        vehicle.model = model
        vehicle.color = color
        vehicle.save((err)=>{
            if (err) {
                res.send(err);
            }
            res.json({message: 'Vehicle was successfully saved'})
        })
    })
    .get((req, res) =>{
        Vehicle.find((err, vehicles)=>send(res, err, vehicles))
    })

router.route('/vehicle/:vehicle_id')
    .get((req, res) => {
        Vehicle.findById(req.params.vehicle_id, 
            (err, vehicle)=>send(res, err, vehicle))
    })

router.route('/vehicles/make/:make')
    .get((req, res) => {
        Vehicle.find({make:req.params.make}, 
            (err, vehicles)=>send(res, err, vehicles))
    })

router.route('/vehicles/color/:color')
    .get((req, res) => {
        Vehicle.find({color:req.params.color}, 
            (err, vehicles)=>send(res, err, vehicles))
    })

module.exports = router