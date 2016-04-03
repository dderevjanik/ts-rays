import IPoint from './Interfaces/IPoint';

export const calcNewPoint = (x: number, y: number, rot: number, vect: number): IPoint => ({
    x: x + (Math.cos(rot) * vect),
    y: y + (Math.sin(rot) * vect)
});

export default {
    calcNewPoint: calcNewPoint
};
