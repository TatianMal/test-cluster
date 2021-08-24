import { getNeighbourCoords } from '../src/functions.js';

const fieldSize = 3;
const field = [
    [1, 0, 3],
    [2, 1, 0],
    [0, 3, 2],
];

test('test getNeighbourCoords', () => {
  // corner start
  const neighbourCoords1 = getNeighbourCoords([0, 0], fieldSize);
  expect(neighbourCoords1).toHaveLength(2);
  expect(neighbourCoords1).toEqual(expect.arrayContaining([[0, 1], [1, 0]]));
  // corner end
  const neighbourCoords2 = getNeighbourCoords([2, 2], fieldSize);
  expect(neighbourCoords2).toHaveLength(2);
  expect(neighbourCoords2).toEqual(expect.arrayContaining([[1, 2], [2, 1]]));
  // corner middle
  const neighbourCoords3 = getNeighbourCoords([1, 0], fieldSize);
  expect(neighbourCoords3).toHaveLength(3);
  expect(neighbourCoords3).toEqual(expect.arrayContaining([[0, 0], [2, 0], [1, 1]]));
  // center
  const neighbourCoords4 = getNeighbourCoords([1, 1], fieldSize);
  expect(neighbourCoords4).toHaveLength(4);
  expect(neighbourCoords4).toEqual(expect.arrayContaining([[0, 1], [1, 0], [1, 2], [2, 1]]));
});