// SOLARA CITY - Audio System
// Synthesized WebAudio for engine, gunshots, sirens, etc.

let audioCtx = null;
let muted = false;

export function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

export function playEngine(speed) { if (!muted && audioCtx) { /* synth engine */ } }
export function playGunshot() { if (!muted && audioCtx) { /* synth shot */ } }
export function playSiren() { if (!muted && audioCtx) { /* synth siren */ } }
export function toggleMute() { muted = !muted; }
