import {IPoint, ICell, IGameState} from './Interfaces/all';
import {gameState} from './GameState';

export const drawBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string): void => {
    ctx.fillStyle = color;
    ctx.fillRect(
        x * scale,
        y * scale,
        scale, scale
    );
};

export const drawMiniBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string): void => {
    ctx.fillStyle = color;
    ctx.fillRect(
        (x * scale) + (scale * 0.2),
        (y * scale) + (scale * 0.2),
        (scale * 0.6), (scale * 0.6)
    );
}

export const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, scale: number, color: string): void => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1 * 20, y1 * 20);
    ctx.lineTo(x2 * 20, y2 * 20);
    ctx.stroke();
};

export default {
    drawBlock: drawBlock,
    drawMiniBlock: drawMiniBlock,
    drawLine: drawLine
};
