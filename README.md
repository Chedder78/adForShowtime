# Asteroids Again! - Modular HTML5 Canvas Game

Welcome to **Asteroids Again!**, a fully modular and extensible reimagining of the classic Asteroids game using modern **HTML5 Canvas** and **Vanilla JavaScript**.

This project focuses on clean architecture, scalability, and game feature extensibility, including a component-driven power-up system, modular managers, and an easy-to-extend codebase.

---

## Features
- Modular ES6 architecture (OOP)
- Component-based **Power-Up System** (e.g., Shield, Double Shot)
- Custom **HUD** displaying real-time power-up status
- Smooth player controls with screen wrap
- Bullet management with cooldown system
- Progressive asteroid spawner (infinite waves)
- Collision detection (player + power-ups)
- Easily extendable for new power-ups or game mechanics

---

## Folder Structure

```
/src
 ├── index.html               # Main HTML file
 ├── main.js                  # Entry point (initializes game)
 ├── /managers                # Game systems (GameManager, PowerUpManager, etc.)
 ├── /entities                # Player, Bullet, Asteroid, PowerUp base class
 ├── /components              # Power-up components (Shield, DoubleShot, etc.)
 ├── /factories               # PowerUpFactory for instantiating power-ups
 ├── /utils                   # EventEmitter and helpers
 └── /assets                  # Future assets (images, sounds)
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/asteroids2.git
cd asteroids2
```

### 2. Open `index.html` in your browser
You can simply double-click `src/index.html` or use a local server for best results:

```bash
npx serve src
# or with Python:
python -m http.server
```

---

## Controls
- **Arrow Left / Right**: Rotate ship
- **Arrow Up**: Thrust forward
- **Spacebar**: Fire bullets
- **Collect Power-ups**: Gain temporary upgrades!

---

## Power-Ups Implemented
- **Shield**: Temporary invincibility (visual cyan aura)
- **Double Shot**: Fires two bullets per shot for a limited time

All power-ups are shown on the HUD with remaining duration timers.

---

## Extending the Game
To add new power-ups:
1. Create a new component in `/src/components/`
2. Register it in `PowerUpFactory.js`
3. That's it! It will now spawn randomly.

For example:
```js
case 'speed-boost': return new SpeedBoost(player);
```

---

## Contributions
Feel free to fork this project and submit pull requests for:
- New power-ups (e.g., Slow-Mo, Homing Missiles)
- Particle FX / Sound Integration
- Game balancing improvements

---

## License
Creative Commons License  
(c) 2025 CaliDef

---

## Credits
- Base inspiration from the classic **Asteroids** arcade game
- Built with modern **HTML5 Canvas API** & **Vanilla JavaScript**

---
