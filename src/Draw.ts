import {IPoint, ICell, IGameState} from './Interfaces/all';
import {gameState} from './GameState';

export const drawPoint = (ctx: CanvasRenderingContext2D, scale: number, size: number, color: string, x: number, y: number): void => {
    const half: number = (size / 2);
    ctx.fillStyle = color;
    ctx.fillRect(
        (x * scale) - half,
        (y * scale) - half,
        half,
        half
    )
};

export const drawRect = (ctx: CanvasRenderingContext2D, scale: number, color: string, x: number, y: number, w: number, h: number): void => {
    ctx.fillStyle = color;
    ctx.fillRect(
        x * scale,
        y * scale,
        w * scale,
        h * scale
    );
};

export const drawText = (ctx: CanvasRenderingContext2D, scale: number, textSize: number, color: string, x: number, y: number, text: string): void => {
    ctx.font = 'sans-serif';
    ctx.fillStyle = color;
    ctx.fillText(text, x * scale, y * scale);
};

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
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1 * scale, y1 * scale);
    ctx.lineTo(x2 * scale, y2 * scale);
    ctx.stroke();
};

export default {
    drawBlock: drawBlock,
    drawMiniBlock: drawMiniBlock,
    drawText: drawText,
    drawLine: drawLine,
    drawPoint: drawPoint,
    drawRect: drawRect
};
