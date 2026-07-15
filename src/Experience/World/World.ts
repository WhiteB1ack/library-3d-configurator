import * as THREE from 'three'
import Experience from '../Experience'
import Environment from './Environment'
import type Resources from '../Utils/Resources'
import Floor from './Flooor'

// import BaseBone
import BaseBoneData from './Floor_Model_data_set/BaseBoneData'
import Floor1Data from './Floor_Model_data_set/Floor1Data'
import Floor2Data from './Floor_Model_data_set/Floor2Data'
import Floor3Data from './Floor_Model_data_set/Floor3Data'
import Floor4Data from './Floor_Model_data_set/Floor4Data'
import Floor5Data from './Floor_Model_data_set/Floor5Data'
import Floor6Data from './Floor_Model_data_set/Floor6Data'

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
  
      BaseBoneData.forEach( item => {
        const model = this.modelManager.create(item.type)
        if(model){
          model.position.set(
            item.position[0]!,
            item.position[1]!,
            item.position[2]!
          )
          this.scene.add(model)
        }
      } )      

      Floor1Data.forEach( item => {
        const model = this.modelManager.create(item.type)
        if(model){
          model.position.set(
            item.position[0]!,
            item.position[1]!,
            item.position[2]!
          )

          this.scene.add(model)
        }
      } )

      Floor2Data.forEach( item => {
        const model = this.modelManager.create(item.type)
        if(model){
          model.position.set(
            item.position[0]!,
            item.position[1]!,
            item.position[2]!
          )
          this.scene.add(model)
        }
      } )
      Floor3Data.forEach( item => {
        const model = this.modelManager.create(item.type)
        if(model){
          model.position.set(
            item.position[0]!,
            item.position[1]!,
            item.position[2]!
          )
          this.scene.add(model)
        }
      } )
      Floor4Data.forEach( item => {
        const model = this.modelManager.create(item.type)
        if(model){
          model.position.set(
            item.position[0]!,
            item.position[1]!,
            item.position[2]!
          )
          this.scene.add(model)
        }
      } )
      Floor5Data.forEach( item => {
        const model = this.modelManager.create(item.type)
        if(model){
          model.position.set(
            item.position[0]!,
            item.position[1]!,
            item.position[2]!
          )
          this.scene.add(model)
        }
      } )
      Floor6Data.forEach( item => {
        const model = this.modelManager.create(item.type)
        if(model){
          model.position.set(
            item.position[0]!,
            item.position[1]!,
            item.position[2]!
          )
          this.scene.add(model)
        }
      } )
    })
  }
}