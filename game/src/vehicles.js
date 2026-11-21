// SOLARA CITY - Vehicles
// Arcade physics and Traffic AI for various vehicle types.

import { VEHICLE_TYPES, STEP, CITY_SIZE, TILE_SIZE } from './config.js';
import { randInt } from './random.js';

export function createVehicle(typeIdx, x, y, angle = 0) {
    const type = VEHICLE_TYPES[typeIdx];
    return {
        typeIdx, name: type.name, color: type.color,
        x, y, angle, vx: 0, vy: 0, speed: 0,
        maxSpeed: type.speed, accel: type.accel,
        width: type.width, length: type.length,
        driver: null, // null, 'ai', or player object
        health: 100,
    };
}

export function updateVehicle(vehicle, input, step) {
    if (vehicle.driver && vehicle.driver !== 'ai') {
        let targetSpeed = 0;
        if (input.isPressed('KeyW')) targetSpeed = vehicle.maxSpeed;
        else if (input.isPressed('KeyS')) targetSpeed = -vehicle.maxSpeed / 2;

        const turnSpeed = 0.05 * (Math.abs(vehicle.speed) / 100 + 0.5);
        if (input.isPressed('KeyA')) vehicle.angle -= turnSpeed;
        else if (input.isPressed('KeyD')) vehicle.angle += turnSpeed;

        if (targetSpeed !== 0) vehicle.speed += (targetSpeed - vehicle.speed) * vehicle.accel * step;
        else vehicle.speed *= 0.98;
    } else if (vehicle.driver === 'ai') {
        vehicle.speed = vehicle.maxSpeed * 0.4;
    } else {
        vehicle.speed *= 0.9;
    }

    vehicle.vx = Math.cos(vehicle.angle) * vehicle.speed;
    vehicle.vy = Math.sin(vehicle.angle) * vehicle.speed;
    vehicle.x += vehicle.vx * step;
    vehicle.y += vehicle.vy * step;
}
