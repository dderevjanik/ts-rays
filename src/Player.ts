import {IPlayer, IPoint} from './Interfaces/all';
import {calcNewPoint} from './Trigonometry.ts';

export const movePlayer = (player: IPlayer): IPlayer => {
    const moveVector: number = (player.speed * player.moveSpeed);
    const newRot: number = player.rot + (player.dir * player.rotSpeed);
    const {x, y}: IPoint = calcNewPoint(player.x, player.y, newRot, moveVector);
    return {
        x: x,
        y: y,
        dir: player.dir,
        rot: newRot,
        speed: player.speed,
        moveSpeed: player.moveSpeed,
        rotSpeed: player.rotSpeed,
        minimapClr: player.minimapClr,
        fov: player.fov,
        showFov: player.showFov
    };
};
