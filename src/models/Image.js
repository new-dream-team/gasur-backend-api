const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    name: String,
    urlImage: String,
    json: [{
        name: String,
        distances: [{
            pointName: String, pointDistance: Number
        }],
        x: Number,
        y: Number
    }]

});

module.exports = mongoose.model('Image', ImageSchema)
