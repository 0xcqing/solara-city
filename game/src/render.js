import { TILE_SIZE, CITY_SIZE, PALETTE } from './config.js';
import { TILE_TYPES } from './city.js';

export const SCREEN_TITLE = 0;
export const SCREEN_PLAY = 1;
export function drawTitle(ctx) {
    ctx.fillStyle = '#000033'; // Deep blue
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Gradient
    let grad = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    grad.addColorStop(0, '#000033');
    grad.addColorStop(1, '#660066');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    // Scale title to fit
    let fontSize = 80;
    ctx.font = `bold ${fontSize}px Arial`;
    while (ctx.measureText('SOLARA CITY').width > ctx.canvas.width - 40 && fontSize > 20) {
        fontSize -= 5;
        ctx.font = `bold ${fontSize}px Arial`;
    }
    ctx.fillText('SOLARA CITY', ctx.canvas.width / 2, ctx.canvas.height / 2 - 40);

    ctx.font = '30px Arial';
    ctx.fillText('Neon Dreams in the Concrete Jungle', ctx.canvas.width / 2, ctx.canvas.height / 2 + 20);
    ctx.font = '25px Arial';
    ctx.fillText('Press ENTER to Start', ctx.canvas.width / 2, ctx.canvas.height / 2 + 100);
}


export function drawWorld(ctx, state) {
    const { camera, city, player, vehicles, peds } = state;

    // Day sky/ambient tint
    ctx.fillStyle = 'rgba(255, 179, 102, 0.2)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // Tiles: Road grid, sidewalks, crosswalks
    for (let y = 0; y < CITY_SIZE; y++) {
        for (let x = 0; x < CITY_SIZE; x++) {
            const tile = city.tiles[y * CITY_SIZE + x];
            ctx.fillStyle = getTileColor(tile);
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

            if (tile === TILE_TYPES.ROAD) {
                // Dashed yellow center lines
                ctx.fillStyle = '#ffff00';
                if (x % 2 === 0) ctx.fillRect(x * TILE_SIZE + TILE_SIZE / 2 - 2, y * TILE_SIZE + TILE_SIZE / 4, 4, TILE_SIZE / 2);
            }
        }
    }

    // Buildings: rectangles, colors, roofs, windows
    for (const b of city.buildings) {
        ctx.fillStyle = PALETTE.buildingWall;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = PALETTE.roof;
        ctx.fillRect(b.x + 5, b.y - b.height / 2 + 5, b.w - 10, b.h);
        
        // Window dots
        ctx.fillStyle = '#ffcc00';
        for (let wy = b.y + 10; wy < b.y + b.h - 10; wy += 10) {
            for (let wx = b.x + 10; wx < b.x + b.w - 10; wx += 10) {
                if (Math.random() > 0.7) ctx.fillRect(wx, wy, 3, 3);
            }
        }
    }

    // Vehicles: rounded rectangles, roof, headlights/taillights, police lights
    const frame = Math.floor(Date.now() / 250) % 2;
    for (const v of vehicles) {
        ctx.fillStyle = v.color;
        ctx.fillRect(v.x - v.width/2, v.y - v.length/2, v.width, v.length);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(v.x - v.width / 2 + 4, v.y - v.length / 2 + 4, v.width - 8, v.length - 8);

        // Headlights
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(v.x - v.width / 2, v.y - v.length / 2, 4, 4);
        ctx.fillRect(v.x + v.width / 2 - 4, v.y - v.length / 2, 4, 4);

        if (v.name === 'Police Cruiser') {
            ctx.fillStyle = frame === 0 ? '#ff0000' : '#0000ff';
            ctx.fillRect(v.x - v.width / 2, v.y, v.width, 4);
        }
    }

    // Pedestrians
    for (const p of peds) {
        ctx.fillStyle = '#ffcc99';
        ctx.fillRect(p.x - 4, p.y - 4 + Math.sin(Date.now()/100)*2, 8, 8);
        ctx.fillStyle = '#336699';
        ctx.fillRect(p.x - 4, p.y + 4 + Math.sin(Date.now()/100)*2, 8, 8);
    }

    // Player
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = player.inVehicle ? '#00ff00' : '#ffffff';
    ctx.strokeRect(player.x - 8, player.y - 8, 16, 16);
    ctx.fillRect(player.x - 8, player.y - 8, 16, 16);

    ctx.restore();
}

function getTileColor(tile) {
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
