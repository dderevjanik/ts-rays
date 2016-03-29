import IPlayer from './IPlayer';

interface IGameState {
    map: Array<Array<number>>;
    player: IPlayer;
    maxFps: number;
};

export default IGameState;
