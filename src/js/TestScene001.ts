import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js'
import { AxesViewer } from "@babylonjs/core/Debug/axesViewer.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { Engine } from '@babylonjs/core/Engines/engine.js'
import { EnvironmentHelper } from '@babylonjs/core/Helpers/environmentHelper'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js'
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { Scene } from '@babylonjs/core/scene.js'
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";

import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience.js'

// Required for EnvironmentHelper
import "@babylonjs/core/Materials/Textures/Loaders"

// Required for loading controller models from WebXR registry
import '@babylonjs/loaders/glTF'

// Without this next import, error message when loading controller models:
//  "Build of NodeMaterial failed" error when loading controller model"
//  "Uncaught (in promise) Build of NodeMaterial failed: input rgba from block FragmentOutput[FragmentOutputBlock] is not connected and is not optional."
import '@babylonjs/core/Materials/Node/Blocks'

// Import animatable side effects with recent babylon v5.0.x releases for
// loading controllers, else:
//  "TypeError: sceneToRenderTo.beginAnimation is not a function
//   at WebXRMotionControllerTeleportation2._createDefaultTargetMesh (WebXRControllerTeleportation.ts:751:29)"
import '@babylonjs/core/Animations/animatable'

export class TestScene001 {
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  async setup(): Promise<Engine> {
    // Load the 3D engine
    const babylonEngine = new Engine(this.canvas, true)

    // Create default scene
    const scene = new Scene(babylonEngine)

    // Create a default environment (skybox, ground mesh, etc)
    const envHelper = new EnvironmentHelper({
      skyboxSize: 30,
      groundColor: new Color3(0.5, 0.5, 0.5),
    }, scene)

    // Add axes viewer with 1 unit lengths
    new AxesViewer(scene, 1)

    // Add a camera for the 2D viewer
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)

    // Add a simple light
    const light = new HemisphericLight('light1', new Vector3(0, 2, 0), scene)
    light.intensity = 0.7

    const sphereD = 1.0
    const sphereR = sphereD / 2.0

    // Add three 1 unit spheres, X(R), Y(G), Z(B)
    const sphere = MeshBuilder.CreateSphere('xSphere', { segments: 16, diameter: sphereD }, scene)
    sphere.position.x = sphereD + sphereR
    sphere.position.y = sphereR
    sphere.position.z = 0
    const rMat = new StandardMaterial("matR", scene)
    rMat.diffuseColor = new Color3(1.0, 0, 0)
    sphere.material = rMat

    const sphere3 = sphere.clone("ySphere", null)
    sphere3.position.x = 0
    sphere3.position.y = sphereD + sphereR
    sphere3.position.z = 0
    const gMat = new StandardMaterial("matB", scene)
    gMat.diffuseColor = new Color3(0, 1.0, 0)
    sphere3.material = gMat

    const sphere2 = sphere.clone("zSphere")
    sphere2.position.x = 0
    sphere2.position.y = sphereR
    sphere2.position.z = sphereD + sphereR
    const bMat = new StandardMaterial("matG", scene)
    bMat.diffuseColor = new Color3(0, 0, 1.0)
    sphere2.material = bMat

    // An alternative to get teleportation without using scene.createDefaultEnvironment:
    // var ground = MeshBuilder.CreateGround("ground", {
    //   width: 15,
    //   height: 15
    // }, scene);

    // Setup default WebXR experience
    const xrHelper = await WebXRDefaultExperience.CreateAsync(scene, {
      floorMeshes: [envHelper?.ground as Mesh],
      optionalFeatures: true,
    })

    // Run render loop to render future frames.
    babylonEngine.runRenderLoop(function () {
      if (scene) {
        scene.render()
      }
    })

    return babylonEngine
  }
}
