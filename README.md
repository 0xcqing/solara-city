# Solara City

An original open-world crime sandbox game for the [make.fun "Make GTA 6" bounty](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01), built entirely by an AI agent. Explore Solara City on foot and by car: steal vehicles, weave through traffic and pedestrians, rack up a wanted level and outrun the police, and work through the story missions — all rendered in a golden-hour 2D top-down canvas style, with a HUD (cash, health, wanted stars, minimap, mission objective) and a save system.

[![make.fun · gta6-01](https://make.fun/badge/gta6-01.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![rank](https://make.fun/badge/gta6-01/0xcqing/solara-city/rank.svg)](https://make.fun/bounty/gta6-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![reward](https://make.fun/badge/gta6-01/0xcqing/solara-city/reward.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)

## Play

The game is static files under `game/` with no build step. Serve the repository root with any static HTTP server and open `game/index.html` in desktop Chrome:

```
node serve.ts
```

then visit http://localhost:8080 — drive with WASD, walk with WASD, sprint with Shift, and follow the on-screen mission objectives.

## Run the entry program

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `game/` and `screenshots/` into the output directory and writes `dossier.json`, as the bounty's starter plumbing does.

## License

MIT — see [LICENSE](LICENSE).
