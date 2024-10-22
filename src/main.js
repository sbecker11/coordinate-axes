import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

// Create a canvas and append it to the document
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// Create a WebGL renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Set up camera position
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);

// Create OrbitControls with damping effect and limited vertical rotation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI; // Allow full vertical rotation
controls.minPolarAngle = 0;


controls.update();

// Create a wireframe box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const wireframeBox = new THREE.Mesh(boxGeometry, wireframeMaterial);
scene.add(wireframeBox);

// Add directional lights
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight1.position.set(100, 100, 0);
directionalLight1.lookAt(0, 0, 0);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(0, 100, 100);
directionalLight2.lookAt(0, 0, 0);
scene.add(directionalLight2);

// Add ambient light to ensure all sides of planes are visible
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Set up post-processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const copyPass = new ShaderPass(CopyShader);
copyPass.renderToScreen = true;
composer.addPass(copyPass);

// Animation loop
const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  composer.render();
};

animate();