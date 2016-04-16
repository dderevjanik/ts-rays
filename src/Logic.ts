import {IGameState, IInputs, IRay} from './Interfaces/all';
import {calcNewPoint} from './Trigonometry';
import {processControl} from './Control';
import {movePlayer} from './Player';
import {repeat} from './Utils';

export const castRay = (length: number, x: number, y: number, rot: number): IRay => ({
    x: x,
    y: y,
    distX: x + (Math.cos(rot) * length),
    distY: y + (Math.sin(rot) * length)
});

export const castRays = (x: number, y: number, rot: number, fov: number, count: number): Array<IRay> => {
    const castRayFromPosition: (rot: number) => IRay
        = castRay.bind(this, 10, x, y);
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
