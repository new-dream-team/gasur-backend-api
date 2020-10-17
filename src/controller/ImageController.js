//index , show , store , update , destroy
const { response } = require('express');
const Image = require('../models/Image');

module.exports = {

    async store(req , res) {
			try {
				const {urlImage, name, poi, points} = req.body;
        const image = await Image.create({name , urlImage, poi, points });
        return res.json(image);
			} catch (error) {
				return res.status(400).json({message: "Something went wrong"});
			}
    },

    async showAll(req , res) {
				const imagesRaw = await Image.find({});
				const images = [];
				imagesRaw.map( image  => { images.push({ "_id": image._id, "name": image.name, "urlImage":image.urlImage })})
        return res.json(images);
    },

    async showById(req , res) {
			try {
				const image = await Image.findOne({_id : req.query.id});
        return res.json(image);
			} catch ( error ) {
				return res.status(400).json({message: "Invalid ID"});
			}

    },

    async delete(req , res) {
			try{
        await Image.deleteOne({_id : req.query.id});
        return res.status(204).send();
			} catch ( error ){
				return res.status(400).json({message: "Invalid ID"});
			}
		},

    async update(req , res) {
			try {
				const image = await Image.findByIdAndUpdate( { _id: req.query.id } , req.body , { new: true })
        return res.json(image)
			} catch (error) {
				console.log(error)
				return res.status(400).json({message: "Invalid ID"});
			}
    }
}
