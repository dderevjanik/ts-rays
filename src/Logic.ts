import {IGameState, IInputs, IRay, IQuadrant, IPoint, IHitPoint} from './Interfaces/all';
import {castRay} from './RayCast';
import {gameState} from './GameState';
import {calcNewPoint, getQuadrant, normalizeAngle} from './Trigonometry';
import Coordinate from './Coordinate';
import {processControl} from './Control';
import {movePlayer} from './Player';
import {repeat, doUntil} from './Utils';
import {renderPoint, renderText, renderWall} from './Render';

type castRayCb = (distX: number, distY: number) => boolean;
type moveRayCb = (x: number, y: number, moveNext: moveRayCb) => Array<IPoint>;

export const castRays = (map: Array<Array<number>>, x: number, y: number, rot: number, fov: number, count: number): Array<IRay> => {
    const castRayFromPosition: (rot: number) => IRay
        = castRay.bind(this, map, x, y, (row: number, cell: number) => {
            if (map[row][cell] === 1) {
                // renderPoint('purple', cell + 0.6, row + 0.6);
            } else {
                // renderPoint('white', cell + 0.6, row + 0.6);
            }
            return (map[row][cell] !== 1);
        });
    const dRot: number = (Math.PI / (180 / fov)) / count; // TODO: pre-calculate values
    const center: number = rot - dRot * (count / 2) + (dRot / 2); // TODO: pre-calculate values
    const rays: Array<IRay> = repeat(count, (index): IRay => {
        const ray: IRay = castRayFromPosition(index * dRot + center);
        if (ray.side) {
            renderWall('#FFFF00', index, (50/ray.dist));
        } else {
            renderWall('#CCCC00', index, (50/ray.dist));
        }
        return ray;
    });
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
