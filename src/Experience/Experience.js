import * as THREE from 'three'
import Sizes from './utils/Sizes.js'
import Time from './utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './utils/Resources.js'
import sources from './sources.js'
import Debug from './utils/Debug.js'


export default class Experience {
    constructor(canvas, container) {

        // if (Experience.instance) {
        //     return Experience.instance
        // }

        // Experience.instance = this
        if (!canvas || !container) {
            throw new Error('Canvas or container element is undefined');
        }
        console.log('Initializing Experience with canvas and container:', canvas, container);
        //Options 
        this.container = container
        this.canvas = canvas
        //console.log(canvas)
        //console.log(container)




        //Setup 
        this.scene = new THREE.Scene()
        this.sizes = new Sizes(container)
        //console.log(this.sizes)

        this.time = new Time()
        this.camera = new Camera(this)
        this.renderer = new Renderer(this)
        this.resources = new Resources(sources)

        this.world = new World(this, container)
        this.debug = new Debug(this)

        // Sizes resize event
        this.sizes.on('resize', () => {
            this.resize()
        })
        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    // destroy() {
    //     this.sizes.off('resize')
    //     this.time.off('tick')
    //     this.scene.traverse((child) => {
    //         if (child instanceof THREE.Mesh) {
    //             child.geometry.dispose()
    //             for (const key in child.material) {
    //                 const value = child.material[key]
    //                 if (value && typeof value.dispose === 'function') {
    //                     value.dispose()
    //                 }
    //             }
    //         }
    //     })
    //     this.camera.controls.dispose()
    //     this.renderer.instance.dispose()
    // }
}   