// /src/managers/BulletManager.js
// Handles all bullets (creation + update + cleanup)

import Bullet from '../entities/Bullet.js';

export default class BulletManager {
    constructor() {
        this.bullets = [];
        this.cooldown = 0;
    }

    fire(player) {
        if (this.cooldown <= 0) {
            const x = player.x + Math.sin(player.angle) * 20;
            const y = player.y - Math.cos(player.angle) * 20;
            this.bullets.push(new Bullet(x, y, player.angle));

            // Example: emit 'shotFired' event if needed later
            player.emit('shotFired');
            this.cooldown = 300; // ms cooldown
        }
    }

    update() {
        this.cooldown -= 16; // Approx 60fps delta compensation

        this.bullets.forEach(b => b.update());
        this.bullets = this.bullets.filter(b => b.active);
    }

    draw(ctx) {
        this.bullets.forEach(b => b.draw(ctx));
    }
}
