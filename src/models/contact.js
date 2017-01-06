const mongoose = require("mongoose")
const Schema = mongoose.Schema

const contactSchema = new Schema({any: {}}, {strict: false})

const ModelClass = mongoose.model('Contact', contactSchema)

module.exports = ModelClass;