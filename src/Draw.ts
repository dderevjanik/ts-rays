import Minimap from './MiniMap';
import IGameState from './Interfaces/IGameState';
import {gameState} from './GameState';

/**
 * Draw game state
 * @param {IGameState} gameState - to draw
 */
export const drawState = (gameState: IGameState): void => {
    Minimap.drawMinimap(gameState.map, 20, <HTMLCanvasElement> document.getElementById('canvas'));
	Minimap.drawPlayer(gameState.player, 20, <HTMLCanvasElement> document.getElementById('canvas'));
};

export default {
	drawState: drawState
};
