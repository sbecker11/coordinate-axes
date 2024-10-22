import * as THREE from 'three';
import { createLightsAndCamera } from './lightsAndCamera.js';
import { createCoordinateGeometry } from './coordinateGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

let scene, camera, controls, canvas, renderer;

let antialias = true;
let composer;
let renderModel;
let effectCopy;

// // Double resolution (twice the size of the canvas)
let sampleRatio = 1;

// set up the scene with lights, camera, and coordinate geometry
async function setup_scene() {
    try {   
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        renderer = new THREE.WebGLRenderer({canvas: canvas});
        renderer.setSize(window.innerWidth, window.innerHeight);

        if ( antialias ) {
            // antialiasing trick from 
            // https://stackoverflow.com/questions/15409321/super-sample-antialiasing-with-threejs
            // standard postprocessing setup
            // https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing
            
            // Disable autoclear, we do this manually in our animation loop.
            renderer.autoClear = false;
            
            // This render pass will render the big result.
            console.log(`typeof THREE.EffectComposer: ${typeof THREE.EffectComposer}`);     
            renderModel = new THREE.RenderPass(scene, camera);
            
            // Shader to copy result from renderModel to the canvas
            effectCopy = new THREE.ShaderPass(THREE.CopyShader);
            effectCopy.renderToScreen = true;
            
            // The composer will compose a result for the actual drawing canvas.
            composer = new THREE.EffectComposer(renderer);
            composer.setSize(canvas.width * sampleRatio, canvas.height * sampleRatio);
            
            // Add passes to the composer.
            composer.addPass(renderModel);
            composer.addPass(effectCopy);
        } 
        
        document.body.appendChild(renderer.domElement);

        controls = createLightsAndCamera(scene, camera, renderer);

        createCoordinateGeometry(scene);

    } catch (error) {
        console.error('Error during scene setup:', error);
    }
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    try {
        if (typeof controls !== 'undefined') {
            controls.update(); // Required for damping to work
        }

        if ( antialias ) {
            // Manually clear you canvas.
            renderer.clear();

            // Tell the composer to produce an image for us. It will provide our renderer with the result.
            composer.render();
        } else {
            renderer.render(scene, camera);
        }

        requestAnimationFrame(animate);

    } catch (error) {
        console.error('Error during animation:', error);
    }
}

// Initialize and start the scene
async function initialize() {
    setup_scene();

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