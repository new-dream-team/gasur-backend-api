const express = require("express");
const routes = express.Router();
const { findPath } = require("./calculation/scripts/handler");

routes.post("/generateMap", (req, res) => {
  const { origin, destination } = req.body;

  try {
    const answer = findPath(origin, destination);

    return res.json(answer);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = routes;
