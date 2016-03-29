import {drawState} from './Draw';
import {gameState} from './GameState';
import {movePlayer} from './Player';
import IGameState from './Interfaces/IGameState';
import IInputs from './Interfaces/IInputs';

/**
 * Create next State
 * @param {IGameState} gameState - current state
 * @param {IInputs} inputs - all input which affect gameState
 * @return {IGameState} next game state
 */
const nextState = (gameState: IGameState, inputs: IInputs): IGameState => {
    return gameState;
};

// Mut

let keyPressed: number = null;
let tick: number = 0;

document.onkeydown = (event: KeyboardEvent): void => {
    event = event || <KeyboardEvent> window.event;
    keyPressed = event.keyCode;
};

const clearInputs = (): void => {
    keyPressed = null;
};

const makeTick = (gameState: IGameState): void => {
    tick++;
    console.log('.');
    drawState(gameState);
    const newState = nextState(gameState, {
        tick: tick,
        keyPress: keyPressed,
        keyDown: null,
        keyUp: null
    });
    clearInputs();
    setTimeout(() => {
        makeTick(newState);
    }, 1000 / gameState.maxFps);
};

makeTick(gameState);
