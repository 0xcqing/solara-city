// SOLARA CITY - City Generation
// Generates a 140x140 tile map with roads, districts, and pseudo-3D buildings.

import { CITY_SIZE, TILE_SIZE, DISTRICTS } from './config.js';
import { randInt, randPick } from './random.js';

export const TILE_TYPES = {
    EMPTY: 0,
    ROAD: 1,
    SIDEWALK: 2,
    BUILDING: 3,
    GRASS: 4,
    SAND: 5,
    WATER: 6,
    PARK: 7,
};

export function generateCity(seed, random) {
    const tiles = new Uint8Array(CITY_SIZE * CITY_SIZE);
    const districts = new Uint8Array(CITY_SIZE * CITY_SIZE);
    const buildings = [];
    const spawnPoints = { sidewalk: [], parking: [], payphone: [] };

    // 1. Initialize terrain
    for (let i = 0; i < tiles.length; i++) {
        const x = i % CITY_SIZE;
        const y = Math.floor(i / CITY_SIZE);
        if (y > CITY_SIZE - 10) tiles[i] = TILE_TYPES.WATER;
        else if (y > CITY_SIZE - 14) tiles[i] = TILE_TYPES.SAND;
        else tiles[i] = TILE_TYPES.GRASS;
    }

    // 2. Road Grid
    const xRoads = [];
    let curX = 8;
    while (curX < CITY_SIZE - 8) {
        xRoads.push(curX);
        curX += randInt(random, 12, 18);
    }
    const yRoads = [];
    let curY = 8;
    while (curY < CITY_SIZE - 20) {
        yRoads.push(curY);
        curY += randInt(random, 12, 18);
    }

    for (const x of xRoads) {
        for (let y = 0; y < CITY_SIZE - 14; y++) {
            tiles[y * CITY_SIZE + x] = TILE_TYPES.ROAD;
            tiles[y * CITY_SIZE + x - 1] = TILE_TYPES.SIDEWALK;
            tiles[y * CITY_SIZE + x + 1] = TILE_TYPES.SIDEWALK;
        }
    }
    for (const y of yRoads) {
        for (let x = 0; x < CITY_SIZE; x++) {
            tiles[y * CITY_SIZE + x] = TILE_TYPES.ROAD;
            if (y > 0) tiles[(y - 1) * CITY_SIZE + x] = TILE_TYPES.SIDEWALK;
            if (y < CITY_SIZE - 1) tiles[(y + 1) * CITY_SIZE + x] = TILE_TYPES.SIDEWALK;
        }
    }

    // 3. Districts and Buildings
    for (let i = 0; i < xRoads.length - 1; i++) {
        for (let j = 0; j < yRoads.length - 1; j++) {
            const x1 = xRoads[i] + 2;
            const x2 = xRoads[i+1] - 3;
            const y1 = yRoads[j] + 2;
            const y2 = yRoads[j+1] - 3;

            if (x2 < x1 || y2 < y1) continue;

            const centerX = (x1 + x2) / 2;
            const centerY = (y1 + y2) / 2;
            let distKey = 'OLD_TOWN';
            if (centerX < 50 && centerY < 50) distKey = 'HARBOR';
            else if (centerX > 90 && centerY < 60) distKey = 'SUNVIEW_HEIGHTS';
            else if (centerX > 40 && centerX < 100 && centerY < 90) distKey = 'DOWNTOWN';
            else if (centerX > 100 && centerY > 90) distKey = 'MIRADOR_PARK';

            if (distKey === 'MIRADOR_PARK') {
                for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) tiles[y * CITY_SIZE + x] = TILE_TYPES.PARK;
            } else {
                buildings.push({
                    x: x1 * TILE_SIZE, y: y1 * TILE_SIZE,
                    w: (x2 - x1 + 1) * TILE_SIZE, h: (y2 - y1 + 1) * TILE_SIZE,
                    height: (distKey === 'DOWNTOWN' ? randInt(random, 4, 12) : randInt(random, 1, 3)) * TILE_SIZE,
                    district: distKey
                });
            }
        }
    }

    // 4. Landmarks
    const landmarks = [
        { name: 'Solara Tower', x: 70, y: 40, w: 4, h: 4, height: 20 },
        { name: 'Police HQ', x: 20, y: 20, w: 3, h: 3, height: 4 },
        { name: 'Grand Marina', x: 70, y: 120, w: 8, h: 4, height: 2 },
        { name: 'Sunview Mall', x: 110, y: 30, w: 6, h: 4, height: 3 },
        { name: 'Casino El Rey', x: 40, y: 60, w: 5, h: 4, height: 6 },
        { name: 'General Hospital', x: 10, y: 100, w: 4, h: 3, height: 3 },
    ];
    for (const lm of landmarks) {
        buildings.push({ ...lm, x: lm.x * TILE_SIZE, y: lm.y * TILE_SIZE, w: lm.w * TILE_SIZE, h: lm.h * TILE_SIZE, height: lm.height * TILE_SIZE });
    }

    return { tiles, buildings, districts, spawnPoints };
}

export function getTile(city, tx, ty) {
    if (tx < 0 || tx >= CITY_SIZE || ty < 0 || ty >= CITY_SIZE) return TILE_TYPES.WATER;
    return city.tiles[Math.floor(ty) * CITY_SIZE + Math.floor(tx)];
}
