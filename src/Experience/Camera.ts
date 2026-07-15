import { PointerLockControls, ThreeMFLoader } from "three/examples/jsm/Addons.js";
import Experience from "./Experience";
import type Sizes from './Utils/Sizes.ts'
import * as THREE from 'three'
import Time from './Utils/Time.ts'

export default class Camera {
  experience: Experience
  sizes: Sizes
  time: Time
  scene: THREE.Scene
  canvas: HTMLCanvasElement

  instance!: THREE.PerspectiveCamera
  controls!: PointerLockControls

  // 移动状态
  moveForward = false
  moveBackward = false
  moveLeft = false
  moveRight = false

  velocity = new THREE.Vector3()
  direction = new THREE.Vector3()
  speed = 5

  prevTime = performance.now()

  // 键盘事件引用(用于销毁时移除)
  private _onKeyDown!: (e: KeyboardEvent) => void
  private _onKeyUp!: (e: KeyboardEvent) => void

  constructor(experience: Experience){
    this.experience = experience
    this.sizes = experience.sizes
    this.time = experience.time
    this.scene = experience.scene
    this.canvas = experience.canvas

    // console.log(this.experience.sizes.width)
    this.setInstance()
    this.setPointerLockControls()
    this.setKeyboard()

    this.sizes.on('resize', () => {
      this.resize()
    })
  }

  setInstance(){
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )

    // 图书馆附近
    this.instance.position.set(0, 7, 0)
    this.scene.add(this.instance)
  }

  setPointerLockControls(){
    this.controls = new PointerLockControls(this.instance, document.body)
    
    // 
    this.canvas.addEventListener('click', () => {
      this.controls.lock()
    })

    // 锁定/解除事件
    this.controls.addEventListener('lock', () => {
      console.log('Point Locked')
    })
    this.controls.addEventListener('unlock', () => {
      console.log('Pointer Unlocked')
    })
  }

  setKeyboard(){
    this._onKeyDown = (event: KeyboardEvent) => {
      switch(event.code)
      {
        case 'KeyW':
          this.moveForward = true
          break
        case 'KeyS':
          this.moveBackward = true
          break
        case 'KeyA':
          this.moveLeft = true
          break
        case 'KeyD':
          this.moveRight = true
          break
      }
    }
    this._onKeyUp = (event: KeyboardEvent) => {
      switch(event.code)
      {
        case 'KeyW':
          this.moveForward = false 
          break
        case 'KeyS':
          this.moveBackward = false
          break
        case 'KeyA':
          this.moveLeft = false
          break
        case 'KeyD':
          this.moveRight = false
          break
      }      
    }
    window.addEventListener('keydown', this._onKeyDown)
    window.addEventListener('keyup', this._onKeyUp)
  }

  resize(){
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update(){
    if(!this.controls.isLocked) return

    const deltaTime = this.time.delta / 1000
    const moveDistance = this.speed * deltaTime

    if(this.moveForward) this.controls.moveForward(moveDistance)
    if(this.moveBackward) this.controls.moveForward(-moveDistance)
    if(this.moveLeft) this.controls.moveRight(-moveDistance)
    if(this.moveRight) this.controls.moveRight(moveDistance)
  }

  dispose(){
    window.removeEventListener('keydown', this._onKeyDown)
    window.removeEventListener('keyup', this._onKeyUp)
  }
}