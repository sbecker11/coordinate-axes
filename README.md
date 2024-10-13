# the coordinate-axes app  

This JavaScript app uses the Vite and Three.js libraries to create a single-page web application that can be deployed to and hosted by GitHub pages.  

This README file has instructions for setup, development, and deployment.  

See [README-related-topics.md](README-related-topics.md) to review topics related to Vite and Three.js.  

<img src="media/coordinate-axes-v1.png">

## How to create a JavaScript app using Vite and Three.js

## What is Vite?
Vite is a build tool that aims to provide a faster and leaner development experience for modern Javascript/Node web projects. It consists of two major parts:  
* Development Mode:  
This mode provides a fast and lean development experience with features like instant server start, Hot Module Replacement (HMR), and on-demand compilation. It uses native ES modules to serve files directly, which allows for quick feedback during development.  
* Build mode:  
This mode is used for production builds. It bundles your code using Rollup, pre-configured to output optimized static assets. The build process includes features like code splitting, tree-shaking, and minification to ensure that the final output is efficient and optimized for deployment.  

## Key Features of Vite:  
* Instant Server Start: Uses native ES modules to serve files directly, allowing for instant server start.
* Lightning-Fast HMR: Hot Module Replacement (HMR) that stays fast regardless of the app size.
* Optimized Build: Uses Rollup for production builds, ensuring optimized and efficient output.
* Rich Plugin Ecosystem: Supports Rollup plugins and has its own plugin API.  

Another great thing about Vite is that you can deploy the Vite client with your app's source code so it can run as a Single-page application on Github's web site hosting service, GitHub Pages.    

## What is Three.js?   
Three.js is a cross-browser JavaScript library and API that simplifies the creation and display of animated 3D computer graphics in a web browser using WebGL. It makes it easier for developers to create 3D scenes, models, and animations.

## Key features of Three.js

* Cross-Browser Compatibility: Three.js is a JavaScript library that works across different web browsers.   
* WebGL Simplification: It simplifies the complex WebGL API, making it easier to create 3D graphics.   
* 3D Scene Creation: Allows developers to create and manipulate 3D scenes, including objects, lights, and cameras.   
* Animation Support: Provides tools for animating 3D objects and scenes.   
* Extensive Documentation: Offers comprehensive documentation and examples to help developers get started.   
* Wide Range of Features: Supports various features like shadows, textures, materials, and post-processing effects.   
*  Community and Ecosystem: Has a large community and a rich ecosystem of plugins and extensions.   
*  Can load and render complex 3D scenes, models, and animations created using any of the leading 3D modeling apps and 3D photogrammetry apps.   

# Setup the app:  

After you clone this repo to your local development environment, your project's directory structure should look like this:
```zsh
>cat package.json  
coordinate-axes/
├── README.md
├── README_related_topics.md
├── dist/
├── favicon.ico
├── index.html
├── media/
├── node_modules/
├── package-lock.json
├── package.json
├── src
│   ├── coordinateGeometry.js
│   ├── lightsAndCamera.js
│   ├── main.js
│   └── webSocketClient.js
└── vite.config.js
```
Let's start by first opening a terminal window and cd to this project's root directory and run `npm install`. This installs the packages that this project relies upon, as listed in the `dependencies` and `devDependencies` sections in `package.json`. The tree of dependent libraries are downloaded from the web and installed into the project's `node_modules` folder. 

Next, let's review the contents of the `package.json` file. It's script section should be something like this:
```json
"scripts": {
  "dev": "vite --open chrome --port 3000",
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
```
# Build and run the app in 'dev' mode

To build the app, use  
```zsh
> npm run build
```
This script calls Vite, in develop mode, to transpile the app files and report any syntax errors or missing dependencies.

If the build runs without error, you can start the app using
```zsh
> npm run dev
```
For this command Vite now runs in server mode listening on port 3000 and it serves the app that will be running on the browser at `http://localhost:3000`. When Vite starts, it notifies your local environment that all requests for port 3000 will be routed to the Vite server. The Vite server tells the browser to go to `http://localhost:3000`. The browser requests the `index.html` file and the Vite server responds with the `index.html` file.   

Once loaded onto the browser, it requests the `/src/main.js` file here:

```html
<body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
</body>
```
and the `/src/main.js` file then imports assets needed to run the app on the browser.  

The newly opened browser window should show a black background with X, Y, Z coordinates axes in R, G, and B colors, each with its coordinate plane with the same color and each with a 10x10 grid of white lines. You can use the "orbital" camera to rotate around and zoom out or in towards the scene's origin.

