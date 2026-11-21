// SOLARA CITY - Save System
// Handles game state persistence.

import { SAVE_KEY } from './config.js';

export function saveGame(state) {
    try {
        const data = {
            player: {
                x: state.player.x,
                y: state.player.y,
                health: state.player.health,
                cash: state.player.cash,
            },
            police: {
                stars: state.police.stars,
                heat: state.police.heat,
            },
            mission: {
                completedCount: state.mission.completedCount,
            },
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Failed to save game state:", e);
    }
}

export function loadGame() {
    try {
        const data = localStorage.getItem(SAVE_KEY);
        if (!data) return null;
        return JSON.parse(data);
    } catch (e) {
        console.error("Failed to load game save:", e);
        return null;
    }
}

export function deleteSave() {
    try {
        localStorage.removeItem(SAVE_KEY);
    } catch (e) {
        console.error("Failed to delete save:", e);
    }
}
