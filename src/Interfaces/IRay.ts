import IPoint from './IPoint';
import {intersections} from './../Primitives';

export interface IRay extends IPoint {
    dist: number;
    side: number;
    row: number;
    cell: number;
};

export default IRay;
