import * as THREE from 'three';

const planeSize = 10;
const gridDivisions = 10;
const opacity = 0.75;

const coneHeight = 0.5;
const coneRadius = 0.2;
const axisLength = planeSize / 2 + coneHeight / 2;
const axisRadius = 0.05;

const xVector = new THREE.Vector3(1, 0, 0);
const yVector = new THREE.Vector3(0, 1, 0);
const zVector = new THREE.Vector3(0, 0, 1);
const xColor = 0xff0000;
const yColor = 0x00ff00;
const zColor = 0x0000ff;
const whiteColor = 0xffffff;

// create a plane at Y=0 with Y+ surface normal 
class PlaneYGeometry extends THREE.Group {
    constructor(planeSize, opacity, color) {
        super();

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(planeSize, planeSize),
            new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: opacity })
        );
        plane.rotation.x = -Math.PI / 2; // Rotate to align with Y=0 plane
        this.add(plane);
    }
}

// create grid lines in the Y=0 plane with Y+ surface normal 
class GridYGeometry extends THREE.Group {
    constructor(planeSize, divisions, color) {
        super();

        const step = planeSize / divisions;
        const halfPlaneSize = planeSize / 2;
        const lineWidth = 0.02;

        const material = new THREE.LineBasicMaterial({ color: color });

        for (let i = 0; i <= divisions; i++) {
            const offset = -halfPlaneSize + i * step;

            // Lines parallel to X-axis
            const geometryX = new THREE.CylinderGeometry(lineWidth, lineWidth, planeSize, 32);
            const lineX = new THREE.Mesh(geometryX, material);
            lineX.position.set(0, 0, offset);
            lineX.rotation.z = -Math.PI / 2; // Rotate to align with X-axis
            this.add(lineX);

            // Lines parallel to Z-axis
            const geometryZ = new THREE.CylinderGeometry(lineWidth, lineWidth, planeSize, 32);
            const lineZ = new THREE.Mesh(geometryZ, material);
            lineZ.position.set(offset, 0, 0);
            lineZ.rotation.x = Math.PI / 2; // Rotate to align with X-axis
            this.add(lineZ);
        }
    }
}

// create Y axis lines with a cone at +Y 
class AxisYGeometry extends THREE.Group {
    constructor(axisRadius, coneRadius, coneHeight, axisLength, color) {
        super();

        // Axis material
        this.axisMaterial = new THREE.MeshPhongMaterial({ color: color });

        // Axis cylinder
        const axisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength * 2 + coneHeight, 32);
        const axis = new THREE.Mesh(axisGeometry, this.axisMaterial);
        this.add(axis);

        // Axis cone
        const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight);
        const cone = new THREE.Mesh(coneGeometry, this.axisMaterial);
        cone.position.y = axisLength + coneHeight / 2;
        this.add(cone);
    }
}

class CoordinatePlaneGeometry extends THREE.Group {
    constructor(axisVector, planeSize, gridDivisions, opacity, axisRadius, coneRadius, coneHeight, axisLength, color) {
        super();

        const planeYGeom = new PlaneYGeometry(planeSize, opacity, color);
        this.add(planeYGeom);

        const gridYGeom = new GridYGeometry(planeSize, gridDivisions, whiteColor);
        this.add(gridYGeom);

        const axisYGeom = new AxisYGeometry(axisRadius, coneRadius, coneHeight, axisLength, color);
        this.add(axisYGeom);

        // Position and rotate the group based on the axis vector
        if (axisVector.equals(xVector)) {
            this.rotation.z = -Math.PI / 2;
        } else if (axisVector.equals(zVector)) {
            this.rotation.x = Math.PI / 2;
        }
    }
}

// Create planes and grids for each coordinate axis
export function createCoordinateGeometry(scene) {
    try {
        const xGeom = new CoordinatePlaneGeometry(xVector, planeSize, gridDivisions, opacity, axisRadius, coneRadius, coneHeight, axisLength, xColor);
        scene.add(xGeom);

        const yGeom = new CoordinatePlaneGeometry(yVector, planeSize, gridDivisions, opacity, axisRadius, coneRadius, coneHeight, axisLength, yColor);
        scene.add(yGeom);

        const zGeom = new CoordinatePlaneGeometry(zVector, planeSize, gridDivisions, opacity, axisRadius, coneRadius, coneHeight, axisLength, zColor);
        scene.add(zGeom);
    
    } catch (error) {
        console.error('Error in createCoordinateGeometry', error);
    }
}

