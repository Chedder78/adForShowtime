// /src/managers/GameManager.js
// Centralized game loop & orchestrator
// Add inside GameManager.js constructor:
import HUD from './HUD.js';
import Player from 'src/entities/Player.js';
import PowerUpManager from './PowerUpManager.js';
import BulletManager from './BulletManager.js';
import AsteroidManager from './AsteroidManager.js';

export default class GameManager {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = new Player(canvas.width / 2, canvas.height / 2);
        this.hud = new HUD(this.player);
        this.bulletManager = new BulletManager();
        this.powerUpManager = new PowerUpManager();
        this.asteroidManager = new AsteroidManager();
        this.keys = {};
        this.lastFrame = 0;
        this.registerInput();
    }
}
    registerInput() {
        window.addEventListener('keydown', e => this.keys[e.code] = true);
        window.addEventListener('keyup', e => this.keys[e.code] = false);
    }

    start() {
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(timestamp) {
        const delta = timestamp - this.lastFrame;
        this.lastFrame = timestamp;

        this.update(delta);
        this.render();

        requestAnimationFrame((ts) => this.gameLoop(ts));
    }

    update(delta) {
        this.player.update(this.keys, this.bulletManager);
        this.bulletManager.update();
        this.asteroidManager.update();
        this.powerUpManager.update(this.player);
    }

    render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.draw(this.ctx);
    this.bulletManager.draw(this.ctx);
    this.asteroidManager.draw(this.ctx);
    this.powerUpManager.draw(this.ctx);
    this.hud.draw(this.ctx); // <-- add here
}
