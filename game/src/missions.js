// SOLARA CITY - Missions
// Lieutenant Diaz's 5-mission story.

export function createMissionState() {
    return {
        currentIdx: 0,
        active: false,
        objective: "",
        completedCount: 0,
    };
}

export function updateMissions(state, player, step) {
    if (!state.active) return;
    // Mission specific logic (triggers, completion, failures)
}
