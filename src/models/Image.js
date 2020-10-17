const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    name: String,
		urlImage: String,
		poi: [],
		points: [],
}, {
	versionKey: false,
});

module.exports = mongoose.model('Image', ImageSchema)
