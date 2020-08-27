const express = require('express');

const routes = express.Router();
const ImageController = require('./controller/ImageController')
const handler = require('./calculation/scripts/handler');


routes.post('/generateMap', async (req, res) => {
	const params = req.body;
	try {
		const answer = handler.findPath(params.origin, params.destination);
		res.json(answer);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

routes.post('/image', ImageController.store);
routes.get('/image-all',ImageController.showAll);
routes.get('/image',ImageController.showById);
routes.delete('/image' , ImageController.delete);
routes.put('/image' , ImageController.update);

module.exports = routes;
