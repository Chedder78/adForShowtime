// /src/managers/BulletManager.js
import Bullet from '../entities/Bullet.js';

export default class BulletManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.bullets = [];
        this.cooldown = 0;
    }

    fire(player) {
        if (this.cooldown <= 0) {
            if (player.doubleShotMode) {
                this.bullets.push(new Bullet(player.x - 5, player.y, player.angle, this.canvas));
                this.bullets.push(new Bullet(player.x + 5, player.y, player.angle, this.canvas));
            } else {
                this.bullets.push(new Bullet(player.x, player.y, player.angle, this.canvas));
            }
            this.cooldown = 300;
        }
    }

    update() {
        this.cooldown -= 16;
        this.bullets.forEach(b => b.update());
        this.bullets = this.bullets.filter(b => b.active);
    }

    draw(ctx) {
        this.bullets.forEach(b => b.draw(ctx));
    }
}
