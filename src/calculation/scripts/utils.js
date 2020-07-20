module.exports = {
    formatPointsForDijkstra: function (points) {
        var formattedPoints = {}
        points.forEach(currentPoint => {
           var connectedPoints = {}
            currentPoint.distances.forEach(currentDist =>{
                connectedPoints = Object.assign(connectedPoints, {[currentDist.pointName]: currentDist.pointDistance})
            })
            formattedPoints = Object.assign(formattedPoints, {[currentPoint.name] : connectedPoints});
        });
        return formattedPoints
    }
}