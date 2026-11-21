import { createRandom } from './random.js';
import { SCREEN_TITLE, SCREEN_PLAY } from './render.js';
import { STEP } from './config.js';
import { updatePlayer } from './player.js';

export function setupShot(name, seed, state) {
    const random = createRandom(seed);
    
    if (name === 'title') {
        state.screen = SCREEN_TITLE;
    } else {
        state.screen = SCREEN_PLAY;
        state.player.x = 400; // Place in middle of city
        state.player.y = 400;
        
        // Populate entities for visual density
        state.vehicles = [];
        state.peds = [];
        for (let i = 0; i < 8; i++) {
            state.vehicles.push({
                x: state.player.x + (random() - 0.5) * 500,
                y: state.player.y + (random() - 0.5) * 500,
                width: 32, length: 64,
                color: ['#e74c3c', '#2c3e50', '#95a5a6', '#f1c40f'][randInt(random, 0, 3)],
                name: i < 2 ? 'Police Cruiser' : 'Sunchaser'
            });
            state.peds.push({
                x: state.player.x + (random() - 0.5) * 300,
                y: state.player.y + (random() - 0.5) * 300
            });
        }

        if (name === 'street') {
            state.player.inVehicle = false;
        } else if (name === 'drive') {
            state.player.inVehicle = true;
        } else if (name === 'chase') {
            state.player.inVehicle = true;
            state.police.stars = 3;
            state.police.heat = 600;
            state.mission.active = true;
            state.mission.objective = "ESCAPE THE COPS";
            // Make sure police cars are right behind
            state.vehicles.push({ x: state.player.x, y: state.player.y + 100, width: 32, length: 64, color: '#34495e', name: 'Police Cruiser' });
            state.vehicles.push({ x: state.player.x + 50, y: state.player.y + 120, width: 32, length: 64, color: '#34495e', name: 'Police Cruiser' });
        }

        // Run 5 fixed steps to stabilize state
        const dummyInput = {
            isPressed: () => false,
            wasJustPressed: () => false,
        };
        for (let i = 0; i < 5; i++) {
            updatePlayer(state.player, dummyInput, state.city, state.vehicles, STEP);
        }
    }
}

// Helper needed by edit call
function randInt(random, min, max) {
    return Math.floor(random() * (max - min + 1)) + min;
}
