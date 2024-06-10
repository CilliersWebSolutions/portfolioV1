import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Camera {
    constructor(experience) {

        this.experience = experience
        //console.log(experience)
        this.sizes = experience.sizes
        this.scene = experience.scene
        this.canvas = experience.canvas

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(10, 10, 10)
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.009
        this.controls.enablePan = false
        this.controls.maxPolarAngle = 1.2
        this.controls.minPolarAngle = 0.8

        this.controls.enableZoom = false
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}