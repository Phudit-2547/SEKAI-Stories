import * as PIXI from "pixi.js";

export interface IFilter {
    container: PIXI.Container;
    flashback?: boolean;
    sick?: { container?: PIXI.Container | null; show?: boolean };
    droop?: { container?: PIXI.Container | null; show?: boolean };
    pov?: {
        show?: boolean;
        zoom: number;
        x: number;
        y: number;
    };
}
