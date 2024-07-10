import * as THREE from 'three'
import Sizes from './utils/Sizes.js'
import Time from './utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './utils/Resources.js'
import sources from './sources.js'

export default class Experience {
    constructor(canvas, container) {

        //Options 
        this.container = container
        this.canvas = canvas

        this.containerAttribute = container.getAttribute('data-3d');

        //Setup 
        this.scene = new THREE.Scene()
        this.sizes = new Sizes(container)
        this.time = new Time()
        this.camera = new Camera(this, container)
        this.renderer = new Renderer(this)
        this.resources = new Resources(sources)


        this.world = new World(this, container)

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
}   