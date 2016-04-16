import IPlayer from './IPlayer';

export interface IGameState {
    map: Array<Array<number>>;
    player: IPlayer;
};

export default IGameState;
