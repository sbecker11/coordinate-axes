import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Function to create and return a text mesh
export function createTextMesh(label, position, color) {
    return new Promise((resolve, reject) => {
        const loader = new FontLoader();
        loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

            const textGeometry = new THREE.TextGeometry(label, {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: color });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Position the text mesh near the corresponding axis cone
            textMesh.position.set(position.x, position.y, position.z);

            console.info('promise resolved');
            resolve(textMesh);
        }, undefined, function (error) {
            console.error(`promise rejected on error ${error}`);
            reject(error);
        });
    });
