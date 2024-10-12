# the coordinate-axes app  

This JavaScript app uses the Vite and three.js libraries to create a single-page web application that can be deployed to and hosted by GitHub pages.

This README-related-topics.md file reviews topics related to Vite and Three.js  

To continue reading instructions for setup, development, and deployment, go back to [README.md](README.md).


### What is Vite?

Vite is a build tool that aims to provide a faster and leaner development experience for modern Javascript web projects. It consists of two major parts:  
(1) Development Mode:  
This mode provides a fast and lean development experience with features like instant server start, Hot Module Replacement (HMR), and on-demand compilation. It uses native ES modules to serve files directly, which allows for quick feedback during development.  
(2) Build mode:  
This mode is used for production builds. It bundles your code using Rollup, pre-configured to output optimized static assets. The build process includes features like code splitting, tree-shaking, and minification to ensure that the final output is efficient and optimized for deployment.  

### Key Features of Vite:  
* Instant Server Start: Uses native ES modules to serve files directly, allowing for instant server start.
* Lightning-Fast HMR: Hot Module Replacement (HMR) that stays fast regardless of the app size.
* Optimized Build: Uses Rollup for production builds, ensuring optimized and efficient output.
* Rich Plugin Ecosystem: Supports Rollup plugins and has its own plugin API.  

Another great thing about Vite is that you can deploy it with your app's source code to your GitHub Page. More on that later.    

### Vite alternatives    
* Webpack  
* Parcel  
* Snowpack  
* Rollup  
* esbuild  

##### JavaScript app frameworks  
These tools are primarily designed for bundling front-end assets for web apps built using Javascript frameworks like: 
* Vue; Often used with Vite or Webpack.  
* React: Commonly used with Webpack, Parcel, or Vite.  
* Angular: Typically uses its own CLI tool, which is built on top of Webpack.  

##### Python app frameworks  
In contrast, the Python stack has app frameworks that use the same front-end asset bundling tools:  
* Flask  
* Django  
* FastAPI  

#### General-purpose Python tools:   
* Pyinstaller: Used to bundle Python applications into stand-alone executables  
* Pipenv: Uses pip and virtualenv to manage Python dependencies and virtual environments.  

#### Finally, PHP tools and frameworks include:  
* Laravel and Sympfony: popular PHP frameworks for building web applications.   
* Composer a dependency manager for PHP, similar to npm for JavaScript or pip for Python.

#### WordPress is a content management system (CMS) built on PHP. It is not a framework or a dependency manager, but rather a full-fledged application that provides a platform for creating and managing websites, blogs, and other types of content.  

## Three.js:  
This example JavaScript app uses the Three.js library, which lets you create and view 3D models in your browser. 

#### Three.js alternatives include:    
* Babylon.js: A powerful, open-source 3D engine that supports WebGL and WebGPU. It provides a comprehensive set of features for creating complex 3D scenes and games.  
*  A-Frame: A web framework for building virtual reality (VR) experiences. It is built on top of Three.js and provides an easy-to-use, declarative HTML-like syntax.  
*  PlayCanvas: A game engine that provides a visual development environment and a powerful JavaScript API for creating 3D content.  
*  p5.js: A JavaScript library that makes it easy to create 3D graphics and interactive content. It is built on top of WebGL and provides a simple API for drawing and animating 3D objects.  

### 3D Modeling Applications:  
1. **Blender**: An open-source and free 3D modeling application that offers a comprehensive suite of tools for modeling, animation, rendering, and more.
2. **Autodesk Maya**: A professional 3D modeling and animation software used extensively in the film, television, and gaming industries.
3. **Autodesk 3ds Max**: A professional 3D modeling and animation software commonly used in game development, architectural visualization, and virtual reality.

#### Formats that Three.js can load    
Three.js has the ability to load 3D scenes, cameras, and geometry created using these 3D modeling applications. These formats include:  
* GLTF/GLB: The GL Transmission Format (GLTF) is a popular format for 3D models that is efficient and widely supported. 
* OBJ: A simple and widely-used format for 3D models. 
* FBX: A format commonly used in the film and game industries.
* Collada (DAE): An XML-based format for 3D models. 
* X3D (Extensible 3D): Another XML-based format that replaced the old VRML (Virtual Reality Modeling Language) standard used in the 1990s.

### Photogrammetry Applications
Modern photogrammetry applications like Agisoft Metashape, RealityCapture, Meshroom, Autodesk ReCap, and 3DF Zephyr can create 3D models from images captured with a digital SLR camera or a mobile phone. These applications support various 3D data formats that can be loaded by three.js