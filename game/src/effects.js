// SOLARA CITY - Effects
// Particles, explosions, skid marks.

export function createEffectsState() {
    return {
        particles: [],
    };
}

export function spawnParticle(state, x, y, type) {
    state.particles.push({ x, y, type, life: 1.0, vx: (Math.random()-0.5)*100, vy: (Math.random()-0.5)*100 });
}

export function updateEffects(state, step) {
    for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx * step; p.y += p.vy * step;
        p.life -= step;
        if (p.life <= 0) state.particles.splice(i, 1);
    }
}
