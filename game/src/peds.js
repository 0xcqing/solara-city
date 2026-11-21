// SOLARA CITY - Peds
// Wander sidewalks, cross at corners, flee gunfire, respawn.

import { TILE_SIZE, CITY_SIZE } from './config.js';
import { randInt, randRange } from './random.js';

export function createPed(x, y) {
    return {
        x, y, vx: 0, vy: 0,
        health: 20, state: 'wander',
        walkFrame: 0, walkTime: 0,
    };
}

export function updatePeds(peds, player, step) {
    for (const ped of peds) {
        if (ped.state === 'wander') {
            ped.vx = randRange(Math.random, -50, 50);
            ped.vy = randRange(Math.random, -50, 50);
        } else if (ped.state === 'flee') {
            const dx = ped.x - player.x;
            const dy = ped.y - player.y;
            const mag = Math.hypot(dx, dy);
            ped.vx = (dx / mag) * 200;
            ped.vy = (dy / mag) * 200;
        }
        ped.x += ped.vx * step;
        ped.y += ped.vy * step;
    }
}
