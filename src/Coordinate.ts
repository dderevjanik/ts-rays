import {IPoint, ICell} from './Interfaces/all';
import {staticData} from './StaticData';

type CellToPoint = (row: number, col: number) => IPoint;
type PointToCell = (x: number, y: number) => ICell;

/**
 * Get world coordinations
 * @param {number} scale
 * @param {number} x
 * @param {number} y
 * @retunr {IPoint}
 */
const getWPos = (scale: number, row: number, col: number): IPoint => ({
    x: (col),
    y: (row)
});

/**
 * Get current cell position
 * @param {number} scale
 * @param {number} x
 * @param {number} y
 * @retunr {ICell}
 */
const getCPos = (scale: number, x: number, y: number): ICell => ({
    row: (Math.floor(y)),
    col: (Math.floor(x))
});

/**
 * Check if coordinates are outside of world
 * @param {number} scale
 * @param {Array<Array<number>>} map
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
const isWOutside = (scale: number, map: Array<Array<number>>, x: number, y: number): boolean =>
    ((x < 0) || (x >= map[0].length) ||
    (y < 0) || (y >= map.length));

/**
 * Check if cell is outside of world
 * @param {Array<Array<number>>} map
 * @param {number} row
 * @param {number} cell
 * @return {boolean}
 */
const isCOutside = (map: Array<Array<number>>, row: number, cell: number): boolean =>
    ((row < 0) || (row >= map.length) ||
    (cell < 0) || (cell >= map[0].length));

/**
 * Get world coordinations
 * @param {number} row
 * @param {number} col
 * @return {IPoint}
 */
const getCurrentWPos: CellToPoint
    = getWPos.bind(this, staticData.ui.minimap.scale);

/**
 * Get current cell
 * @param {number} x
 * @param {number} y
 * @return {ICell}
 */
const getCurrentCPos: PointToCell
    = getCPos.bind(this, staticData.ui.minimap.scale);

/**
 * Check if coordinates are outside of world
 * @param {Array<Array<number>>} map
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
const isCurrentWOutside: boolean
    = isWOutside.bind(this, staticData.ui.minimap.scale);

export default {
    getWPos: getCurrentWPos,
    getCPos: getCurrentCPos,
    isWOutside: isWOutside,
    isCOutside: isCOutside
};
