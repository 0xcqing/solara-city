// SOLARA CITY - Automated Build Script
// Prepares game assets and meta-information for submission.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

// Locate project root relative to this script's position
const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || join(__dirname, 'dist');

// Initialize clean output structure
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
}

// Transfer game source assets
const srcGame = join(__dirname, 'game');
const dstGame = join(outputDir, 'game');
cpSync(srcGame, dstGame, { recursive: true });

// Transfer existing screenshots for the package
const srcShots = join(__dirname, 'screenshots');
const dstShots = join(outputDir, 'screenshots');
if (existsSync(srcShots)) {
    mkdirSync(dstShots, { recursive: true });
    cpSync(srcShots, dstShots, { recursive: true });
}

// Generate the final submission dossier
const dossierContent = buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000
});

writeFileSync(join(outputDir, 'dossier.json'), dossierContent);
