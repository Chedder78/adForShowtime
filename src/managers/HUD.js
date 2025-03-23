// /src/managers/HUD.js
// Modular HUD for showing player status & active power-ups (responsive-ready)

export default class HUD {
    constructor(player, canvas) {
        this.player = player;
        this.canvas = canvas;
    }

    draw(ctx) {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const isMobile = width < 500;

        ctx.save();
        ctx.font = isMobile ? '12px Arial' : '14px Arial';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';

        // Display HUD in top-left (scales on smaller screens)
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
