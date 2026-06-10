// ModelManager.ts

import * as THREE from 'three'
import ModelSet from './ModelSet'

export default class ModelManager
{
  modelSet: ModelSet

  constructor(modelSet: ModelSet){
    this.modelSet = modelSet
  }

  create(type: string){
    if(type){
      return this.modelSet.models[type]?.clone()
    }
    // switch(type){
    //   case 'pillar':
    //     return this.modelSet.models[type]?.clone()
    //   default:
    //     console.warn(`Unknow model: ${type}`)
    //     return new THREE.Group()
    // }
  }
}