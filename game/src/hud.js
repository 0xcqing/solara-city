// SOLARA CITY - HUD and UI
// Cash, health, armor, minimap, mission objective, notifications.

import { PALETTE, CITY_SIZE, TILE_SIZE } from './config.js';
import { TILE_TYPES } from './city.js';

function getMinimapTileColor(tile) {
    switch (tile) {
        case TILE_TYPES.ROAD: return PALETTE.road;
        case TILE_TYPES.SIDEWALK: return PALETTE.sidewalk;
        case TILE_TYPES.GRASS: return PALETTE.grass;
        case TILE_TYPES.SAND: return PALETTE.sand;
        case TILE_TYPES.WATER: return PALETTE.water;
        case TILE_TYPES.PARK: return PALETTE.grass;
        default: return PALETTE.building;
    }
}

export function drawHUD(ctx, state) {
    const { player, mission, police } = state;
    
    // 1. Money Counter
    ctx.fillStyle = PALETTE.hudBg;
    ctx.fillRect(10, 10, 140, 30);
    ctx.fillStyle = PALETTE.cash;
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`$ ${player.cash.toLocaleString()}`, 20, 30);
    
    // 2. Health Bar
    ctx.fillStyle = PALETTE.hudBg;
    ctx.fillRect(10, 50, 140, 15);
    ctx.fillStyle = PALETTE.health;
    ctx.fillRect(12, 52, Math.max(0, Math.min(player.health / 100, 1)) * 136, 11);
    
    // 3. Wanted Level (Stars)
    ctx.fillStyle = PALETTE.text;
    ctx.font = '14px Arial';
    ctx.fillText('WANTED:', 10, 85);
    ctx.fillStyle = PALETTE.wanted;
    for (let i = 0; i < Math.min(police.stars, 5); i++) {
        ctx.fillText('★', 75 + i * 18, 85);
    }
    
    // 4. Mission Objective
    if (mission.active) {
        ctx.fillStyle = PALETTE.hudBg;
        ctx.fillRect(10, 100, 200, 25);
        ctx.fillStyle = PALETTE.marker;
        ctx.fillText(mission.objective, 20, 118);
    }
    
    // 4b. Speedometer (for drive)
    if (player.inVehicle) {
        ctx.fillStyle = PALETTE.hudBg;
        ctx.fillRect(ctx.canvas.width - 120, ctx.canvas.height - 40, 110, 30);
        ctx.fillStyle = PALETTE.text;
        ctx.font = 'bold 20px Arial';
        ctx.fillText('88 MPH', ctx.canvas.width - 65, ctx.canvas.height - 18);
    }
    
    // 5. Minimap
    const mapSize = 120;
    const mapX = ctx.canvas.width - mapSize - 10;
    const mapY = 10;
    ctx.fillStyle = PALETTE.hudBg;
    ctx.fillRect(mapX, mapY, mapSize, mapSize);
    
    // Draw city overview
    const stride = 8;
    for (let y = 0; y < CITY_SIZE; y += stride) {
        for (let x = 0; x < CITY_SIZE; x += stride) {
            const tile = state.city.tiles[y * CITY_SIZE + x];
            ctx.fillStyle = getMinimapTileColor(tile);
            ctx.fillRect(mapX + (x / CITY_SIZE) * mapSize, mapY + (y / CITY_SIZE) * mapSize, 2, 2);
        }
    }
    
    const worldSize = CITY_SIZE * TILE_SIZE;
    
    // Draw player on minimap
    const pX = mapX + (player.x / worldSize) * mapSize;
    const pY = mapY + (player.y / worldSize) * mapSize;
    ctx.fillStyle = PALETTE.player;
    ctx.fillRect(pX - 2, pY - 2, 4, 4);
    
    // Draw police on minimap
    if (police.stars > 0) {
        ctx.fillStyle = PALETTE.police;
        for (const p of police.units || []) {
            const mX = mapX + (p.x / worldSize) * mapSize;
            const mY = mapY + (p.y / worldSize) * mapSize;
            ctx.fillRect(mX - 2, mY - 2, 4, 4);
        }
    }
}
