// @ts-check

import Cluster from './cluster.js';

function getFieldNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};

function createField(fieldSize) {
    const min = 0;
    const max = 3;
    const field = [];
    for (let i = 0; i < fieldSize; i++) {
        const row = [];
        for (let j = 0; j < fieldSize; j++) {
            row.push(getFieldNumber(min, max))
        }
        field.push(row)
    }
    return field;
};

function printField(field) { // void
    console.log(field)
};

function getNeighbourCoords(currentCoords, fieldSize) {
    // соседними могут быть максимум 4 клетки
    let coords = [
        [currentCoords[0] - 1, currentCoords[1]],
        [currentCoords[0], currentCoords[1] - 1],
        [currentCoords[0] + 1, currentCoords[1]],
        [currentCoords[0], currentCoords[1] + 1],
    ];
    const result = coords.filter((pair) => pair.every((c) => c >= 0 && c <= fieldSize - 1))
    return result;
}

function findClusterFromCoord({currentCoords, field, fieldSize, handledCellList, cluster }) { // return cluster
    if (handledCellList[currentCoords[0]][currentCoords[1]]) {
        return cluster
    }
    const currentNumber = field[currentCoords[0]][currentCoords[1]]
    cluster.coords.push(currentCoords)
    handledCellList[currentCoords[0]][currentCoords[1]] = true
    let neighbourCoords = getNeighbourCoords(currentCoords, fieldSize);
    let sameNumbersCoords = neighbourCoords.filter((pair) => field[pair[0]][pair[1]] === currentNumber);
    
    if (sameNumbersCoords.length === 0) {
        return cluster
    }
    // reduce?
    for (const coords of sameNumbersCoords) {
        findClusterFromCoord({currentCoords: coords, field, fieldSize, handledCellList, cluster })
    }
    return cluster
}

function findClusters(field, clusterMinSize) {
    let clusters = [];
    const fieldSize = field.length;
    const handledCellList = [];
    for (let i = 0; i < fieldSize; i++) {
        const row = new Array(fieldSize);
        row.fill(false, 0, fieldSize)
        handledCellList.push(row)
    }
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            if (handledCellList[i][j]) {
                continue
            }
            let currentCoords = [i, j];
            let currentNumber = field[currentCoords[0]][currentCoords[1]];
            const currentCluster = new Cluster();
            currentCluster.number = currentNumber;
            
            findClusterFromCoord({ currentCoords, field, handledCellList, fieldSize, cluster: currentCluster})
            console.log('tempCluster', currentCluster)
            if (currentCluster.getSize() < clusterMinSize) {
                // Cluster сам уничтожится при выходе из области видимости?
                continue
            }
            clusters.push(currentCluster)
        }
    }
    return clusters;
};

export {
    getNeighbourCoords,
    createField,
    printField,
    findClusters,
};