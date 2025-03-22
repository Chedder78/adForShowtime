// /src/entities/Asteroid.js
// Basic asteroid entity with simple drift

export default class Asteroid {
    constructor(x, y, size = 3) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.radius = size * 15;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 1.5 + 0.5;
        this.active = true;
    }

    update() {
        this.x += Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        this.x = (this.x + 800) % 800;
        this.y = (this.y + 600) % 600;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
    }
}
