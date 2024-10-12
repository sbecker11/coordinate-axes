# the coordinate-axes app  

This JavaScript app uses the Vite and three.js libraries to create a single-page web application that can be deployed to and hosted by GitHub pages.  

This README file has instructions for setup, development, and deployment.  

See [README-related-topics.md](README-related-topics.md) to review topics related to Vite and Three.js.  

<img src="media/coordinate-axes-v1.png">

## How to create a JavaScript app using Vite and Three.js

### What is Vite?
Vite is a build tool that aims to provide a faster and leaner development experience for modern Javascript/Node web projects. It consists of two major parts:  
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


Installation:  

After you clone this repo, your project's directory structure should be
```
coordinate-axes/
├── README.md
├── dist/
├── favicon.ico
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── src/
│   ├── coordinateGeometry.js
│   ├── lightsAndCamera.js
│   ├── main.js
│   └── webSocketClient.js
└── vite.config.js
```
Let's start by reviewing the contents of the `package.json` file. It's script section should be something like this:
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vite --open chrome --port 3000",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
```
Open a terminal window and cd to this project's root directory.  
Run `npm install` to install the packages that this project relies upon, as listed in the `dependencies` sections in `package.json`. These packages are installed into the apps `node_modules` folder. 

Next, to build the app, use `npm run build`. This script calls Vite, in develop mode, to report any syntax errors or missing dependent packages as it compiles the app files and its dependent packages.

If the build runs without error, you can start the app using `npm run dev`. Vite now runs in server mode listening on port 3000. It serves the app at `http://localhost:3000`. Your local environment is notified that requests for port 3000 will be routed to the Vite server. The browser requests the `index.html` file, which starts loading front-end assets from the Vite server via reference calls. These assets include the Vite client, which is called from the main body of `index.html`. The Vite client script handles requests for port 3000, which are directed back to the Vite server. 

The newly opened browser window should show a black backgrond with X, Y, Z coordinates axes in R, G, and B colors, each with its coordinate plane with the same color and with a 10x10 grid of white lines. You can use the "orbital" camera to rotate around and zoom towards the 3D model.

The 3-D scene, camera, lights, and model are created using the THREE.js javascript library. This library is listed as  `"three": "^0.158.0"` in the `dependency` section of `package.json`.  The library for the Vite client is listed as `"vite": "^5.4.8"`.  

Our source code that creates geometry, camera, and lights are found as create functions in `src/coordinateGeometry.js`and `src/lightsAndCamera.js. `

The`src/main.js`file has the starter function, `initialize()`. This function calls the create functions mentioned above. Once the scene is created, it launches the animation loop using`animate()`. 

Front-end assets are loaded into the browser , but thanks to Vite's HMR (Hot Module Replacement) feature, the Vite server forwards any changes made to the original source code in your project, directly to the Vite client running in the browser. The Vite client updates the local copy of the assets and you can see the changes in the browser window. 

Use the browser's 'View / Developer / Javascript Console' option to see the console.log statements being issued from the app code running in the browser.

Note that the terminal used to call `npm run start` now shows the Vite server's main menu, which should look something like this:

'''
> npm run start

> box@1.0.0 start
> vite --open chrome --port 3000

The CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.

  VITE v5.4.8  ready in 405 msh

  ➜  Local:   http://localhost:3000/coordinate-axes/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

Hit 'h' + enter to see its help menu.
'''

If you hit 'q' + enter (or just use Ctrl+c) the Vite server will stop running. The client app running in the browser keeps running and tries to reconnect to the Vite Server on port 3000. To kill the client, either close the browser page, or do a hard refresh (Cmd+r) on the page.



2 if you haven't done so already create your package.json file
2 create a branch named 'gh-pages'
3 install gh-pages and vite to 
