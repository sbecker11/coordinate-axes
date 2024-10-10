import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

let scene, camera, renderer, controls;

try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create planes for each axis
    const planeSize = 10;

    // X-axis plane (red)
    const xPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(planeSize, planeSize),
      new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
    );
    xPlane.rotation.y = Math.PI / 2;
    scene.add(xPlane);

    // Y-axis plane (green)
    const yPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(planeSize, planeSize),
      new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
    );
    yPlane.rotation.x = Math.PI / 2;
    scene.add(yPlane);

    // Z-axis plane (blue)
    const zPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(planeSize, planeSize),
      new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
    );
    scene.add(zPlane);

    // Add grids
    const gridHelper = new THREE.GridHelper(planeSize, 10, 0xffffff, 0xffffff);
    scene.add(gridHelper);

    const gridHelperXZ = gridHelper.clone();
    gridHelperXZ.rotation.x = Math.PI / 2;
    scene.add(gridHelperXZ);

    const gridHelperYZ = gridHelper.clone();
    gridHelperYZ.rotation.z = Math.PI / 2;
    scene.add(gridHelperYZ);

    // Add coordinate axes
    const coneHeight = 0.5;
    const coneRadius = 0.2;
    const axisLength = planeSize / 2 + coneHeight / 2;
    const axisRadius = 0.05;

    // X-axis (red)
    const xAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength * 2 + coneHeight, 32);
    const xAxisMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const xAxis = new THREE.Mesh(xAxisGeometry, xAxisMaterial);
    xAxis.rotation.z = -Math.PI / 2;
    scene.add(xAxis);

    const xConeGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 32);
    const xCone = new THREE.Mesh(xConeGeometry, xAxisMaterial);
    xCone.position.x = axisLength + coneHeight / 2;
    xCone.rotation.z = -Math.PI / 2;
    scene.add(xCone);

    // Y-axis (green)
    const yAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength * 2 + coneHeight, 32);
    const yAxisMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const yAxis = new THREE.Mesh(yAxisGeometry, yAxisMaterial);
    scene.add(yAxis);

    const yConeGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 32);
    const yCone = new THREE.Mesh(yConeGeometry, yAxisMaterial);
    yCone.position.y = axisLength + coneHeight / 2;
    scene.add(yCone);

    // Z-axis (blue)
    const zAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength * 2 + coneHeight, 32);
    const zAxisMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const zAxis = new THREE.Mesh(zAxisGeometry, zAxisMaterial);
    zAxis.rotation.x = Math.PI / 2;
    scene.add(zAxis);

    const zConeGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 32);
    const zCone = new THREE.Mesh(zConeGeometry, zAxisMaterial);
    zCone.position.z = axisLength + coneHeight / 2;
    zCone.rotation.x = Math.PI / 2;
    scene.add(zCone);

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

    // Set up camera position
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);

    // Set up OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Add smooth damping effect
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI; // Allow full vertical rotation
    controls.minPolarAngle = 0;

    console.log('Scene setup complete');

} catch (error) {
    console.error('Error during scene setup:', error);
}

// Load font and add 3D text
try {
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
        const textOptions = {
            font: font,
            size: 0.5,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: false
        };

        // X text
        const xTextGeometry = new TextGeometry('X', textOptions);
        const xTextMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const xText = new THREE.Mesh(xTextGeometry, xTextMaterial);
        xText.position.set(axisLength + coneHeight + 0.2, 0, 0);
        xText.rotation.y = -Math.PI / 4;
        scene.add(xText);

        // Y text
        const yTextGeometry = new TextGeometry('Y', textOptions);
        const yTextMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const yText = new THREE.Mesh(yTextGeometry, yTextMaterial);
        yText.position.set(0, axisLength + coneHeight + 0.2, 0);
        yText.rotation.x = Math.PI / 4;
        scene.add(yText);

        // Z text
        const zTextGeometry = new TextGeometry('Z', textOptions);
        const zTextMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        const zText = new THREE.Mesh(zTextGeometry, zTextMaterial);
        zText.position.set(0, 0, axisLength + coneHeight + 0.2);
        zText.rotation.y = Math.PI / 4;
        scene.add(zText);

        console.log('3D text added successfully');
    }, undefined, function(error) {
        console.error('Error loading font:', error);
    });
} catch (error) {
    console.error('Error during font loading or text creation:', error);
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    try {
        controls.update(); // Required for damping to work
        renderer.render(scene, camera);
    } catch (error) {
        console.error('Error during animation:', error);
    }
}

animate();

console.log('Script execution complete');