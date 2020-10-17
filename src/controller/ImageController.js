//index , show , store , update , destroy
const Image = require('../models/Image');

module.exports = {

    async store(req , res) {
        const {urlImage , name , x ,y , json} = req.body;
        const image = await Image.create({name, urlImage, x ,y , json});
        return res.json(image);
    },

    async showAll(req , res) {
				const image = await Image.find({});
        return res.json(image);
    },

    async showById(req , res) {
        const image = await Image.find({_id : req.query.id});
        return res.json(image);
    },

    async delete(req , res) {
        await Image.deleteOne({_id : req.query.id});
        return res.json({message : "deleted"});
		},

    async update(req , res) {
        const {urlImage , name , x ,y , json} = req.body;
        await Image.updateOne({ _id: req.query.id }, {name , urlImage , x ,y , json})
        return res.json({mensagem: "updated" })
    }
}
