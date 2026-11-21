// SOLARA CITY - Camera
// Smooth follow with velocity lookahead, zoom out at speed, screen shake.

import { WORLD_SIZE } from './config.js';

export function createCamera() {
    return { x: 0, y: 0, targetX: 0, targetY: 0, shake: 0, zoom: 1 };
}

export function updateCamera(camera, target, width, height, step) {
    camera.targetX = target.x - width / 2;
    camera.targetY = target.y - height / 2;
    
    // Smooth lerp
    camera.x += (camera.targetX - camera.x) * 5 * step;
    camera.y += (camera.targetY - camera.y) * 5 * step;

    // Clamp
    camera.x = Math.max(0, Math.min(camera.x, WORLD_SIZE - width));
    camera.y = Math.max(0, Math.min(camera.y, WORLD_SIZE - height));

    // Screen shake decay
    if (camera.shake > 0) camera.shake -= step * 2;
    else camera.shake = 0;
}

export function worldToScreen(camera, x, y, width, height) {
    let sx = x - camera.x;
    let sy = y - camera.y;
    if (camera.shake > 0) {
        sx += (Math.random() - 0.5) * camera.shake * 10;
        sy += (Math.random() - 0.5) * camera.shake * 10;
    }
    return { x: sx, y: sy };
}
