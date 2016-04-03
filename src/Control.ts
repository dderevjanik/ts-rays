import {IGameState, IInputs} from './Interfaces/all';

export const processControl = (gameState: IGameState, inputs: IInputs): IGameState => {
    gameState.player.speed = 0;
    gameState.player.dir = 0;
    switch(inputs.keyDown) {
        case 38:
            gameState.player.speed = 1;
            break;
        case 40:
            gameState.player.speed = -1;
            break;
        case 37:
            gameState.player.dir = -1;
            break;
        case 39:
            gameState.player.dir = 1;
            break;
    }
    return gameState;
};

export default processControl;
