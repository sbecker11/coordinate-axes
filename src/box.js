import * as THREE from 'three';

// Create a wireframe box and add it to the scene
export function createBox(scene) {
    try {
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        const wireframeBox = new THREE.Mesh(boxGeometry, wireframeMaterial);
        scene.add(wireframeBox);
    } catch (error) {
        console.error('Error in createBox', error);
    }
}
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const wireframeBox = new THREE.Mesh(boxGeometry, wireframeMaterial);
scene.add(wireframeBox);
