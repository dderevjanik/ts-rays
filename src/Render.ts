import Draw from './Draw';
import {castRays} from './Logic';
import {IActor, IRay, IPoint, IGameState, IPlayer} from './Interfaces/all';
import {staticData} from './StaticData';
import {calcNewPoint} from './Trigonometry';

export const drawLineOnMMap: (color: string, sX: number, xY: number, x: number, y: number) => void
    = Draw.drawLine.bind(this, staticData.ui.minimap.ctx, staticData.ui.minimap.scale);

const renderRay = (ctx: CanvasRenderingContext2D, scale: number, length: number, color: string, sX: number, sY: number, rot: number): void => {
    const {x, y}: IPoint = calcNewPoint(sX, sY, rot, length);
    drawLineOnMMap(color, sX, sY, x, y);
};

const renderRayOnMMap: (color: string, x: number, y: number, rot: number) => void
    = renderRay.bind(this, staticData.ui.minimap.ctx, staticData.ui.minimap.scale, staticData.ui.minimap.rayLength);

export const renderPoint
    = Draw.drawPoint.bind(this, staticData.ui.minimap.ctx, staticData.ui.minimap.scale, 10);

export const renderWall = (color: string, stripX: number, h: number) => {
    // Draw.drawLine(staticData.ui.plot.ctx, 1, color, stripX, 150 - h, stripX, 150 + h);
    Draw.drawRect(staticData.ui.plot.ctx, 1, color, stripX, 150 - h, 1, 2*h);
};

export const renderText: (textSize: number, color: string, x: number, y: number, text: string) => void
    = Draw.drawText.bind(this, staticData.ui.minimap.ctx, staticData.ui.minimap.scale)

const renderMinimap = (ctx: CanvasRenderingContext2D, scale: number, map: Array<Array<number>>, actors: Array<IActor>): void => {
    const renderBlockOnMMap: (color: string, c: number, r: number) => void
        = Draw.drawBlock.bind(this, ctx, scale);
    const renderMiniBlockOnMMap: (color: string, c: number, r: number) => void
        = Draw.drawMiniBlock.bind(this, ctx, scale);
    const actorsToRender: Array<IActor> = actors.filter((actor: IActor) => true);
    const actorsToRenderRC: Array<IActor> = actors.filter((actor: IActor) => actor.showFov === true);
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
    actorsToRender.forEach((actor: IActor) => {
        // renderMiniBlockOnMMap(actor.minimapClr, actor.x, actor.y);
        renderRayOnMMap('red', actor.x, actor.y, actor.rot);
    });
    actorsToRenderRC.forEach((actor: IActor) => {
        castRays(map, actor.x, actor.y, actor.rot, actor.fov, staticData.rays).forEach((ray: IRay) => {
            // drawLineOnMMap('green', ray.x, ray.y, ray.distX, ray.distY);
            // drawLineOnMMap('yellow', actor.x, actor.y, ray.hInters[ray.hInters.length - 1][0], ray.hInters[ray.hInters.length - 1][1]);
            // drawLineOnMMap('purple', actor.x, actor.y, ray.vInters[ray.vInters.length - 1][0], ray.vInters[ray.vInters.length - 1][1]);
        });
    });
};

const renderMinimapOnCtx: (map: Array<Array<number>>, actors: Array<IActor>) => void
    = renderMinimap.bind(this, staticData.ui.minimap.ctx, staticData.ui.minimap.scale);

export const renderState = (gameState: IGameState): void => {
    const player: IPlayer = gameState.player;
    const renderActors: Array<IActor> = [player];
    staticData.ui.minimap.ctx.clearRect(0, 0, staticData.ui.minimap.element.width, staticData.ui.minimap.element.height);
    staticData.ui.plot.ctx.clearRect(0, 0, staticData.ui.plot.element.width, staticData.ui.plot.element.height);
    staticData.ui.plot.ctx.fillStyle = "grey";
    staticData.ui.plot.ctx.fillRect(0, 150, 300, 300);
    renderMinimapOnCtx(gameState.map, renderActors);
};

export default {
    renderState: renderState

};