import util from 'util';

import Cluster from './cluster.js';

function getFieldNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function createField(fieldSize, min = 0, max = 3) {
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

function printField(field, clusterMinSize) {
  console.log('Поле:');
  const fieldToShow = field.map((row) => row.join(' '));
  console.log(fieldToShow.join('\n'));
  console.log(`Минимальный размер кластера: ${clusterMinSize}`);
}

function printClusters(clusters) {
  console.log('Кластеры:');
  console.log(util.inspect(clusters, false, 3));
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

function findClusterCoords({
  currentCoords, field, fieldSize, handledCells, currentNumber,
}) {
  if (handledCells[currentCoords[0]][currentCoords[1]]) {
    return [];
  }
  const coordsToCluster = [currentCoords];
  // eslint-disable-next-line no-param-reassign
  handledCells[currentCoords[0]][currentCoords[1]] = true;
  const neighbourCoords = getNeighbourCoords(currentCoords, fieldSize);
  const sameNumbersCoords = neighbourCoords.filter((pair) => field[pair[0]][pair[1]] === currentNumber);

  if (sameNumbersCoords.length === 0) {
    return coordsToCluster;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const coords of sameNumbersCoords) {
    coordsToCluster.push(...findClusterCoords({
      currentCoords: coords, field, fieldSize, handledCells, currentNumber,
    }));
  }
  return coordsToCluster;
}
/**
 * - Оценка временной сложности алгоритма:
 * 1) Внешняя обработка, наихудший случай - все числа не формируют никаких скоплений вообще (одиночные),
 * оба цикла пройдут полностью => затраты по времени ~ O(n^2)
 * 2) Внешняя обработка, средний случай - при наличии большого количества скоплений чисел (не обязательно кластеров)
 * количество отработок внутреннего цикла сокращается => затраты по времени ~ O(n*log(n))
 * Цикл в рекурсии (findClusterCoords) может отработать маскимум 4 раза, но при этом
 * количество вызовов самой рекурсии в теории может достигать n и n^2 (наихудший случай, все поле это один кластер).
 * При этом вызовы рекурсии сокращают количество вызовов внешних циклов, в примерной пропорции.
 * Вывод: данный алгоритм будет иметь сложность O(n^2).
 *
 * Примечание: т.к. используется рекурсия для поиска чисел, входящих в кластер (findClusterCoords)
 * => чем больше будет кластер, тем глубже рекурсия. При большом размере поля в теории возникнет переполнение стека.
 */
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
      currentCluster.coords = findClusterCoords({
        currentCoords, field, handledCells, fieldSize, currentNumber: currentCluster.number,
      });
      if (currentCluster.getSize() < clusterMinSize) {
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
  printClusters,
  findClusters,
};
