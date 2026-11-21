// SOLARA CITY - Configuration and Tunables
// All tunables and the golden-hour palette in one place.

export const TILE_SIZE = 48;
export const CITY_SIZE = 140; // 140x140 tiles
export const WORLD_SIZE = CITY_SIZE * TILE_SIZE;

export const STEP = 1 / 60; // 60 FPS fixed step

export const PALETTE = {
    sky: '#ffb366',
    sun: '#ff8c00',
    water: '#2b65ec',
    sand: '#edc9af',
    grass: '#7fb34b',
    road: '#4a4a4a',
    sidewalk: '#9a9a9a',
    building: '#d2b48c',
    buildingWall: '#8b7355',
    roof: '#c19a6b',
    shadow: 'rgba(0, 0, 0, 0.3)',
    text: '#ffffff',
    hudBg: 'rgba(0, 0, 0, 0.6)',
    health: '#ff4b4b',
    armor: '#4b4bff',
    cash: '#4bff4b',
    wanted: '#ffff00',
    marker: '#ffff00',
    player: '#ffffff',
    ped: '#ffebcd',
    police: '#2f4f4f',
    blood: '#8b0000',
    fire: '#ff4500',
    smoke: '#696969',
};

export const PLAYER = {
    walkSpeed: 180,
    sprintSpeed: 320,
    rotateSpeed: 10,
    radius: 12,
};

export const VEHICLE_TYPES = [
    { name: 'Sunchaser', color: '#e74c3c', speed: 450, accel: 3.5, length: 60, width: 30 },
    { name: 'Vanta', color: '#2c3e50', speed: 400, accel: 3.0, length: 64, width: 32 },
    { name: 'Mule', color: '#95a5a6', speed: 300, accel: 2.0, length: 80, width: 40 },
    { name: 'Solara GT', color: '#f1c40f', speed: 550, accel: 5.0, length: 60, width: 30 },
    { name: 'Taxi', color: '#f39c12', speed: 380, accel: 3.0, length: 64, width: 32 },
    { name: 'Police Cruiser', color: '#34495e', speed: 500, accel: 4.5, length: 64, width: 32 },
    { name: 'Cabrio', color: '#e67e22', speed: 420, accel: 3.2, length: 60, width: 30 },
    { name: 'Stallion', color: '#bdc3c7', speed: 480, accel: 4.0, length: 64, width: 32 },
    { name: 'Boxer van', color: '#7f8c8d', speed: 280, accel: 1.8, length: 70, width: 35 },
    { name: 'Rimini coupe', color: '#9b59b6', speed: 520, accel: 4.2, length: 60, width: 30 },
];

export const DISTRICTS = {
    DOWNTOWN: { name: 'Downtown', color: '#a0a0a0' },
    OLD_TOWN: { name: 'Old Town', color: '#c2b280' },
    VELA_BEACH: { name: 'Vela Beach', color: '#edc9af' },
    HARBOR: { name: 'Harbor', color: '#708090' },
    SUNVIEW_HEIGHTS: { name: 'Sunview Heights', color: '#90ee90' },
    MIRADOR_PARK: { name: 'Mirador Park', color: '#228b22' },
};

export const SAVE_KEY = 'solara-city-save';
