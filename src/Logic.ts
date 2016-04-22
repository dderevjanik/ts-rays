import {IGameState, IInputs, IRay, IQuadrant} from './Interfaces/all';
import {gameState} from './GameState';
import {calcNewPoint, getQuadrant, normalizeAngle} from './Trigonometry';
import {processControl} from './Control';
import {movePlayer} from './Player';
import {repeat} from './Utils';

export const castRay = (colision: boolean, length: number, x: number, y: number, rot: number): IRay => {
    const rayAngle: number = normalizeAngle(rot);
    const angleSin: number = Math.sin(rayAngle);
    const angleCos: number = Math.cos(rayAngle);
    const quadrant: IQuadrant = getQuadrant(rot);

    console.log(rayAngle, quadrant);

    const slope: number = (angleSin / angleCos);
    const dX: number = (quadrant.right) ? 1 : -1;
    const dY: number = dX * slope;

    const hitX: number = (quadrant.right) ? Math.ceil(x) : Math.floor(x);
    const hitY: number = y + ((hitX - x) * slope);

    const wallX: number = Math.floor(hitX + (quadrant.right ? 0 : -1));
    const wallY: number = Math.floor(hitY);

    console.log(`WALL HIT: ${gameState.map[wallY][wallX] ? 'TRUE' : 'FALSE'}`);

    return {
        x: x,
        y: y,
        distX: hitX,
        distY: hitY
    };
};

export const castRays = (x: number, y: number, rot: number, fov: number, count: number, colision: boolean = true): Array<IRay> => {
    const castRayFromPosition: (rot: number) => IRay
        = castRay.bind(this, colision, 10, x, y);
    const dRot: number = (Math.PI / (180 / fov)) / count;
    const center: number = rot - dRot * (count / 2) + (dRot / 2);
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
    nextState: nextState,
};
