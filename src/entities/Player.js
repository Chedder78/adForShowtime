// /src/entities/Player.js
import EventEmitter from '../utils/EventEmitter.js';

export default class Player extends EventEmitter {
    constructor(x, y, canvas) {
        super();
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.angle = 0;
        this.speed = 0;
        this.radius = 20;
        this.maxSpeed = 4;
        this.components = [];
    }

    update(keys, bulletManager, joystickVector = { x: 0, y: 0 }) {
        const joyX = joystickVector.x;
        const joyY = joystickVector.y;

        if (joyX !== 0 || joyY !== 0) {
            const angle = Math.atan2(joyY, joyX);
            this.angle = angle;
            this.speed = Math.min(this.speed + 0.15, this.maxSpeed);
        } else {
            if (keys['ArrowLeft']) this.angle -= 0.05;
            if (keys['ArrowRight']) this.angle += 0.05;
            if (keys['ArrowUp']) this.speed = Math.min(this.speed + 0.1, this.maxSpeed);
            else this.speed *= 0.98;
        }

        this.x += Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        this.x = (this.x + width) % width;
        this.y = (this.y + height) % height;

        if (keys['Space']) bulletManager.fire(this);

        this.components.forEach(c => c.update());
        this.components = this.components.filter(c => !c.expired);
    }

    addComponent(component) {
        this.components.push(component);
        component.activate();
    }

    draw(ctx) {
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

        this.components.forEach(c => c.draw(ctx));
    }
}
