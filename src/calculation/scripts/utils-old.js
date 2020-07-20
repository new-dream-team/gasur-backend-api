const process = require('process');

module.exports = {
    load: function (path) {
        var fs = require('fs')
        var file = fs.readFileSync(path)
        var matrix = []
        var x = 0
        var y = 0
        matrix[y] = []
        for (var c = 0; c < file.length; c++) {
            if (file[c] == 45) {
                matrix[y][x++] = 0
            } else if (file[c] == 120) {
                matrix[y][x++] = 1
            } else {
                x = 0
                y++
                c++
                matrix[y] = []
            }
        }
        return matrix
    },

    findAllPoints: function (map) {
        var points = []
        var currentChar = 65
        for (var c = 0; c < map[0].length; c++) {
            var l = 0, lIni = 0, lFin = 0
            do {
                while (l < map.length && !map[l][c] == 1) l++
                lIni = l

                while (l < map.length && map[l][c] == 1) l++
                lFin = l - 1
                if (l != lIni && lFin - lIni > 1) {
                    points.push({ "l": lIni, "c": c, "name": String.fromCharCode(currentChar++) })
                    points.push({ "l": lFin, "c": c, "name": String.fromCharCode(currentChar++) })
                }
            } while (l < map.length)
        }

        for (var l = 0; l < map.length; l++) {
            var c = 0, cIni = 0, cFin = 0
            do {
                while (c < map[0].length && !map[l][c] == 1) c++
                cIni = c

                while (c < map[0].length && map[l][c] == 1) c++
                cFin = c - 1
                if (c != cIni && cFin - cIni > 1) {
                    if (!points.some(point => point["l"] === l && point["c"] === cIni)) {
                        points.push({ "l": l, "c": cIni, "name": String.fromCharCode(currentChar++) })
                    }
                    if (!points.some(point => point["l"] === l && point["c"] === cFin)) {
                        points.push({ "l": l, "c": cFin, "name": String.fromCharCode(currentChar++) })
                    }
                }
            } while (c < map[0].length)
        }
        return points
    },

    preparePointsForDijsktra: function (points, map) {
        dijkstraPoints = []
        points.forEach(currentPoint => {

            //O primeiro verifica para esquerda
            var col = currentPoint.c;
            var colFin;
            while (
                --col >= 0
                && !points.some(point => point["l"] === currentPoint.l && point["c"] === col)
                && map[currentPoint.l][col] == 1
            );
            colFin = col + 1
            values = []
            if (colFin != currentPoint.c) {
                var name = points.find(point => point["l"] == currentPoint.l && point["c"] == col).name
                var distance = currentPoint.c - col
                values.push({ "pointName": name, "pointDistance": distance })
            }

            //O segundo verifica para a direita
            var col = currentPoint.c;
            while (
                ++col < map[0].length
                && !points.some(point => point["l"] === currentPoint.l && point["c"] === col)
                && map[currentPoint.l][col] == 1
            );
            colFin = col - 1;
            if (colFin != currentPoint.c) {

                var name = points.find(point => point["l"] == currentPoint.l && point["c"] == col).name
                var distance = col - currentPoint.c
                values.push({ "pointName": name, "pointDistance": distance })
            }

            //O terceiro verifica para cima
            var line = currentPoint.l;
            var lineFin;
            while (
                --line >= 0
                && !points.some(point => point["l"] === line && point["c"] === currentPoint.c)
                && map[line][currentPoint.c] == 1
            );
            lineFin = line + 1
            if (lineFin != currentPoint.l) {
                var name = points.find(point => point["l"] === line && point["c"] === currentPoint.c).name
                var distance = currentPoint.l - line
                values.push({ "pointName": name, "pointDistance": distance })
            }

            //O quarto (último) verifica para a baixo
            var line = currentPoint.l;
            //console.log(map.length)
            while (
                ++line < map.length
                && !points.some(point => point["l"] === line && point["c"] === currentPoint.c)
                && map[line][currentPoint.c] == 1
            );

            lineFin = line - 1
            if (lineFin != currentPoint.l) {
                //    console.log(line)
                //    console.log(currentPoint.c)
                var name = points.find(point => point["l"] === line && point["c"] === currentPoint.c).name
                var distance = line - currentPoint.l;
                values.push({ "pointName": name, "pointDistance": distance })
            }

            dijkstraPoints.push({ "name": currentPoint.name, "distances": values })
        });
        return dijkstraPoints
    },

    formatPointsForDijkstra: function (points) {
        /*
        var formatted = []
        var f2
        var p = points[1];

        var t = Object.assign({ [p.distances[0].pointName]: p.distances[0].pointDistance }, { [p.distances[1].pointName]: p.distances[1].pointDistance })
        f2 = Object.assign({ [p.name]: t });
        */
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