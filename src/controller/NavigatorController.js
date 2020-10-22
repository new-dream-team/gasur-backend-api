const handler = require("../calculation/scripts/handler");
const Image = require('../models/Image');

module.exports = {
	async calculateRoute( req, res ){
		const params = req.body;
		try {
			const image = await Image.findOne({_id : req.query.id})
			if(!image.poi || !image.points){
				throw new Error("Inexistent POI/Points");
			}
			const answer = await handler.findPath(params.origin, params.destination, image.poi, image.points);
			return res.json(answer);
		} catch (error) {
			console.log(error)
			res.status(400).json({error: error.message});
		}
	}
}
