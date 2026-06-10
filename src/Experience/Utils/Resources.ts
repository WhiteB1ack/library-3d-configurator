import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { EventEmitter } from "./EventEmitter";
import * as THREE from 'three'
import type { Sort } from "element-plus";

type Source = 
  | {
      name: string
      type: 'gltfModel'
      path: string
    }
  | {
      name: string
      type: 'texture'
      path: string
    } 
  | {
      name: string
      type: 'cubeTexture'
      path: readonly string[]
    }

type Loaders = {
  gltfLoader: GLTFLoader
  textureLoader: THREE.TextureLoader
  cubeTextureLoader: THREE.CubeTextureLoader
}

export default class Resources extends EventEmitter{
  sources: readonly Source[]

  items: Record<string, any>
  toLoad: number
  loaded: number
  loaders!: Loaders
  constructor(sources: readonly Source[]){
    super()

    // Options
    this.sources = sources

    // Setup
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders(){
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader()
    }
  }

  startLoading(){
    // Load each source
    for(const source of this.sources){
      if(source.type === 'gltfModel'){
        this.loaders.gltfLoader.load(
          source.path,
          (file) => {
            console.log('loaded', source.name)
            this.sourceLoaded(source, file)
          }
        )
      }
      else if(source.type === 'cubeTexture'){
        this.loaders.cubeTextureLoader.load(
          source.path,
          (file) => {
            this.sourceLoaded(source, file)
          }
        )
      } else {
        this.loaders.textureLoader.load(
          source.path,
          (file) => {
            this.sourceLoaded(source, file)
          }
        )
      }
    }
  }

  sourceLoaded(source: Source, file: any){
    console.log(`Loaded: ${source.name}`);
    this.items[source.name] = file

    this.loaded ++

    if(this.loaded === this.toLoad){
      this.trigger('ready')
    }
  }
}