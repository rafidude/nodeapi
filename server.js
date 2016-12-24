const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Vehicle = require('./app/models/vehicle')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 3030

mongoose.connect('mongodb://localhost:27017/hello')

// API Routes
const router = express.Router()

// Routes will all be prefixed with /api 
app.use('/api', router)

const send = (res, err, data) => {
    if (err) {
        res.send(err)
    }
    res.json(data)
}

//custom middleware to log info about the request
router.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const agent = req.headers['user-agent']
    console.log(req.url, ip, agent)
    next()
})

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

app.get('/', (req, res) => {
    const message = "Go to /api"
    res.json({message})
})

app.listen(port)
console.log('Server listening on port: ', port)