// /src/managers/PowerUpManager.js
// Handles power-up lifecycle: spawn, update, collision

import PowerUpFactory from '../factories/PowerUpFactory.js';

export default class PowerUpManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.powerUps = [];
        this.spawnTimer = 0;
    }

    update(player) {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);

        // Spawning logic
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            const types = ['shield', 'double-shot'];
            const type = types[Math.floor(Math.random() * types.length)];
            const x = Math.random() * width;
            const y = Math.random() * height;
            this.powerUps.push(PowerUpFactory.create(type, x, y, this.canvas));
            this.spawnTimer = 600; // ~10s respawn
        }

        // Power-up updates
        this.powerUps.forEach(p => p.update());

        // Collision detection
        this.powerUps = this.powerUps.filter(p => {
            if (p.checkCollision(player)) {
                player.addComponent(PowerUpFactory.createComponent(p.type, player));
                return false; // Remove on pickup
            }
            return true;
        });
    }

    draw(ctx) {
        this.powerUps.forEach(p => p.draw(ctx));
    }
}
