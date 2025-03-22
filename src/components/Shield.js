// /src/components/Shield.js
// Player Component: Temporary invincibility shield

export default class Shield {
    constructor(player) {
        this.player = player;
        this.duration = 5000; // ms
        this.expired = false;
    }

    activate() {
        this.startTime = Date.now();
        this.player.isShielded = true;
    }

    update() {
        if (Date.now() - this.startTime > this.duration) {
            this.player.isShielded = false;
            this.expired = true;
        }
    }

    draw(ctx) {
        if (!this.expired) {
            ctx.beginPath();
            ctx.arc(this.player.x, this.player.y, this.player.radius + 5, 0, Math.PI * 2);
            ctx.strokeStyle = 'cyan';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.lineWidth = 1;
        }
    }
}
