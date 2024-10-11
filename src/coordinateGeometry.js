import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Create planes for each axis and text labels for each axis
export function createCoordinateGeometry(scene, useTextMeshes=false) {

    try {
        const planeSize = 10;
        const gridDivisions = 10;

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
        const gridHelper = new THREE.GridHelper(planeSize, gridDivisions, 0xffffff, 0xffffff);
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

        if (useTextMeshes) {
            const textMeshX = createTextMesh('X', { x: axisLength + coneHeight + 1, y: 0, z: 0 }, 0xff0000);
            textMeshes.push(textMeshX);
            scene.add(textMeshX);
        }

        // Y-axis (green)
        const yAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength * 2 + coneHeight, 32);
        const yAxisMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const yAxis = new THREE.Mesh(yAxisGeometry, yAxisMaterial);
        scene.add(yAxis);

        const yConeGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 32);
        const yCone = new THREE.Mesh(yConeGeometry, yAxisMaterial);
        yCone.position.y = axisLength + coneHeight / 2;
        scene.add(yCone);

        if (useTextMeshes) {
            const textMeshY = createTextMesh('Y', { x: 0, y: axisLength + coneHeight + 1, z: 0 }, 0x00ff00);
            textMeshes.push(textMeshY);
            scene.add(textMeshY);
        }

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
    
        if ( useTextMeshes ) {
            const textMeshZ = createTextMesh('Z', { x: 0, y: 0, z: axisLength + coneHeight + 1 }, 0x0000ff);
            textMeshes.push(textMeshZ);
            scene.add(textMeshZ);
        }

    } catch (error) {
        console.error('Error in createPlanesAndAxes', error);
    }
}

// Function to create and return a text mesh
function createTextMesh(label, position, color) {
    const loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new THREE.TextGeometry(label, {
            font: font,
            size: 1,
            height: 0.1,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: color });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text mesh near the corresponding axis cone
        textMesh.position.set(position.x, position.y, position.z);

        // Return the text mesh
        return textMesh;
    });
}
