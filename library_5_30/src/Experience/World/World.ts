import * as THREE from 'three'
import Experience from '../Experience'
import Environment from './Environment'
import type Resources from '../Utils/Resources'
import Floor from './Flooor'

import Floor1Data from './Floor_Model_data_set/Floor1Data'
import ModelSet from './ModelSet'
import ModelManager from './ModelManager'

type Source = {
  name: string
  type: string
  path: string | string[]
}

export default class World {
  experience: Experience
  scene: THREE.Scene
  environment!: Environment
  resources: Resources
  modelSet!: ModelSet
  modelManager!: ModelManager

  floor!: Floor

  constructor(experience: Experience){
    this.experience = experience
    this.scene = experience.scene
    this.resources = experience.resources

    this.resources.on('ready', () => {
      // Setup
      this.floor = new Floor(this.experience)
      this.environment = new Environment(this.experience)

      this.modelSet = new ModelSet(this.resources)
      this.modelManager = new ModelManager(this.modelSet)

      Floor1Data.forEach( item => {
        const model = this.modelManager.create(item.type)
        if(model){
          model.position.set(
            item.position[0]!,
            item.position[1]!,
            item.position[2]!
          )
          if(item.scaleX){
            model.scale.x *= item.scaleX
          }
          if(item.mirroX){
            model.scale.set(-1, 1, 1)
          }

          if(item.rotationY){
            model.rotation.y = item.rotationY
          }
          this.scene.add(model)

          console.log(
            item.type,
            model.position,
            model
          )
        }
      } )
    })
  }
}