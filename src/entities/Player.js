// /src/entities/Player.js
// Handles player ship logic and power-up components

import EventEmitter from './src/utils/EventEmitter.js';

export default class Player extends EventEmitter {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.speed = 0;
        this.radius = 20;
        this.maxSpeed = 4;
        this.components = []; // Array of active power-up components
    }

    update(keys, bulletManager) {
        // Rotate
        if (keys['ArrowLeft']) this.angle -= 0.05;
        if (keys['ArrowRight']) this.angle += 0.05;

        // Thrust
        if (keys['ArrowUp']) this.speed = Math.min(this.speed + 0.1, this.maxSpeed);
        else this.speed *= 0.98; // friction

        // Move
        this.x += Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        // Screen wrap
        this.x = (this.x + 800) % 800;
        this.y = (this.y + 600) % 600;

        // Fire
        if (keys['Space']) bulletManager.fire(this);

        // Update active components
        this.components.forEach(c => c.update());

        // Cleanup expired components
        this.components = this.components.filter(c => !c.expired);
    }

    addComponent(component) {
        this.components.push(component);
        component.activate();
    }

    draw(ctx) {
        // Ship
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(-15, 15);
        ctx.lineTo(15, 15);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.stroke();

        ctx.restore();

        // Draw power-up indicators (e.g., shield)
        this.components.forEach(c => c.draw(ctx));
    }
}
