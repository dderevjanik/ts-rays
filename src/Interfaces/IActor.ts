import IPoint from './IPoint';

export interface IActor extends IPoint {
    dir: number;
    speed: number;
    moveSpeed: number;
    rotSpeed: number;
    minimapClr: string;
    rot: number;
    fov: number;
    showFov: boolean;
}

export default IActor;