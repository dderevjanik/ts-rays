import Draw from './Draw';
import {castRays} from './Logic';
import {IRenderActor, IRay, IPoint, IGameState, IPlayer} from './Interfaces/all';
import {staticData} from './StaticData';
import {calcNewPoint} from './Trigonometry';

const drawLineOnMMap = Draw.drawLine.bind(this, staticData.ui.minimap.ctx, staticData.ui.minimap.scale);

const renderRay = (ctx: CanvasRenderingContext2D, scale: number, length: number, sX: number, sY: number, rot: number, vect: number): void => {
    const {x, y}: IPoint = calcNewPoint(sX, sY, rot, vect + length);
    drawLineOnMMap('red', sX, sY, x, y);
};

const renderRayOnMMap = renderRay.bind(this, staticData.ui.minimap.ctx,
                                            staticData.ui.minimap.scale,
                                            staticData.ui.minimap.rayLength);

const renderMinimap = (ctx: CanvasRenderingContext2D, scale: number, map: Array<Array<number>>, actors: Array<IRenderActor>): void => {
    const renderBlockOnMMap = Draw.drawBlock.bind(this, ctx, scale);
    const renderMiniBlockOnMMap = Draw.drawMiniBlock.bind(this, ctx, scale);
    map.forEach((row: Array<number>, r: number) => {
        row.forEach((cell: number, c: number) => {
            if (cell === 1) {
                renderBlockOnMMap('rgb(200, 200, 200)', c, r);
            } else if (cell === 2) {
                renderBlockOnMMap('grey', c, r);
            } else {
                renderBlockOnMMap('black', c, r);
            }
        });
    });
    actors.forEach((actor: IRenderActor) => {
        renderMiniBlockOnMMap(actor.minimapClr, actor.x, actor.y);
        renderRayOnMMap(actor.x, actor.y, actor.rot, actor.vect, 200);
    });
};

const renderMinimapOnCtx = renderMinimap.bind(this, staticData.ui.minimap.ctx, staticData.ui.minimap.scale);

export const renderState = (gameState: IGameState): void => {
    const player: IPlayer = gameState.player;
    const renderActors: Array<IRenderActor> = [{
        x: player.x,
        y: player.y,
        rot: player.rot,
        minimapClr: 'red',
        vect: (player.speed * player.moveSpeed)
    }];
    staticData.ui.minimap.ctx.clearRect(0, 0, staticData.ui.minimap.element.width, staticData.ui.minimap.element.height);
    renderMinimapOnCtx(gameState.map, renderActors);
    castRays(player.x, player.y, player.rot, player.fov, staticData.rays).forEach((ray: IRay) => {
        drawLineOnMMap('green', ray.x, ray.y, ray.distX, ray.distY);
    });
};

export default {
    renderState: renderState
};
