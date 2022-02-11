# WebXR-Vite-Babylon-Simple

Minimal setup for WebXR development using:

* [vite](https://vitejs.dev/)
* [typescript](https://www.typescriptlang.org/)
* [vue 3](https://vuejs.org/)
* [babylonjs 5](https://www.babylonjs.com/) (ES6)

Makes minimal changes from the default vite scaffolding.

Uses the [ES6 packaging from Babylon.js](https://doc.babylonjs.com/divingDeeper/developWithBjs/treeShaking).

This repo includes enough setup so that controller models can be loaded
for [supported XR devices](https://github.com/immersive-web/webxr-input-profiles). This requires making sure the
Babylon.js GLTF/GLB loader is active.
