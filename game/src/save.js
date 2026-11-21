// SOLARA CITY - Save System
// localStorage persistence.

import { SAVE_KEY } from './config.js';

export function saveGame(player, mission, police) {
    const data = {
        cash: player.cash,
        weapons: player.weapon,
        ammo: player.ammo,
        missionProgress: mission.completedCount,
        x: player.x,
        y: player.y
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function loadGame() {
    const data = localStorage.getItem(SAVE_KEY);
    return data ? JSON.parse(data) : null;
}
