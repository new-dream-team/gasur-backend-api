const express = require('express');

const routes = express.Router();
const ImageController = require('./controller/ImageController')
const NavigatorController = require('./controller/NavigatorController');


routes.post('/generateMap', NavigatorController.calculateRoute);

routes.post('/image',ImageController.store);
routes.get('/image-all',ImageController.showAll);
routes.get('/image',ImageController.showById);
routes.delete('/image' , ImageController.delete);
routes.put('/image' , ImageController.update);

module.exports = routes;
