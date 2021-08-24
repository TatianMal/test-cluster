// @ts-check
import {
  createField,
  printField,
  findClusters,
  printClusters,
} from './functions.js';

const fieldSize = 5;
const clusterMinSize = 4;
const field = createField(fieldSize);
const clusters = findClusters(field, clusterMinSize);
printField(field);
printClusters(clusters);
