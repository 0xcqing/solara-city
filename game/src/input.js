// SOLARA CITY - Input
// Keyboard and mouse interaction.

export function createInput(canvas) {
    const keys = new Set();
    const justPressed = new Set();
    const mouse = { x: 0, y: 0, down: false };

    window.addEventListener('keydown', e => { keys.add(e.code); justPressed.add(e.code); });
    window.addEventListener('keyup', e => keys.delete(e.code));
    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) / rect.width * canvas.width;
        mouse.y = (e.clientY - rect.top) / rect.height * canvas.height;
    });
    canvas.addEventListener('mousedown', () => mouse.down = true);
    canvas.addEventListener('mouseup', () => mouse.down = false);

    return { keys, justPressed, mouse, isPressed: (code) => keys.has(code), wasJustPressed: (code) => {
        const res = justPressed.has(code);
        justPressed.delete(code);
        return res;
    } };
}
