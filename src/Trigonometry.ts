import IPoint from './Interfaces/IPoint';

/**
 * Will calculate new point
 * @param {number} x - x position
 * @param {number} y - y position
 * @param {number} rot - angle
 * @param {number} moveVect - moving vector
 * @retur {IPoint} new point
 */
export const calcNewPoint = (x: number, y: number, rot: number, moveVect: number): IPoint => ({
    x: x + (Math.cos(rot) * moveVect),
    y: y + (Math.sin(rot) * moveVect)
});

export default {
    calcNewPoint: calcNewPoint
};
