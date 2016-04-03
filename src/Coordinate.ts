import {IPoint, ICell} from './Interfaces/all';

const getWPos = (scale: number, row: number, col: number): IPoint => ({
    x: (col * scale),
    y: (row * scale)
});

const getCPos = (scale: number, x: number, y: number): ICell => ({
    row: (Math.floor(y / scale)),
    col: (Math.floor(x / scale))
});

export default {
    getWPos: getWPos,
    getCPos: getCPos
}
