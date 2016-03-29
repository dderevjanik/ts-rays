import IPoint from './Interfaces/IPoint';
import IPlayer from './Interfaces/IPlayer';
import {calcNewPoint} from './Trigonometry.ts';

/**
 * Return player with new position
 * @param {IPlayer} player - to move
 * @return {IPlayer} player with new position
 */
export const movePlayer = (player: IPlayer): IPlayer => {
    const moveVector: number = player.speed * player.moveSpeed;
    const newRot: number = player.rot + player.dir * player.rotSpeed;
    const {x, y}: IPoint = calcNewPoint(player.x, player.y, newRot, moveVector);
    return {
        x: x,
        y: y,
        dir: player.dir,
        rot: newRot,
        speed: player.speed,
        moveSpeed: player.moveSpeed,
        rotSpeed: player.rotSpeed
    };
};
