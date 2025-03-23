// /src/entities/PowerUp.js
// Base class for power-up items on the field

export default class PowerUp {
    constructor(x, y, type, canvas) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = 12;
        this.active = true;
        this.rotation = 0;
        this.canvas = canvas;
    }

    update() {
        this.rotation += 0.05;

        // Optional: screen wrap for power-ups
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);

        this.x = (this.x + width) % width;
        this.y = (this.y + height) % height;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.rect(-10, -10, 20, 20);
        ctx.strokeStyle = this.type === 'shield' ? 'cyan' : 'orange';
        ctx.stroke();
        ctx.restore();
    }

    checkCollision(player) {
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < player.radius + this.radius;
    }
}
