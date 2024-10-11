import * as THREE from 'three';
import { createLightsAndCamera } from './lightsAndCamera.js';
import { createCoordinateGeometry } from './coordinateGeometry.js';

let scene, camera, renderer, controls, textMeshes = [];
const useTextMeshes = false;

// set up the scene with lights, camera, and coordinate geometry
function setup_scene() {
    try {   
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        controls = createLightsAndCamera(scene, camera, renderer);

        createCoordinateGeometry(scene, useTextMeshes);

        console.log('Scene setup complete');

        
    } catch (error) {
        console.error('Error during scene setup:', error);
    }
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    try {
        if (typeof controls !== 'undefined') {
            controls.update(); // Required for damping to work
        }

        // Make all text meshes always face the camera
        textMeshes.forEach(textMesh => {
            textMesh.lookAt(camera.position);
        });

        renderer.render(scene, camera);
    } catch (error) {
        console.error('Error during animation:', error);
    }
}

// Initialize and start the scene
async function initialize() {
    await setup_scene();
    animate();

    if (import.meta.env.MODE === 'development') {
        try {
            const { setupWebSocketClient } = await import('./webSocketClient.js');
            // connect to the WebSocket server in development mode
            // so client can exit if server is not running
            setupWebSocketClient('ws://localhost:3000');
        } catch (error) {
            console.error('Error loading webSocketClient.js:', error);
        }
    }
}

initialize();

console.log('Script execution complete');