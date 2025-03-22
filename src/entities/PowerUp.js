// /src/entities/PowerUp.js
// Base class for power-up items on the field

export default class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.radius = 12;
        this.type = type;
        this.active = true;
        this.rotation = 0;
    }

    update() {
        this.rotation += 0.05; // Optional: spinning animation
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
