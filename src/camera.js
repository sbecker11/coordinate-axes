import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Creates a new OrbitalControl with the given camera and renderer
export function createCameraControls(camera, renderer) {
    try {
        // Set up camera position
        camera.position.set(7, 7, 7);
        camera.lookAt(0, 0, 0);
    
        // Set up OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Add smooth damping effect
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 5;
        controls.maxDistance = 50;
        controls.maxPolarAngle = Math.PI; // Allow full vertical rotation
        controls.minPolarAngle = 0;

        return controls;
    } catch (error) {
        console.error('Error in createCamera', error);
    }
}
