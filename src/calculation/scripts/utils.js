module.exports = {
	formatPointsForDijkstra(points) {
		let formattedPoints = {};
		points.forEach(currentPoint => {
			let connectedPoints = {};
			currentPoint.distances.forEach(currentDist => {
				connectedPoints = Object.assign(connectedPoints, {
					[currentDist.pointName]: currentDist.pointDistance,
				});
			});
			formattedPoints = Object.assign(formattedPoints, {
				[currentPoint.name]: connectedPoints,
			});
		});
		return formattedPoints;
	},
};
