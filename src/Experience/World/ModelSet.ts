// ModelSet.ts

import * as THREE from 'three'
import type Resources from '../Utils/Resources'
import type { GLTF } from 'three/examples/jsm/Addons.js'

export default class ModelSet {
  models: Record<string, THREE.Object3D>
  //pillar: THREE.Object3D

  constructor(resources: Resources){
    this.models = {
      pillar: (resources.items.pillar as GLTF).scene,
      chair_ball: (resources.items.chair_ball as GLTF).scene,      
      chair_circle: (resources.items.chair_circle as GLTF).scene,  
      red_sofa: (resources.items.red_sofa as GLTF).scene,        
      chair_metal: (resources.items.chair_metal as GLTF).scene,   
      sofa_1: (resources.items.sofa_1 as GLTF).scene,
      sofa_2: (resources.items.sofa_2 as GLTF).scene,
      stair: (resources.items.stair as GLTF).scene,
      table_circle: (resources.items.table_circle as GLTF).scene,
      table_metal: (resources.items.table_metal as GLTF).scene,     
      table: (resources.items.table as GLTF).scene,
      plant: (resources.items.plant as GLTF).scene,
      table_mood: (resources.items.table_mood as GLTF).scene,
      table_white: (resources.items.table_white as GLTF).scene,
      floor_on_stairs: (resources.items.floor_on_stairs as GLTF).scene,
      low_bookshelf: (resources.items.low_bookshelf as GLTF).scene,
      table_2: (resources.items.table_2 as GLTF).scene,
      right_up_wall: (resources.items.right_up_wall as GLTF).scene,
      high_bookshelf: (resources.items.high_bookshelf as GLTF).scene,
      table_3: (resources.items.table_3 as GLTF).scene,
      table_4: (resources.items.table_4 as GLTF).scene,
      left_up_wall: (resources.items.left_up_wall as GLTF).scene,
      table_5: (resources.items.table_5 as GLTF).scene,
      chair_1: (resources.items.chair_1 as GLTF).scene
    }
  }
}