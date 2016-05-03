export interface IPlot {
    element: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

};

export interface IMiniMapUI {
    element: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    scale: number;
    rayLength: number;
};

export interface IUI {
    plot: IPlot;
    minimap: IMiniMapUI;
};

export interface IStaticData {
    ui: IUI;
    rays: number;
    maxFps: number;
    textures: HTMLImageElement;
}

export default IStaticData;