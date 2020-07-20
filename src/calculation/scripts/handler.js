const fs = require("fs");
const mapa = require("../scripts/utils.js");
const djikstra = require("../scripts/djikstra");
const RESOURCES_PATH = process.cwd() + "/src/calculation/resources";
//const RESOURCES_PATH = '../resources';

module.exports = {
  findPath: function (origin, destination) {
    const points = JSON.parse(fs.readFileSync(RESOURCES_PATH + "/points.json"));
    const poi = JSON.parse(fs.readFileSync(RESOURCES_PATH + "/poi.json"));

    const startPoint = poi.find((item) => {
      return item.name == origin.toUpperCase();
    });

    if (startPoint == null) {
      throw new Error("Origin not found");
    }

    const finishPoint = poi.find((item) => {
      return item.name == destination.toUpperCase();
    });

    if (finishPoint == null) {
      throw new Error("Destination not found");
    }

    startPoint.name = "start";
    finishPoint.name = "finish";
    points.push(startPoint);
    points.push(finishPoint);

    finishPoint.distances.map((point) => {
      const currentPoint = points.find((item) => item.name == point.pointName);

      currentPoint.distances.push({
        pointName: finishPoint.name,
        pointDistance: point.pointDistance,
      });
    });

    const parsedJson = mapa.formatPointsForDijkstra(points);
    const result = djikstra.calculate(parsedJson);

    const parsedResult = [];

    parsedResult.push({ name: origin, x: startPoint.x, y: startPoint.y });

    result.path.map((point) => {
      if (point != "start" && point != "finish") {
        const currentPoint = points.find((item) => item.name == point);

        parsedResult.push({
          name: currentPoint.name,
          x: currentPoint.x,
          y: currentPoint.y,
        });
      }
    });

    parsedResult.push({
      name: destination,
      x: finishPoint.x,
      y: finishPoint.y,
    });

    return parsedResult;
  },
};
