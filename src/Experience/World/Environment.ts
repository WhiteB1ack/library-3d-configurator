import Experience from '../Experience'
import * as THREE from 'three'
import type Resources from '../Utils/Resources.ts'
import Debug from '../Utils/Debug.ts'
import GUI from 'lil-gui'

export default class Environment{
  experience: Experience
  scene: THREE.Scene
  sunLight!: THREE.DirectionalLight
  ambientLight!: THREE.AmbientLight
  resources: Resources
  debug: Debug
  debugFolder!: GUI

  constructor(experience: Experience){
    this.experience = experience
    this.scene = experience.scene
    this.resources = experience.resources
    this.debug = experience.debug

    if(this.debug.active){
      this.debugFolder = this.debug.ui.addFolder('environment')
    }

    this.setSunLight()
    this.setAmbientLight()
    this.setEnvironmentMap()
  }

  setSunLight(){
    this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.near = 1
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.camera.left = -10
    this.sunLight.shadow.camera.right = 10
    this.sunLight.shadow.camera.top = 10
    this.sunLight.shadow.camera.bottom = -10
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3.5, 2, -1.25)

    this.scene.add(this.sunLight)
  }

  setAmbientLight(){
    this.ambientLight = new THREE.AmbientLight('#ffffff', 2)
    this.scene.add(this.ambientLight)
  }

  setEnvironmentMap(){
    if(!this.debugFolder) return
    this.debugFolder
      .add(this.sunLight.position, 'x')
      .name('sunLightX')
      .min(-5)
      .max(5)
      .step(0.001)

    this.debugFolder
      .add(this.sunLight.position, 'y')
      .name('sunLightY')
      .min(-5)
      .max(5)
      .step(0.001)      

    this.debugFolder
      .add(this.sunLight.position, 'z')
      .name('sunLightZ')
      .min(-5)
      .max(5)
      .step(0.001)
  }

  updateMaterials(){
    this.scene.traverse((child) => {
      if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
        child.material.needsUpdate = true
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }
}