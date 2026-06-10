import Experience from "../Experience";
import * as THREE from 'three'
import type Resources from "../Utils/Resources";

export default class Floor {
  experience: Experience
  scene: THREE.Scene
  // resources: Resources

  geometry!: THREE.CircleGeometry
  
  material!: THREE.MeshStandardMaterial
  mesh!: THREE.Mesh

  constructor(experience: Experience){
    this.experience = experience
    this.scene = experience.scene
    // this.resources = experience.resources

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry(){
    this.geometry = new THREE.CircleGeometry(30, 64)
  }
  setMaterial(){
    this.material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide
    })
  }

  setMesh(){
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = - Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }

}
