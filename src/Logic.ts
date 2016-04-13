import {IGameState, IInputs, IRay} from './Interfaces/all';
import {calcNewPoint} from './Trigonometry';
import {processControl} from './Control';
import {movePlayer} from './Player';
import {repeat} from './Utils';

export const castRays = (x: number, y: number, rot: number, fov: number, count: number): Array<IRay> => {
    const dRot: number = (Math.PI / (180 / fov)) / count;
    const rays: Array<IRay> = repeat(count, (index): IRay => ({
        x: x,
        y: y,
        distX: x + (Math.cos(rot + index * dRot) * 10),
        distY: y + (Math.sin(rot + index * dRot) * 10),
    }));
    return rays;
};

export const nextState = (gameState: IGameState, inputs: IInputs): IGameState => {
    const control: IGameState = processControl(gameState, inputs);
    control.player = movePlayer(control.player);
    return gameState;
};

export default {
    nextState: nextState
};
