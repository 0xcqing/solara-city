// SOLARA CITY - Main Game Loop
// Boot, state machine, input handling, and loop.

import { generateCity } from './city.js';
import { createCamera, updateCamera } from './camera.js';
import { createInput } from './input.js';
import { createPlayer, updatePlayer } from './player.js';
import { createPoliceState, updatePolice } from './police.js';
import { createCombatState, updateCombat } from './combat.js';
import { createEffectsState, updateEffects } from './effects.js';
import { createMissionState, updateMissions } from './missions.js';
import { drawWorld, drawTitle, SCREEN_TITLE, SCREEN_PLAY } from './render.js';
import { drawHUD } from './hud.js';
import { STEP, WORLD_SIZE } from './config.js';
import { setupShot } from './shots.js';

let state = {
    screen: SCREEN_PLAY,
    city: null,
    camera: createCamera(),
    input: null,
    player: createPlayer(),
    vehicles: [],
    peds: [],
    police: createPoliceState(),
    combat: createCombatState(),
    effects: createEffectsState(),
    mission: createMissionState(),
};

function boot() {
    const canvas = document.getElementById('gameCanvas');
    canvas.width = 1280;
    canvas.height = 720;
    state.input = createInput(canvas);
    state.city = generateCity(12345, Math.random);
    
    const params = new URLSearchParams(window.location.search);
    if (params.has('shot')) {
        setupShot(params.get('shot'), 12345, state);
        state.camera.x = Math.max(0, Math.min(state.player.x - 640, WORLD_SIZE - 1280));
        state.camera.y = Math.max(0, Math.min(state.player.y - 360, WORLD_SIZE - 720));
        render();
        window.__shotReady = true;
    }
    
    requestAnimationFrame(loop);
}

let lastTime = 0;
let accumulator = 0;

function loop(timestamp) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    accumulator += Math.min(dt, 0.1);

    while (accumulator >= STEP) {
        update(STEP);
        accumulator -= STEP;
    }

    render();
    requestAnimationFrame(loop);
}

function update(step) {
    if (state.screen === SCREEN_PLAY) {
        updatePlayer(state.player, state.input, state.city, state.vehicles, step);
        updateCamera(state.camera, state.player, 1280, 720, step);
        updatePolice(state.police, state.player, step);
        updateCombat(state.combat, state.player, state.peds, state.vehicles, step);
        updateEffects(state.effects, step);
        updateMissions(state.mission, state.player, step);
    }
}

function render() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    if (state.screen === SCREEN_PLAY) {
        drawWorld(ctx, state);
        drawHUD(ctx, state);
    } else if (state.screen === SCREEN_TITLE) {
        drawTitle(ctx);
    }
}

window.addEventListener('load', boot);
