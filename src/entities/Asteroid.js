// /src/entities/Asteroid.js
export default class Asteroid {
    constructor(x, y, canvas, size = 3) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.size = size;
        this.radius = size * 15;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 1.5 + 0.5;
        this.active = true;
    }

    update() {
        this.x += Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);

        // Screen wrap
        this.x = (this.x + width) % width;
        this.y = (this.y + height) % height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
    }
}
