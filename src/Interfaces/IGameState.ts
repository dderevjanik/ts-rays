import IPlayer from './IPlayer';

export interface IMiniMapUI {
    ctx: CanvasRenderingContext2D;
    scale: number;
};

export interface IUI {
    minimap: IMiniMapUI;
};

export interface IGameState {
    map: Array<Array<number>>;
    player: IPlayer;
    ui: IUI;
    rays: number;
    maxFps: number;
};

export default IGameState;