The 3-D scene, camera, lights, and model are created using the Three.js javascript library. The library for the Vite client is listed as `"three": "^0.158.0"` in the `dependency` section of `package.json`. 

The application's source code that creates geometry, camera, and lights are found as create functions in `src/coordinateGeometry.js`and `src/lightsAndCamera.js. `

The`src/main.js`file, which is referenced from `index.html` has the starter function, `initialize()`and the `animate()` function. The `initialize()` function calls the create functions mentioned above. Once the scene is created, it starts the animation loop using`animate()`. 

Front-end source code assets, like `index.html` and the JavaScript files are loaded into the browser . But thanks to Vite's HMR (Hot Module Replacement) feature, the Vite server detects any changes made to the original source code files, and sends them directly to the Vite client running in the browser. The Vite client updates the local copy of the assets and you can see the changes immediately in the browser window. 

Note that the terminal used to call start the Vite server in development mode is showing the Vite server's main menu, which should look something like this:  
(ignore the **CJS deprecation warning** - it is not relevant)

```(zsh)
> npm run dev

> box@1.0.0 dev
> vite --open chrome --port 3000

The CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.

  VITE v5.4.8  ready in 260 ms

  ➜  Local:   http://localhost:3000/coordinate-axes/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
Open the browser's 'View/Developer/Javascript Console' option to see the console.log statements being issued from the client app. 

When you hit ('q' + enter), or just use ('Ctrl' + c), in the Vite server's main menu, the Vite server will stop running. 

The browser's javascript console view should show connection closed errors that look like this:
``` chrome
WebSocket connection closed
webSocketClient.js:22 Retrying connection in 2 seconds... (Attempt 5/5)
```
This happens because the app running on the browser, continues to run ,and tries to reconnect to the Vite Server on port 3000 every 2 seconds. 

To kill the client, either close the browser page, or do a hard refresh (Cmd+r) on the page.  

# Deploy and run the app as a GitHub Page

## GitHub Pages  
GitHub Pages is a static site hosting service provided by GitHub. It allows you to publish web content directly from a GitHub repository. You can use it to host personal, project, or organization pages, and it supports custom domains and HTTPS.

## Key Features of GitHub Pages  
- **Free Hosting**: Host static websites directly from your GitHub repository for free.  
- **Custom Domains**: Use your own domain name for your GitHub Pages site.  
- **HTTPS Support**: Secure your site with HTTPS.  
- **Automatic Deployment**: Automatically deploy your site when you push changes to your repository.  
- **ekyll Integration**: Supports Jekyll, a static site generator, for easy site creation and management.  


### Deploying to GitHub Pages

1. **Install the `gh-pages`**:
```zsh
npm install --save-dev gh-pages
```
2. **Update `package.json`**:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. **Configure Vite for GitHub Pages**:  

Update `vite.config.js` to set the correct base path:  

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/my-repo/',  
  // Replace 'my-repo' with your repository name
  // other configurations...  
});
```
4. **Create `gh-pages` Branch**:  
```zsh
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initial commit on gh-pages branch"
git push origin gh-pages
git checkout main
```

5. **Configure GitHub Pages**:  
a. Go to your project's repository page on GitHub  
    (e.g., `https://github.com/\<username\>/\<my-repo\>`).  
b. Click on the `Settings` tab at the top right (you may need to widen your browser window to see the entire menu bar).  
c. In the left sidebar, select `Pages`.  
d. Under `Source`, select the `gh-pages` branch from the dropdown menu.  
e. Click `Save`.

6. **Predeploy and Deploy**:
```zsh
npm run predeploy
npm run deploy
```
a. predeploy  
The `predeploy` script takes the static content from the project's root folder, from the `src` folder and from the library files in `node_modules` and transpiles and bundles them into front-end asset files that it stores in the `dist` directory.
b. deploy
The `deploy` script runs the `gh-pages -d dist` command, which deploys the contents of the `dist` directory to the`gh-pages` branch of your GitHub repository. This makes your site available at `https://<username>.github.io/<my-repo>/`.

7. **Verify Deployment**:  
a. Open your web browser and go to the URL:  
`https://<username>.github.io/<my-repo>`  
b. Verify that your app is working as expected.  

8. **Open browser's `JavaScript Console` page**:
To see live output from the app running on your browser.  

## Summary  

When the app is running from GitHub Pages, it is served as static files generated by the Vite build process. There is no Vite server running in this scenario. The Vite server is only used during development to provide features like Hot Module Replacement (HMR).