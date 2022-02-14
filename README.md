# WebXR-Vite-Babylon-Simple

Minimal setup for WebXR development using:

* [vite](https://vitejs.dev/)
* [typescript](https://www.typescriptlang.org/)
* [vue 3](https://vuejs.org/)
* [babylonjs 5](https://www.babylonjs.com/) (ES6)

Intentionally made minimal changes from the default vite scaffolding.

Uses the [ES6 packaging from Babylon.js](https://doc.babylonjs.com/divingDeeper/developWithBjs/treeShaking) and tree
shaking. With this repo and babylon.js 5.0.0-beta.7, vite is reporting a vendor build size of 2.5MB (562k gzipped). If
importing all of @babylonjs/core, the build size goes to ~4MB.

This repo includes enough setup so that controller models can be loaded
for [supported XR devices](https://github.com/immersive-web/webxr-input-profiles). This requires making sure the
GLTF/GLB loader is active.

## Notes

Setup has become straight-forward in recent Babylon.js 5.x beta releases. What required the most time was figuring out
the correct ES6 imports to allow for optimal tree shaking. (If tree shaking is not needed, simply importing everything
from @babylonjs/core works.)

Relevant files:

* [package.json](package.json) - @babylonjs/core, @babylonjs/loaders, & @types/webxr
* [TestView001.vue](src/components/TestView001.vue) - Shows minor vue and typescript typing details
* [TestScene001.ts](src/js/TestScene001.ts) - Shows the ES6 imports

A more advanced project (with a more opinionated setup) is located here:
* https://github.com/kaliatech/webxr-tests-3

## Usage

Developed and tested with node 16.x, but 14.x probably works too.

- `npm install`
- `npm run dev`

Or, to allow access over network:

- `npm run dev -- --host=0.0.0.0`

Browse:

- `https://<your-server-ip>:3443`

HTTPS security warnings are expected. Certain WebXR functionality requires HTTPS, but it seems to work with self-signed
certs, at least on Oculus Quest 2.

Be sure that host firewall allows 3443. And if using docker, that any port redirects are setup, etc.

The code adds an [ArcRotateCamera](https://doc.babylonjs.com/typedoc/classes/babylon.arcrotatecamera) for the initial
non-immersive view to allow moving around scene with a mouse. To interact in an immersive view on a desktop browser, the
[WebXR emulator extension](https://github.com/MozillaReality/WebXR-emulator-extension) works. However, it's cumbersome
to use.

The vite dev server will automatically rebuild and hot reload source changes, almost instantly.

To fully validate the typescript types and check resulting dist bundle sizes:

- `npm run build`

## ScreenShot

Screenshot from within Meta/Oculus Quest 2 browser (v37, 2022-02):

![screenshot](docs/screenshot1.jpg)
