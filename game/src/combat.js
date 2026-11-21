// SOLARA CITY - Combat and Projectiles
// Fists, pistols, SMGs. Pickups. Car explosions.

export function createCombatState() {
    return {
        bullets: [],
        explosions: [],
        pickups: [],
    };
}

export function updateCombat(state, player, peds, vehicles, step) {
    // 1. Bullets
    for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        b.x += b.vx * step;
        b.y += b.vy * step;
        b.life -= step;
        if (b.life <= 0) { state.bullets.splice(i, 1); continue; }

        // Hit peds/cars
        for (const ped of peds) {
            if (Math.hypot(b.x - ped.x, b.y - ped.y) < 20) {
                ped.health -= b.damage;
                state.bullets.splice(i, 1); break;
            }
        }
    }
}

export function spawnBullet(state, x, y, angle, damage) {
    state.bullets.push({ x, y, vx: Math.cos(angle) * 800, vy: Math.sin(angle) * 800, life: 0.5, damage });
}
