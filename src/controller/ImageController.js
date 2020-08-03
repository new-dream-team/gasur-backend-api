//index , show , store , update , destroy
const ImageURL = require('../models/Image');
const { update } = require('../models/Image');

module.exports = {

    async store(req , res) {
        
        const namee = req.body.name;
        const urlImagee = req.body.urlImage;

        const imagee = await ImageURL.create({name : namee , urlImage : urlImagee});        
        return res.json(imagee);
    },

    async showAll(req , res) {               

        const imagee = await ImageURL.find({});      
        return res.json(imagee);
    },

    async showById(req , res) {               

        const imagee = await ImageURL.find({_id : req.query.id});      
        return res.json(imagee);
    },

    async delete(req , res) {               
      
        await ImageURL.deleteOne({_id : req.query.id});      
        return res.json({mensagem : "deleted"});
    },
    async update(req , res) {
        await ImageURL.updateOne({ _id: req.query.id }, { name: 'USS Enterprise' })
        return res.json({mensagem: "atualized" })

    }


}