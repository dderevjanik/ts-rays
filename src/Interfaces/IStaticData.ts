export interface IMiniMapUI {
    element: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    scale: number;
    rayLength: number;
};

export interface IUI {
    minimap: IMiniMapUI;
};

export interface IStaticData {
    ui: IUI;
    rays: number;
    maxFps: number;
}

export default IStaticData;