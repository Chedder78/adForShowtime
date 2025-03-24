import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.module.js';
import { EffectComposer } from './EffectComposer.module.js';
import { RenderPass } from './RenderPass.module.js';
import { UnrealBloomPass } from './UnrealBloomPass.module.js';
import { WebGL } from './WebGL.module.js'; // Assuming you have this utility

document.addEventListener('DOMContentLoaded', () => {
  if (!WebGL.isWebGLAvailable()) {
    alert('WebGL not supported on this device.');
  } else {
    new SpaceScene();
  }
});

class SpaceScene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.z = 50;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(this.renderer.domElement);

    this.manager = new THREE.LoadingManager();
    this.isWarping = false;
    this.warpSpeed = 0;
    this.maxWarpSpeed = 5;
    this.acceleration = 0.2;
    this.speed = 1.5;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;

    this.asteroids = []; // Populate this later with meshes

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.setupLoadingManager();
    this.createStartScreen();
    this.setupEventListeners();
  }

  setupLoadingManager() {
    this.manager.onStart = () => console.log("Loading started");
    this.manager.onLoad = () => console.log("All assets loaded");
  }

  createStartScreen() {
    const startScreen = document.createElement('div');
    startScreen.id = 'start-screen';
    startScreen.innerHTML = `
      <button id="start-button">Start</button>
    `;
    document.body.appendChild(startScreen);

    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
      document.body.removeChild(startScreen);
      this.initializeScene();
    });
  }

  initializeScene() {
    this.setupBloomEffect();
    this.setupTiltEffect();
    this.setupRaycaster();
    this.setupSettingsPanel();
    this.setupAnimationLoop();
  }

  setupBloomEffect() {
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    bloomPass.threshold = 0.1;
    bloomPass.strength = 1.5;
    bloomPass.radius = 0.5;

    const composer = new EffectComposer(this.renderer);
    composer.addPass(new RenderPass(this.scene, this.camera));
    composer.addPass(bloomPass);
    this.composer = composer;
  }

  setupAnimationLoop() {
    const animate = () => {
      requestAnimationFrame(animate);

      if (this.isWarping) {
        this.warpSpeed += this.acceleration;
        if (this.warpSpeed > this.maxWarpSpeed) this.warpSpeed = this.maxWarpSpeed;
        this.camera.position.z -= this.warpSpeed;
        if (this.camera.position.z < -1000) {
          this.isWarping = false;
          this.warpSpeed = 0;
          this.camera.position.z = 50;
        }
      }

      if (this.moveLeft) this.camera.position.x -= this.speed;
      if (this.moveRight) this.camera.position.x += this.speed;
      if (this.moveUp) this.camera.position.y += this.speed;
      if (this.moveDown) this.camera.position.y -= this.speed;

      this.controls.update();
      this.composer.render();
    };
    animate();
  }

  setupTiltEffect() {
    const tiltContainer = document.createElement('div');
    tiltContainer.id = 'tilt-container';
    tiltContainer.style.position = 'absolute';
    tiltContainer.style.top = '0';
    tiltContainer.style.left = '0';
    tiltContainer.style.width = '100%';
    tiltContainer.style.height = '100%';
    tiltContainer.style.perspective = '1000px';
    document.body.appendChild(tiltContainer);

    tiltContainer.appendChild(this.renderer.domElement);

    document.addEventListener('mousemove', (event) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const rotateX = ((centerY - mouseY) / centerY) * 15;
      const rotateY = ((mouseX - centerX) / centerX) * 15;
      tiltContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  setupSettingsPanel() {
    const settingsPanel = document.createElement('div');
    settingsPanel.id = 'settings-panel';
    settingsPanel.style.position = 'absolute';
    settingsPanel.style.bottom = '20px';
    settingsPanel.style.right = '20px';
    settingsPanel.style.backgroundColor = 'rgba(0,0,0,0.6)';
    settingsPanel.style.padding = '10px';
    settingsPanel.style.color = '#fff';
    settingsPanel.innerHTML = '<label>Move Speed:</label>';

    const speedSlider = document.createElement('input');
    speedSlider.type = 'range';
    speedSlider.min = '0.5';
    speedSlider.max = '5';
    speedSlider.step = '0.1';
    speedSlider.value = this.speed;
    speedSlider.addEventListener('input', () => {
      this.speed = parseFloat(speedSlider.value);
    });

    settingsPanel.appendChild(speedSlider);
    document.body.appendChild(settingsPanel);
  }

  setupRaycaster() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('click', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);

      const intersects = raycaster.intersectObjects(this.asteroids);
      if (intersects.length > 0) {
        const clickedAsteroid = intersects[0].object;
        alert(`You clicked on an asteroid with color: ${clickedAsteroid.material.color.getHexString()}`);
      }
    });
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());

    window.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') this.moveLeft = true;
      if (event.key === 'ArrowRight') this.moveRight = true;
      if (event.key === 'ArrowUp') this.moveUp = true;
      if (event.key === 'ArrowDown') this.moveDown = true;
    });

    window.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowLeft') this.moveLeft = false;
      if (event.key === 'ArrowRight') this.moveRight = false;
      if (event.key === 'ArrowUp') this.moveUp = false;
      if (event.key === 'ArrowDown') this.moveDown = false;
    });

    window.addEventListener('click', () => {
      if (!this.isWarping) {
        this.isWarping = true;
      }
    });
  }

  resizeCanvas() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }
}
