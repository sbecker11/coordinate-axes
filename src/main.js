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

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05;
controls.update();

// Create a wireframe box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const wireframeBox = new THREE.Mesh(boxGeometry, wireframeMaterial);
scene.add(wireframeBox);

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