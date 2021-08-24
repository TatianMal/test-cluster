import Cluster from './cluster.js';

function getFieldNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function createField(fieldSize) {
  const min = 0;
  const max = 3;
  const field = [];
  for (let i = 0; i < fieldSize; i += 1) {
    const row = [];
    for (let j = 0; j < fieldSize; j += 1) {
      row.push(getFieldNumber(min, max));
    }
    field.push(row);
  }
  return field;
}

function printField(field) { // void
  console.log(field);
}

function getNeighbourCoords(currentCoords, fieldSize) {
  // соседними могут быть максимум 4 клетки
  const coords = [
    [currentCoords[0] - 1, currentCoords[1]],
    [currentCoords[0], currentCoords[1] - 1],
    [currentCoords[0] + 1, currentCoords[1]],
    [currentCoords[0], currentCoords[1] + 1],
  ];
  const result = coords.filter((pair) => pair.every((c) => c >= 0 && c <= fieldSize - 1));
  return result;
}

function findCluster({
  currentCoords, field, fieldSize, handledCells, cluster,
}) {
  if (handledCells[currentCoords[0]][currentCoords[1]]) {
    return cluster;
  }
  const currentNumber = field[currentCoords[0]][currentCoords[1]];
  cluster.coords.push(currentCoords);
  // eslint-disable-next-line no-param-reassign
  handledCells[currentCoords[0]][currentCoords[1]] = true;
  const neighbourCoords = getNeighbourCoords(currentCoords, fieldSize);
  const sameNumbersCoords = neighbourCoords.filter((pair) => field[pair[0]][pair[1]] === currentNumber);

  if (sameNumbersCoords.length === 0) {
    return cluster;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const coords of sameNumbersCoords) {
    findCluster({
      currentCoords: coords, field, fieldSize, handledCells, cluster,
    });
  }
  return cluster;
}

function findClusters(field, clusterMinSize) {
  const clusters = [];
  const fieldSize = field.length;
  const handledCells = [];
  for (let i = 0; i < fieldSize; i += 1) {
    const row = new Array(fieldSize);
    row.fill(false, 0, fieldSize);
    handledCells.push(row);
  }
  for (let i = 0; i < fieldSize; i += 1) {
    for (let j = 0; j < fieldSize; j += 1) {
      if (handledCells[i][j]) {
        continue;
      }
      const currentCoords = [i, j];
      const currentCluster = new Cluster({ number: field[currentCoords[0]][currentCoords[1]] });

      findCluster({
        currentCoords, field, handledCells, fieldSize, cluster: currentCluster,
      });
      if (currentCluster.getSize() < clusterMinSize) {
        // Cluster сам уничтожится при выходе из области видимости?
        continue;
      }
      clusters.push(currentCluster);
    }
  }
  return clusters;
}

export {
  getNeighbourCoords,
  createField,
  printField,
  findClusters,
};
