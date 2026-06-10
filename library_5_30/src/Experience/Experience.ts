import * as THREE from 'three'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import Debug from './Utils/Debug'
import sources from './sources'

// global.d.ts 或在文件顶部
declare global {
  interface Window {
    experience?: Experience 
  }
}

// 单例模式
let instance = null

export default class Experience {
  private static instance: Experience

  canvas!: HTMLCanvasElement
  container!: HTMLDivElement
  sizes!: Sizes
  time!: Time
  scene!: THREE.Scene
  resources!: Resources
  camera!: Camera
  renderer!: Renderer
  debug!: Debug
  world!: World

  constructor(container: HTMLDivElement){
    if(Experience.instance){
      return Experience.instance
    }
    Experience.instance = this
    // Options
    this.container = container

    // 创建canvas
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera(this)
    this.debug = new Debug()
    this.renderer = new Renderer(this)
    this.world = new World(this)

    // Global access
    window.experience = this
    // 初始化 Three.js
    this.init()
  }

  init(){
    // Three.js 初始化逻辑

    // Sizes resize event
    this.sizes.on('resize', () => {
      this.resize()
    })

    // Time tick event
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize(){
    this.camera.resize()
    this.renderer.resize()
  }
  update(){
    this.camera.update()
    // this.world.update()
    this.renderer.update()
  }  
  destroy(){
    this.sizes.off('resize')
    this.time.off('tick')

    /// Traverse the whole scene
    this.scene.traverse((child) => {
      if(child instanceof THREE.Mesh){
        child.geometry.dispose()

        if(child.material instanceof Array){
          child.material.forEach((mat)=> {
            this.disposeMaterial(mat)
          })
        }else{
          this.disposeMaterial(child.material)
        }
      }
    })
    this.scene.clear()
    this.camera.controls.dispose()
    this.renderer.instance.dispose()

    if(this.debug.active){
      this.debug.ui.destroy()
    }

    this.container.removeChild(this.canvas)
  }

  disposeMaterial(material: THREE.Material){
    for(const key in material){
      const value = (material as any)[key]

      if(value && typeof value.dispose === 'function'){
        value.dispose()
      }
    }

  material.dispose()
}  
}