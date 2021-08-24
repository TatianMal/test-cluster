// @ts-check

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

function findClusters(field, clusterMinSize) {
    let clusters = [];
    let currentCoords = [0, 0];
    let currentNumber = field[currentCoords[0]][currentCoords[1]];
    let neighbourCoords = getNeighbourCoords(currentCoords, field.length);
    let neighbourNumbers = neighbourCoords.map((pair) => field[pair[0]][pair[1]]);
    console.log(neighbourCoords, neighbourNumbers);
    return clusters;
};

export {
    getNeighbourCoords,
    createField,
    printField,
    findClusters,
};