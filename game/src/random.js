// SOLARA CITY - Seeded Random Number Generator
// A deterministic PRNG (mulberry32) to ensure repeatable city generation and screenshots.

export function createRandom(seed) {
    let state = seed | 0;
    return () => {
        state = (state + 0x6D2B79F5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Utility to get a random integer in [min, max)
export function randInt(random, min, max) {
    return Math.floor(random() * (max - min)) + min;
}

// Utility to pick a random element from an array
export function randPick(random, array) {
    return array[Math.floor(random() * array.length)];
}

// Utility to get a random float in [min, max)
export function randRange(random, min, max) {
    return random() * (max - min) + min;
}
