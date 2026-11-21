// SOLARA CITY - Player logic
// Handles movement, combat state, and vehicle interactions.

import { PLAYER, STEP } from './config.js';

export function createPlayer() {
    return {
        x: 70 * 48, y: 40 * 48,
        angle: 0, vx: 0, vy: 0,
        health: 100, armor: 0, cash: 100,
        weapon: 0, // 0: fists, 1: pistol, 2: SMG
        ammo: [Infinity, 20, 50],
        vehicle: null,
        walkFrame: 0, walkTime: 0,
        isSprinting: false, isPunching: 0, isShooting: 0,
        state: 'ALIVE', // ALIVE, WASTED, BUSTED
    };
}

export function updatePlayer(player, input, city, vehicles, step) {
    if (player.state !== 'ALIVE') return;

    if (player.vehicle) {
        player.x = player.vehicle.x;
        player.y = player.vehicle.y;
        player.angle = player.vehicle.angle;
        if (input.wasJustPressed('KeyE')) {
            player.vehicle.driver = null;
            player.x += Math.cos(player.angle + Math.PI/2) * 50;
            player.y += Math.sin(player.angle + Math.PI/2) * 50;
            player.vehicle = null;
        }
        return;
    }

    let dx = 0, dy = 0;
    if (input.isPressed('KeyW')) dy -= 1;
    if (input.isPressed('KeyS')) dy += 1;
    if (input.isPressed('KeyA')) dx -= 1;
    if (input.isPressed('KeyD')) dx += 1;

    const sprinting = input.isPressed('ShiftLeft');
    const speed = sprinting ? PLAYER.sprintSpeed : PLAYER.walkSpeed;
    if (dx !== 0 || dy !== 0) {
        const mag = Math.sqrt(dx * dx + dy * dy);
        player.vx = (dx / mag) * speed;
        player.vy = (dy / mag) * speed;
        player.angle = Math.atan2(dy, dx);
        player.walkTime += step;
        if (player.walkTime > 0.2) { player.walkFrame = 1 - player.walkFrame; player.walkTime = 0; }
    } else {
        player.vx *= 0.8; player.vy *= 0.8;
        if (Math.abs(player.vx) < 1) player.vx = 0;
        if (Math.abs(player.vy) < 1) player.vy = 0;
    }

    player.x += player.vx * step;
    player.y += player.vy * step;

    if (input.wasJustPressed('KeyE')) {
        let nearest = null;
        let minDist = 80;
        for (const v of vehicles) {
            const d = Math.hypot(v.x - player.x, v.y - player.y);
            if (d < minDist) { minDist = d; nearest = v; }
        }
        if (nearest) { player.vehicle = nearest; nearest.driver = player; }
    }

    if (player.isPunching > 0) player.isPunching -= step;
    if (input.wasJustPressed('KeyF') && player.isPunching <= 0) player.isPunching = 0.3;
}
