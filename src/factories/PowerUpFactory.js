// /src/factories/PowerUpFactory.js
// Factory pattern to generate PowerUp and Components

import PowerUp from './src/entities/PowerUp.js';
import Shield from './src/components/Shield.js';
import DoubleShot from './src/components/DoubleShot.js';

export default class PowerUpFactory {
    static create(type, x, y) {
        return new PowerUp(x, y, type);
    }

    static createComponent(type, player) {
        switch (type) {
            case 'shield': return new Shield(player);
            case 'double-shot': return new DoubleShot(player);
            default: throw new Error('Unknown power-up type: ' + type);
        }
    }
}
