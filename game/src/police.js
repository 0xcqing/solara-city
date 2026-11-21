// SOLARA CITY - Police
// 0-5 stars, wanted level, chases, busts.

export function createPoliceState() {
    return {
        stars: 0,
        heat: 0,
        units: [], // Array of cruisers
    };
}

export function updatePolice(state, player, step) {
    if (state.heat > 0) state.heat -= step * 2;
    if (state.heat < 0) state.heat = 0;
    state.stars = Math.floor(state.heat / 200);

    // AI chases
    if (state.stars > 0) {
        // Implement logic to spawn units and converge
    }
}
