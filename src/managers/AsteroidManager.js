// /src/managers/AsteroidManager.js
// Spawns and manages asteroids dynamically based on canvas size

import Asteroid from '../entities/Asteroid.js';

export default class AsteroidManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.asteroids = [];
        this.spawnInterval = 0;
    }

    update() {
        this.spawnInterval--;
        if (this.spawnInterval <= 0) {
            const width = this.canvas.width / (window.devicePixelRatio || 1);
            const height = this.canvas.height / (window.devicePixelRatio || 1);

            this.asteroids.push(
                new Asteroid(
                    Math.random() * width,
                    Math.random() * height,
                    this.canvas
                )
            );

            this.spawnInterval = 120; // spawn every ~2s
        }

        this.asteroids.forEach(a => a.update());
    }

    draw(ctx) {
        this.asteroids.forEach(a => a.draw(ctx));
    }
}
