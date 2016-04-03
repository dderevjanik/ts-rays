import IPoint from './IPoint';

export interface IRenderActor extends IPoint {
    minimapClr: string;
    rot: number;
    vect: number;
};

export default IRenderActor;
