import Experience from "./Experience"
import * as THREE from 'three'
import Sizes from './Utils/Sizes'
import Camera from './Camera'

export default class Renderer{
  experience: Experience
  sizes: Sizes
  scene: THREE.Scene
  canvas: HTMLCanvasElement
  camera: Camera
  instance!: THREE.WebGLRenderer

  constructor(experience: Experience){
    this.experience = experience
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.canvas = experience.canvas
    this.camera = experience.camera

    this.setInstance()
  }

  setInstance(){
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.shadowMap.type = THREE.PCFShadowMap
    this.instance.setClearColor('#211d20')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize(){
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio))
  }

  update(){
    this.instance.render(this.scene, this.camera.instance)
  }
}