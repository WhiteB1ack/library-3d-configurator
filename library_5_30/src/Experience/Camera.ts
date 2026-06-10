import { OrbitControls } from "three/examples/jsm/Addons.js";
import Experience from "./Experience";
import type Sizes from './Utils/Sizes.ts'
import * as THREE from 'three'
import { instance } from "three/tsl";

export default class Camera {
  experience: Experience
  sizes: Sizes
  scene: THREE.Scene
  canvas: HTMLCanvasElement

  instance!: THREE.PerspectiveCamera
  controls!: OrbitControls

  constructor(experience: Experience){
    this.experience = experience
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.canvas = experience.canvas

    // console.log(this.experience.sizes.width)
    this.setInstance()
    this.setOrbitControls()

    this.sizes.on('resize', () => {
      this.resize()
    })
    this.instance.position.set(-21, 35, 0)
    this.instance.lookAt(20, 0, -10)
    this.scene.add(this.instance)
  }

  setInstance(){
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )
  }

  setOrbitControls(){
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
    this.controls.target.set(-21, 0, -10)
  }

  resize(){
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update(){
    this.controls.update()
  }
}