// @ts-check
import {
    createField,
    printField,
    findClusters,
} from './functions.js';

const fieldSize = 5; // write func
const clusterMinSize = 4; // write func
const field = createField(fieldSize);
printField(field);
findClusters(field, clusterMinSize);