import Draw from './Draw';
import {castRays} from './Logic';
import {IRenderActor, IRay, IPoint, IGameState, IPlayer} from './Interfaces/all';
import {calcNewPoint} from './Trigonometry';

const renderMinimap = (ctx: CanvasRenderingContext2D, scale: number, map: Array<Array<number>>, actors: Array<IRenderActor>): void => {
    map.forEach((row: Array<number>, r: number) => {
        row.forEach((cell: number, c: number) => {
            if (cell === 1) {
                Draw.drawBlock(ctx, c, r, scale, 'rgb(200, 200, 200)');
            } else if (cell === 2) {
                Draw.drawBlock(ctx, c, r, scale, 'grey');
            } else {
                Draw.drawBlock(ctx, c, r, scale, 'black');
            }
        });
    });
    actors.forEach((actor: IRenderActor) => {
        Draw.drawMiniBlock(ctx, actor.x, actor.y, scale, actor.minimapClr);
        renderRay(ctx, actor.x, actor.y, actor.rot, actor.vect, 200);
    });
};

const renderRay = (ctx: CanvasRenderingContext2D, sX: number, sY: number, rot: number, vect: number, length: number): void => {
    const {x, y}: IPoint = calcNewPoint(sX, sY, rot, vect + length);
    Draw.drawLine(ctx, sX, sY, x, y, 20, 'red');
};

export const renderState = (gameState: IGameState): void => {
    const player: IPlayer = gameState.player;
    const renderActors: Array<IRenderActor> = [{
        x: player.x,
        y: player.y,
        rot: (player.rot + (player.dir * player.rotSpeed)),
        minimapClr: 'red',
        vect: (player.speed * player.moveSpeed)
    }];
    renderMinimap(gameState.ui.minimap.ctx, 20, gameState.map, renderActors);
    castRays(player.x, player.y, (player.rot + (player.dir * player.rotSpeed)), player.fov, 50).forEach((ray: IRay) => {
        Draw.drawLine(gameState.ui.minimap.ctx,
                    ray.x, ray.y,
                    ray.distX, ray.distY,
                    20, 'green');
    });
};

export default {
    renderState: renderState
};
