// @ts-check
import util from 'util';
import {
    createField,
    printField,
    findClusters,
} from './functions.js';

const fieldSize = 5;
const clusterMinSize = 4;
const field = createField(fieldSize);
printField(field);
const clusters = findClusters(field, clusterMinSize);
console.log(util.inspect(clusters, false, 4));