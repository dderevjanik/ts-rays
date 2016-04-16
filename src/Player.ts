import {IPlayer, IPoint, ICell} from './Interfaces/all';
import {calcNewPoint} from './Trigonometry.ts';
import Coord from './Coordinate';

export const movePlayer = (player: IPlayer, map: Array<Array<number>>): IPlayer => {
    const moveVector: number = (player.speed * player.moveSpeed);
    const newRot: number = player.rot + (player.dir * player.rotSpeed);
    const {x, y}: IPoint = calcNewPoint(player.x, player.y, newRot, moveVector);
    const {row, col}: ICell = Coord.getCPos(x, y);
    return (map[row][col] === 0)
    ? {
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
    }
    : {
        x: player.x,
        y: player.y,
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
