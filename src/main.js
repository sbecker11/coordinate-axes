import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

import { createCameraControls } from './camera.js';
import { createLights } from './lights.js';
import { createCoordinateGeometry } from './coordinateGeometry.js';
// import { createBox } from './box.js';

// Create a canvas and append it to the document
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// Create a WebGL renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Disable autoclear, we do this manually in our animation loop.
renderer.autoClear = false;

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create camera controls
let controls = createCameraControls(camera, renderer);

// update the controls whenever the window resizes
controls.update();

// add geometry to the scene
createCoordinateGeometry(scene);

// Add lights to the scene
createLights(scene);

// Set up post-processing
const composer = new EffectComposer(renderer);

// Double resolution (twice the size of the canvas)
// sampleRatio < 1 will reduce the resolution and introduce aliasing
// sampleRatio = 1 has no effect
// sampleRatio > 1 will increase the resolution
// sampleRatio < 2 is creates a pixeated effect
// sampleRatio = 2 is optimal
// sampleRatio > 2 will probably be too slow
let sampleRatio = 2.0;
composer.setSize(canvas.width * sampleRatio, canvas.height * sampleRatio);

// Add render pass, which renders the big result to offscreen buffer
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Add shader pass to copy result from renderModel to the canvas
const copyPass = new ShaderPass(CopyShader);
copyPass.renderToScreen = true;
composer.addPass(copyPass);

// Animation loop
const animate = function () {
  requestAnimationFrame(animate);
  // since renderer.autoClear = false, we need to clear the canvas manually
  renderer.clear();

  controls.update();

  composer.render();
};

animate();