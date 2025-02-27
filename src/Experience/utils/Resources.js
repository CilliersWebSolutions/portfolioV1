import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import EventEmitter from './EventEmitter'


export default class Resources extends EventEmitter {
    constructor(sources) {
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

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

        //DRACOLoader setup
        //this.loaders.dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/gh/CilliersWebSolutions/draco@main/draco/')
        this.loaders.dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/gh/CilliersWebSolutions/portfolioV1@main/dist/draco/')
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }


    startLoading() {
        //Load each source
        for (const source of this.sources) {

            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {

                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++
        if (this.loaded === this.toLoad) {
            //console.log('finished')
            this.trigger('ready')
        }
    }
}