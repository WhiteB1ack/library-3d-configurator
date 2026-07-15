// ModelSet.ts

import * as THREE from 'three'
import type Resources from '../Utils/Resources'
import type { GLTF } from 'three/examples/jsm/Addons.js'

export default class ModelSet {
  models: Record<string, THREE.Object3D>
  //pillar: THREE.Object3D

  constructor(resources: Resources){
    this.models = {
      bookshelf_1: (resources.items.bookshelf_1 as GLTF).scene,
      bookshelf_2: (resources.items.bookshelf_2 as GLTF).scene,
      bookshelf_3: (resources.items.bookshelf_3 as GLTF).scene,
      chair_1: (resources.items.chair_1 as GLTF).scene,
      chair_2: (resources.items.chair_2 as GLTF).scene,
      chair_3: (resources.items.chair_3 as GLTF).scene,
      chair_4: (resources.items.chair_4 as GLTF).scene,
      chair_5: (resources.items.chair_5 as GLTF).scene,
      chair_6: (resources.items.chair_6 as GLTF).scene,
      chair_7: (resources.items.chair_7 as GLTF).scene,
      library_bones: (resources.items.library_bones as GLTF).scene,
      plant_1: (resources.items.plant_1 as GLTF).scene,
      sofa_1: (resources.items.sofa_1 as GLTF).scene,
      sofa_2: (resources.items.sofa_2 as GLTF).scene,
      sofa_3: (resources.items.sofa_3 as GLTF).scene,
      sofa_4: (resources.items.sofa_4 as GLTF).scene,
      table_1: (resources.items.table_1 as GLTF).scene,
      table_2: (resources.items.table_2 as GLTF).scene,
      table_3: (resources.items.table_3 as GLTF).scene,
      table_4: (resources.items.table_4 as GLTF).scene,
      table_5: (resources.items.table_5 as GLTF).scene,
      table_6: (resources.items.table_6 as GLTF).scene,
      table_7: (resources.items.table_7 as GLTF).scene,
      table_8: (resources.items.table_8 as GLTF).scene,
      table_9: (resources.items.table_9 as GLTF).scene,
      table_10: (resources.items.table_10 as GLTF).scene,
      table_11: (resources.items.table_11 as GLTF).scene,
      table_12: (resources.items.table_12 as GLTF).scene,
      table_13: (resources.items.table_13 as GLTF).scene,
    }
  }
}