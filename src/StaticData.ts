import {IStaticData} from './Interfaces/all';

export const staticData: IStaticData = {
    ui: {
        plot: {
            element: (<HTMLCanvasElement> document.getElementById('pseudo3d')),
            ctx: (<HTMLCanvasElement> document.getElementById('pseudo3d')).getContext('2d')
        },
        minimap: {
            element: (<HTMLCanvasElement> document.getElementById('canvas')),
            ctx: (<HTMLCanvasElement> document.getElementById('canvas')).getContext('2d'),
            scale: 20,
            rayLength: 200
        },
    },
    textures: (<HTMLImageElement> document.getElementById('textures')),
    rays: 256,
    maxFps: 30
};

export default staticData;
