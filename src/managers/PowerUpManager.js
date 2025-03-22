// /src/managers/PowerUpManager.js
// Handles power-up lifecycle: spawn, update, collision

import PowerUpFactory from '../factories/PowerUpFactory.js';

export default class PowerUpManager {
    constructor() {
        this.powerUps = [];
        this.spawnTimer = 0;
    }

    update(player) {
        // Spawning logic
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            const types = ['shield', 'double-shot'];
            const type = types[Math.floor(Math.random() * types.length)];
            const x = Math.random() * 800;
            const y = Math.random() * 600;
            this.powerUps.push(PowerUpFactory.create(type, x, y));
            this.spawnTimer = 600; // ~10s respawn
        }

        // Power-up updates
        this.powerUps.forEach(p => p.update());

        // Collision detection
        this.powerUps.forEach((p, i) => {
            if (p.checkCollision(player)) {
                player.addComponent(PowerUpFactory.createComponent(type = p.type, player));
                this.powerUps.splice(i, 1); // Remove on pickup
            }
        });
    }

    draw(ctx) {
        this.powerUps.forEach(p => p.draw(ctx));
    }
}
