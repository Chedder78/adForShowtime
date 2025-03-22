// /src/main.js
// Entry point: Initializes and starts the game

import GameManager from 'src/managers/GameManager.js';

window.onload = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const game = new GameManager(canvas, ctx);
    game.start();
};
