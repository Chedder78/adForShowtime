// /src/entities/Player.js
// Handles player ship logic with touch joystick + power-up components

import EventEmitter from '../utils/EventEmitter.js';

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

    /**
     * Hybrid input handler: joystick + keyboard
     * @param {Object} keys - keyboard input (e.g., ArrowLeft, Space)
     * @param {BulletManager} bulletManager - ref to bullet manager
     * @param {Object} joystickVector - { x: -1 to 1, y: -1 to 1 } from virtual joystick
     */
    update(keys, bulletManager, joystickVector = { x: 0, y: 0 }) {
        const joyX = joystickVector.x;
        const joyY = joystickVector.y;

        // Handle joystick input (touch drag)
        if (joyX !== 0 || joyY !== 0) {
            const angle = Math.atan2(joyY, joyX);
            this.angle = angle;
            this.speed = Math.min(this.speed + 0.15, this.maxSpeed);
        } 
        // Keyboard fallback
        else {
            if (keys['ArrowLeft']) this.angle -= 0.05;
            if (keys['ArrowRight']) this.angle += 0.05;
            if (keys['ArrowUp']) this.speed = Math.min(this.speed + 0.1, this.maxSpeed);
            else this.speed *= 0.98; // slow down naturally
        }

        // Movement
        this.x += Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        // Screen wrap (replace with canvas.width / canvas.height later)
        this.x = (this.x + 800) % 800;
        this.y = (this.y + 600) % 600;

        // Fire (works with touch fire button or spacebar)
        if (keys['Space']) bulletManager.fire(this);

        // Power-up components (e.g., Shield, DoubleShot)
        this.components.forEach(c => c.update());
        this.components = this.components.filter(c => !c.expired);
    }

    /**
     * Attach a power-up component (shield, double-shot, etc.)
     */
    addComponent(component) {
        this.components.push(component);
        component.activate();
    }

    /**
     * Draw ship and power-up indicators (e.g., shield aura)
     */
    draw(ctx) {
        // Ship body
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

        // Active component visuals (shield ring, etc.)
        this.components.forEach(c => c.draw(ctx));
    }
}
