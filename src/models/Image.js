const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    name: String,
    urlImage: String 

});

module.exports = mongoose.model('Image' , ImageSchema)
