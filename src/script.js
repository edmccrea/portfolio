import './style.css';
import * as THREE from 'three';

// Texture Loader
const loader = new THREE.TextureLoader();
const cross = loader.load('./cross.png');

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects

const particles = new THREE.BufferGeometry();
const particlesCount = 1000;

const positionArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 6;
}

particles.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

// Materials

const material = new THREE.PointsMaterial({
  size: 0.008,
  map: cross,
  transparent: true,
});

// Mesh
const particlesMesh = new THREE.Points(particles, material);
scene.add(particlesMesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color('#192841'), 1);

//Mouse

let timer;
let mouseMoving = false;

function mouseStopped() {
  mouseMoving = false;
}

window.addEventListener('mousemove', function () {
  mouseMoving = true;
  clearTimeout(timer);
  timer = setTimeout(mouseStopped, 100);
});

const starfield = document.querySelector('.starfield');
const landing = document.querySelectorAll('.starfield-control');
landing.forEach((item) => item.addEventListener('mousemove', animateParticles));

let isOnDiv = false;
starfield.addEventListener('mouseenter', function () {
  isOnDiv = true;
});
starfield.addEventListener('mouseout', function () {
  isOnDiv = false;
});

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
  mouseY = event.clientY;
  mouseX = event.clientX;
}

/**
 * Animate
 */

const tick = () => {
  // Update objects
  if (!isOnDiv || !mouseMoving) {
    particlesMesh.rotation.y += -0.1 * 0.04;
  }
  if (isOnDiv && mouseMoving) {
    particlesMesh.rotation.x = -mouseY * 0.0008;
    particlesMesh.rotation.y = -mouseX * 0.0008;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
