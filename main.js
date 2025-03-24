import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.module.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!THREE.WEBGL.isWebGLAvailable()) {
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

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.style.margin = '0'; // remove body margin
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.createLighting();
    this.createAsteroids();
    this.animate();
    window.addEventListener('resize', () => this.onResize());
  }

  createLighting() {
    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(50, 50, 50);
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);
  }

  createAsteroids() {
    this.asteroids = [];

    const geo = new THREE.IcosahedronGeometry(2, 1);
    for (let i = 0; i < 10; i++) {
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()) });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
      this.scene.add(mesh);
      this.asteroids.push(mesh);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.asteroids.forEach(asteroid => {
      asteroid.rotation.x += 0.01;
      asteroid.rotation.y += 0.01;
    });

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
