const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const birds = require('./app/routes/birds')
const vehicles = require('./app/routes/vehicles')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 3030

mongoose.connect('mongodb://localhost:27017/hello')

//custom middleware to log info about the request
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    let b = req.headers['user-agent'].split(' ')    
    console.log(req.url, ip, b[b.length - 2])
    next()
})

// Routes will all be prefixed with /api 
app.use('/api', vehicles)
app.use('/birds', birds)

app.get('/', (req, res) => {
    const message = "Go to /api"
    res.json({message})
})

app.listen(port)
console.log('Server listening on port: ', port)