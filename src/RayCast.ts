import {IRay, IQuadrant, IPoint} from './Interfaces/all';
import {intersections} from './Primitives';
import Coordinate from './Coordinate';
import {calcNewPoint, getQuadrant, normalizeAngle} from './Trigonometry';
import {repeat} from './Utils';
import {renderPoint, drawLineOnMMap, renderText} from './Render';

type testfunction = (row: number, cell: number) => boolean;

export const castRay = (map: Array<Array<number>>, x: number, y: number, test: testfunction, rot: number): IRay => {
    const rayAngle: number = normalizeAngle(rot);
    const angleSin: number = Math.sin(rayAngle);
    const angleCos: number = Math.cos(rayAngle);
    const quadrant: IQuadrant = getQuadrant(rot);

    // current cell position in map
    let cell: number = Math.floor(x);
    let row: number = Math.floor(y);

    const hSlope: number = (angleSin / angleCos);
    const vSlope: number = (angleCos / angleSin);

    const stepX: number = (quadrant.right) ? 1 : -1;
    const hdY: number = stepX * hSlope;

    const stepY: number = (quadrant.top) ? -1 : 1;
    const vdX: number = stepY * vSlope;

    // horizontal hit
    let hHitX: number = (quadrant.right) ? Math.ceil(x) : cell;
    let hHitY: number = y + ((hHitX - x) * hSlope);
        // renderPoint('green', hHitX, hHitY);
        // renderText(10, 'green', hHitX, hHitY, 'hHit');

    // vertical hit
    let vHitY: number = (quadrant.top) ? row : Math.ceil(y);
    let vHitX: number = x + ((vHitY - y) * vSlope);
        // renderPoint('red', vHitX, vHitY);
        // renderText(10, 'red', vHitX, vHitY, 'vHit');

    // distance from current point to nearest x || y side
    let sideDistX: number = Math.sqrt((hHitX - x)**2 + (hHitY - y)**2);
    let sideDistY: number = Math.sqrt((vHitX - x)**2 + (vHitY - y)**2);

    // distance from x || y  side to another x || y side
    const deltaDistX: number = Math.sqrt(stepX**2 + hdY**2);
    const deltaDistY: number = Math.sqrt(vdX**2 + stepY**2);

    let side: number; // NS or EcS wall hit ?
    let i: number = 1;
    let hit: number = 0;
    while(test(row, cell)) {
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            hHitX += stepX;
            hHitY += hdY;
            cell += stepX;
            side = 0;
                // renderPoint('green', hHitX, hHitY);
                // renderText(10, 'white', hHitX, hHitY, '' + i);
        } else {
            sideDistY += deltaDistY;
            vHitX += vdX;
            vHitY += stepY;
            row += stepY;
            side = 1;
                // renderPoint('red', vHitX, vHitY);
                // renderText(10, 'white', vHitX, vHitY, '' + i);
        }
        i += 1;
        // renderPoint('white', cell + 0.6, row + 0.6);
        // renderText(10, 'white', cell, row, '' + i);
    }

    if (side === 1) {
        drawLineOnMMap('green', x, y, vHitX - vdX, vHitY - stepY);
    } else {
        drawLineOnMMap('green', x, y, hHitX - stepX, hHitY - hdY);
    }

    return {
        dist: (!side) ? (sideDistX - deltaDistX) : (sideDistY - deltaDistY),
        side: side,
        x: (side) ? (vHitX - vdX) : (hHitX - stepX),
        y: (side) ? (vHitY - stepY) : (vHitY - hdY),
        row: row,
        cell: cell
    };
};

export const castRays = (map: Array<Array<number>>, x: number, y: number, rot: number, fov: number, count: number, test: testfunction): Array<IRay> => {
    const castRayFromPosition: (rot: number) => IRay
        = castRay.bind(this, map, x, y, test);
    const dRot: number = (Math.PI / (180 / fov)) / count; // TODO: pre-calculate values
    const center: number = rot - dRot * (count / 2) + (dRot / 2); // TODO: pre-calculate values
    const rays: Array<IRay> = repeat(count, (index): IRay =>
        castRayFromPosition(index * dRot + center));
    return rays;
};

export default {
    castRay: castRay,
    castRays: castRays
};
