// /src/managers/AsteroidManager.js
// Spawns and manages asteroids

import Asteroid from '../entities/Asteroid.js';

export default class AsteroidManager {
    constructor() {
        this.asteroids = [];
        this.spawnInterval = 0;
    }

    update() {
        this.spawnInterval--;
        if (this.spawnInterval <= 0) {
            this.asteroids.push(new Asteroid(Math.random() * 800, Math.random() * 600));
            this.spawnInterval = 120; // spawn every ~2s
        }

        this.asteroids.forEach(a => a.update());
    }

    draw(ctx) {
        this.asteroids.forEach(a => a.draw(ctx));
    }
}
