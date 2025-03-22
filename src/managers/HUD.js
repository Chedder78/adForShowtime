// /src/managers/HUD.js
// Modular HUD for showing player status & active power-ups

export default class HUD {
    constructor(player) {
        this.player = player;
    }

    draw(ctx) {
        ctx.save();
        ctx.font = '14px Arial';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';

        // Display "Active Power-ups"
        ctx.fillText('Power-ups:', 20, 20);

        let yOffset = 40;
        this.player.components.forEach(component => {
            const timeLeft = Math.max(0, Math.ceil((component.duration - (Date.now() - component.startTime)) / 1000));
            ctx.fillText(`${component.constructor.name} (${timeLeft}s)`, 20, yOffset);
            yOffset += 20;
        });

        ctx.restore();
    }
}
