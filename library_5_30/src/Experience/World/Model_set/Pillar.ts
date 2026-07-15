import * as THREE from 'three'
import type Resources from "../../Utils/Resources";
import type { GLTF } from "three/examples/jsm/Addons.js";
import Experience from '../../Experience';

export default class Pillar {
  scene: THREE.Scene
  resources: Resources

  resource!: GLTF
  model!: THREE.Group
  
  constructor(experience: Experience){
  
    this.scene = experience.scene
    this.resources = experience.resources
  
    // Setup
    this.resource = this.resources.items.pillar as GLTF

    this.setModel()
  }

  setModel(){
    this.model = this.resource.scene
    this.model.scale.set(0.1, 0.1, 0.1)
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if(child instanceof THREE.Mesh){
        child.castShadow = true
      }
    })
  }
}