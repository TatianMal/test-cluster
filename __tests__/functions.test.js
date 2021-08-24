import { getNeighbourCoords, findClusters } from '../src/functions.js';
import Cluster from '../src/cluster.js';

const table = [
  [[0, 0], [[0, 1], [1, 0]]],
  [[2, 2], [[1, 2], [2, 1]]],
  [[1, 0], [[0, 0], [2, 0], [1, 1]]],
  [[1, 1], [[0, 1], [1, 0], [1, 2], [2, 1]]],
];

test.each(table)('test getNeighbourCoords', (coords, expectedCoords) => {
  const neighbourCoords = getNeighbourCoords(coords, 3);
  expect(neighbourCoords).toHaveLength(expectedCoords.length);
  expect(neighbourCoords).toEqual(expect.arrayContaining(expectedCoords));
});

test('findClusters main flow', () => {
  const field = [
    [2, 0, 0, 3, 0],
    [3, 1, 0, 0, 3],
    [0, 3, 0, 2, 3],
    [3, 1, 2, 3, 0],
    [1, 3, 3, 3, 2],
  ];
  const clustersBigSize = findClusters(field, 10);
  expect(clustersBigSize).toEqual([]);
  const clustersRegular = findClusters(field, 4);
  expect(clustersRegular).toHaveLength(2);
  const cluster1 = new Cluster({ number: 0, coords: expect.arrayContaining([[0, 1], [0, 2], [1, 2], [1, 3], [2, 2]]) });
  const cluster2 = new Cluster({ number: 3, coords: expect.arrayContaining([[3, 3], [4, 3], [4, 2], [4, 1]]) });
  expect(clustersRegular).toEqual(expect.arrayContaining([cluster1, cluster2]));
});

test('findClusters empty field', () => {
  const fieldEmpty = [];
  const clustersEmptyField = findClusters(fieldEmpty, 2);
  expect(clustersEmptyField).toEqual([]);
});
