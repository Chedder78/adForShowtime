// /src/components/DoubleShot.js
// Player Component: Temporary double bullet shot

export default class DoubleShot {
    constructor(player) {
        this.player = player;
        this.duration = 5000;
        this.expired = false;
    }

    activate() {
        this.startTime = Date.now();
        this.player.doubleShotMode = true;
    }

    update() {
        if (Date.now() - this.startTime > this.duration) {
            this.player.doubleShotMode = false;
            this.expired = true;
        }
    }

    draw(ctx) {
        // Optional: you can add a HUD indicator later if you like
    }
}
