import {IStaticData} from './Interfaces/all';

export const staticData: IStaticData = {
    ui: {
        minimap: {
            element: (<HTMLCanvasElement> document.getElementById('canvas')),
            ctx: (<HTMLCanvasElement> document.getElementById('canvas')).getContext('2d'),
            scale: 20,
            rayLength: 200
        }
    },
    rays: 256,
    maxFps: 30
};

export default staticData;
