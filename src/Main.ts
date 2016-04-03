import {renderState} from './Render';
import {gameState} from './GameState';
import {nextState} from './Logic';
import IGameState from './Interfaces/IGameState';
import IInputs from './Interfaces/IInputs';

// Mut

let keyPressed: number = null;
let keyDown: number = null;
let keyUp: number = null;
let tick: number = 0;

document.onkeypress = (event: KeyboardEvent): void => {
    event = event || <KeyboardEvent> window.event;
    keyPressed = event.keyCode;
};

document.onkeydown = (event: KeyboardEvent): void => {
    event = event || <KeyboardEvent> window.event;
    keyDown = event.keyCode;
};

document.onkeyup = (event: KeyboardEvent): void => {
    event = event || <KeyboardEvent> window.event;
    keyUp = event.keyCode;
};

const clearInputs = (): void => {
    keyPressed = null;
    keyDown = null;
    keyUp = null;
};

const makeTick = (gameState: IGameState): void => {
    tick++;
    console.log('.');
    renderState(gameState);
    const newState = nextState(gameState, {
        tick: tick,
        keyPress: keyPressed,
        keyDown: keyDown,
        keyUp: keyUp
    });
    clearInputs();
    setTimeout(() => {
        makeTick(newState);
    }, 1000 / gameState.maxFps);
};

console.log(gameState);
makeTick(gameState);
