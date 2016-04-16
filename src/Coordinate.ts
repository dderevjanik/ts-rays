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
 * Get world coordinations
 * @param {number} row
 * @param {number} col
 * @return {IPoint}
 */
const getCurrentWPos: CellToPoint = getWPos.bind(this, staticData.ui.minimap.scale);

/**
 * Get current cell
 * @param {number} x
 * @param {number} y
 * @return {ICell}
 */
const getCurrentCPos: PointToCell = getCPos.bind(this, staticData.ui.minimap.scale);

export default {
    getWPos: getCurrentWPos,
    getCPos: getCurrentCPos
}
