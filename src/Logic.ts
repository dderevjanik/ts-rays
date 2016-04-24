import {IGameState, IInputs, IRay, IQuadrant, IPoint} from './Interfaces/all';
import {gameState} from './GameState';
import {calcNewPoint, getQuadrant, normalizeAngle} from './Trigonometry';
import {processControl} from './Control';
import {movePlayer} from './Player';
import {repeat} from './Utils';

type castRayCb = (distX: number, distY: number) => boolean;
type moveRayCb = (x: number, y: number, moveNext: moveRayCb) => IPoint;

const moveRay = (quadrant: IQuadrant, dX: number, dY: number, slope: number, test: castRayCb, x: number, y: number, moveNext: moveRayCb): IPoint => {
    const hitX: number = (quadrant.right) ? Math.ceil(x) : Math.floor(x);
    const hitY: number = y + ((hitX - x) * slope);

    return test(hitX, hitY)
        ? {x: hitX, y: hitY}
        : moveNext(x + dX, y + dY, moveNext);
};

export const castRay = (map: Array<Array<number>>, length: number, x: number, y: number, rot: number, test: castRayCb): IRay => {
    const rayAngle: number = normalizeAngle(rot);
    const angleSin: number = Math.sin(rayAngle);
    const angleCos: number = Math.cos(rayAngle);
    const quadrant: IQuadrant = getQuadrant(rot);

    const slope: number = (angleSin / angleCos);
    const dX: number = (quadrant.right) ? 1 : -1;
    const dY: number = dX * slope;

    const moveRayInDir: moveRayCb
        = moveRay.bind(this, quadrant, dX, dY, slope, (hitX, hitY) => {
            const wallX: number = Math.floor(hitX + (quadrant.right ? 0 : -1));
            const wallY: number = Math.floor(hitY);
            return (gameState.map[wallY][wallX] === 0)
                ? false
                : true;
        });

    const hslope: number = (angleCos / angleSin);
    const hdY: number = (quadrant.top) ? -1 : 1;
    const hdX: number = x + (hdY - y) * slope;

    const ray: IPoint = moveRayInDir(x, y, moveRayInDir);

    return {
        x: x,
        y: y,
        distX: ray.x,
        distY: ray.y
    };
};

export const castRays = (map: Array<Array<number>>, x: number, y: number, rot: number, fov: number, count: number): Array<IRay> => {
    const castRayFromPosition: (rot: number) => IRay
        = castRay.bind(this, map, 10, x, y);
    const dRot: number = (Math.PI / (180 / fov)) / count; // TODO: pre-calculate values
    const center: number = rot - dRot * (count / 2) + (dRot / 2); // TODO: pre-calculate values
    const rays: Array<IRay> = repeat(count, (index): IRay =>
        castRayFromPosition(index * dRot + center));
    return rays;
};

export const nextState = (gameState: IGameState, inputs: IInputs): IGameState => {
    const control: IGameState = processControl(gameState, inputs);
    control.player = movePlayer(control.player, gameState.map);
    return gameState;
};

export default {
    castRay: castRay,
    castRays: castRays,
    nextState: nextState
};
