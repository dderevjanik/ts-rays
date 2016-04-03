import IPoint from './IPoint';

export interface IPlayer extends IPoint{
    dir: number;
    rot: number;
    speed: number;
    moveSpeed: number;
    rotSpeed: number;
    minimapClr: string;
    fov: number;
};

export default IPlayer;
