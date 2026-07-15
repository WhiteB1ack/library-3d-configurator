import Experience from "../../Experience";
import * as THREE from 'three'
import type Resources from "../../Utils/Resources";
import type { GLTF } from "three/examples/jsm/Addons.js";
import Debug from "../../Utils/Debug";
import GUI from 'lil-gui'

export default class Sofa {
  experience: Experience
  scene: THREE.Scene
  resources: Resources
  debug: Debug
  debugFolder!: GUI

  resource!: GLTF
  model!: THREE.Group
  
  constructor(experience: Experience){
    this.experience = experience
    this.scene = experience.scene
    this.resources = experience.resources
    this.debug = experience.debug

    // Debug
    if(this.debug.active){
      this.debugFolder = this.debug.ui.addFolder('Sofa')
    }

    // Setup
    this.resource = this.resources.items.red_sofa as GLTF

    this.setModel()
  }

  setModel(){
    this.model = this.resource.scene
  this.model.scale.set(0.2, 0.2, 0.2)
  //  this.model.position.set(10, 10, 10)
    this.model.rotateX(Math.PI)    
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if(child instanceof THREE.Mesh){
        child.castShadow = true
      }
    })
  }


}