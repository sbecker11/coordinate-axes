import * as THREE from 'three';

export function createLights(scene) {
    try {
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
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);
    
    } catch (error) {
        console.error('Error in createLights', error);
    }
}
