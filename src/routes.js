const express = require('express');
const routes = express.Router();
const handler = require('./calculation/scripts/handler');

routes.post('/generateMap', async (req,res) => {
    const params = req.body;
    try {
        const answer = handler.findPath(params.origin,params.destination);
        console.log(answer);
        res.json(answer);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = routes;