const mapa = require('./utils.js');
const djikstra = require('./djikstra');


module.exports = {
	findPath(origin, destination, poi, points) {

		const startPoint = poi.find(item => {
			return item.name.toUpperCase() === origin.toUpperCase();
		});
		if (startPoint == null) {
			throw new Error('Origin not found');
		}
		const finishPoint = poi.find(item => {
			return item.name.toUpperCase() === destination.toUpperCase();
		});
		if (finishPoint == null) {
			throw new Error('Destination not found');
		}
		startPoint.name = 'start';
		finishPoint.name = 'finish';
		points.push(startPoint);
		points.push(finishPoint);

		finishPoint.distances.map(point => {
			const currentPoint = points.find(item => {
				return item.name === point.pointName;
			});
			currentPoint.distances.push({
				pointName: finishPoint.name,
				pointDistance: point.pointDistance,
			});
		});

		const parsedJson = mapa.formatPointsForDijkstra(points);
		const result = djikstra.calculate(parsedJson);

		const parsedResult = [];
		parsedResult.push({ name: origin, x: startPoint.x, y: startPoint.y });
		result.path.map(point => {
			if (point !== 'start' && point !== 'finish') {
				const currentPoint = points.find(item => {
					return item.name === point;
				});
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

	getImageById(idImage) {

	}
};
