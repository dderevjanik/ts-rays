import IPlayer from './Interfaces/IPlayer';

/**
 * Draw block on minimap
 * @param {CanvasRenderingContext2D} ctx - draw block on this ctx
 * @param {number} x - x position
 * @param {number} y - y position
 * @param {number} scale - use scale
 * @param {string} color - which color
 */
const drawBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string): void => {
    ctx.fillStyle = color;
    ctx.fillRect(
        x * scale,
        y * scale,
        scale, scale
    );
};

/**
 * Draw mini-block on minimap
 * @param {CanvasRenderingContext2D} ctx - draw block on this ctx
 * @param {number} x - x position
 * @param {number} y - y position
 * @param {number} scale - use scale
 * @param {string} color - which color
 */
const drawMiniBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string): void => {
    ctx.fillStyle = color;
    ctx.fillRect(
        (x * scale) + (scale * 0.2),
        (y * scale) + (scale * 0.2),
        (scale * 0.6), (scale * 0.6)
    );
}

/**
 * Draw minimap on canvas
 * @param {Array<Array<number>>} map - map to draw 
 * @param {number} scale - minimap scale 
 * @param {HTMLCanvasElement} element - on which element to draw
 */
export const drawMinimap = (map: Array<Array<number>>, scale: number, element: HTMLCanvasElement): void => {
    const ctx: CanvasRenderingContext2D = element.getContext('2d');
    map.forEach((row: Array<number>, r: number) => {
        row.forEach((cell: number, c: number) => {
            if (cell === 1) {
                drawBlock(ctx, c, r, scale, 'rgb(200, 200, 200)');
            } else if (cell === 2) {
                drawBlock(ctx, c, r, scale, 'grey');
            }
        });
    });
};

/**
 * Draw minimap on canvas
 * @param {IPlayer} player - render 
 * @param {number} scale - minimap scale 
 * @param {HTMLCanvasElement} element - on which element to draw
 */
export const drawPlayer = (player: IPlayer, scale: number, element: HTMLCanvasElement): void => {
    const ctx: CanvasRenderingContext2D = element.getContext('2d');
    drawMiniBlock(ctx, player.x, player.y, scale, 'red');
};

export default {
    drawMinimap: drawMinimap,
    drawPlayer: drawPlayer
};
