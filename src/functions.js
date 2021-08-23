function getFieldNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function createField(fieldSize) {
    const field = [];
    for (let i = 0; i < fieldSize; i++) {
        const row = [];
        for (let j = 0; j < fieldSize; j++) {
            row.push(getFieldNumber(1, 4))
        }
        field.push(row)
    }
    return field;
};

function printField(field) { // void
    console.log(field)
};

function findClusters(field) {};

export {
    createField,
    printField,
    findClusters,
};