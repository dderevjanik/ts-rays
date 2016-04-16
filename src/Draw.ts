import {IPoint, ICell, IGameState} from './Interfaces/all';
import {gameState} from './GameState';

export const drawBlock = (ctx: CanvasRenderingContext2D, scale: number, color: string, x: number, y: number): void => {
    ctx.fillStyle = color;
    ctx.fillRect(
        x * scale,
        y * scale,
        scale, scale
    );
};

export const drawMiniBlock = (ctx: CanvasRenderingContext2D, scale: number, color: string, x: number, y: number): void => {
    ctx.fillStyle = color;
    ctx.fillRect(
        (x * scale) + (scale * 0.2),
        (y * scale) + (scale * 0.2),
        (scale * 0.6), (scale * 0.6)
    );
}

export const drawLine = (ctx: CanvasRenderingContext2D, scale: number, color: string, x1: number, y1: number, x2: number, y2: number): void => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1 * scale, y1 * scale);
    ctx.lineTo(x2 * scale, y2 * scale);
    ctx.stroke();
};

export default {
    drawBlock: drawBlock,
    drawMiniBlock: drawMiniBlock,
    drawLine: drawLine
};
