import {IGameState, IInputs, IRay, IQuadrant, IPoint, IHitPoint} from './Interfaces/all';
import staticData from './StaticData';
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
    const castRayFromPosition: (rayRot: number) => IRay
        = castRay.bind(this, map, rot, x, y, (row: number, cell: number) => {
            if (map[row][cell] === 2) {
                // renderPoint('purple', cell + 0.6, row + 0.6);
            } else {
                // renderPoint('white', cell + 0.6, row + 0.6);
            }
            return (map[row][cell] === 0);
        });
    const dRot: number = (Math.PI / (180 / fov)) / count; // TODO: pre-calculate values
    const center: number = rot - dRot * (count / 2) + (dRot / 2); // TODO: pre-calculate values
    const rays: Array<IRay> = repeat(count, (index): IRay => {
        const ray: IRay = castRayFromPosition(index * dRot + center);
        if (gameState.map[ray.row][ray.column] === 2) {
            if (ray.side) {
                renderWall('#660066', index, (64/ray.dist));
            } else {
                renderWall('#990099', index, (64/ray.dist));
            }
        } else {
            if (ray.side) {
                staticData.ui.plot.ctx.drawImage(
                    staticData.textures,
                    (ray.x - Math.floor(ray.x))*64,
                    128,
                    1,
                    64,
                    index,
                    (150 - 64/ray.dist),
                    1,
                    2*(64/ray.dist)
                );
                // renderWall('#FFFF00', index, (50/ray.dist));
            } else {
                staticData.ui.plot.ctx.drawImage(
                    staticData.textures,
                    (ray.y - Math.floor(ray.y))*64,
                    192,
                    1,
                    64,
                    index,
                    (150 - 64/ray.dist),
                    1,
                    2*(64/ray.dist)
                );
                // renderWall('#CCCC00', index, (50/ray.dist));
            }
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
