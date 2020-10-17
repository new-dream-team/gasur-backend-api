//index , show , store , update , destroy
const Image = require('../models/Image');

module.exports = {

    async store(req , res) {
        const {urlImage , name} = req.body;
        const image = await Image.create({name : name , urlImage : urlImage});
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
        return res.json({mensagem : "deleted"});
    },
    async update(req , res) {
        const {urlImage , name} = req.body;
        await Image.updateOne({ _id: req.query.id }, { name: name , urlImage: urlImage })
        return res.json({mensagem: "updated" })
    }
}
