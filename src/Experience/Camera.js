import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Camera {
    constructor(experience, container) {

        this.experience = experience
        //console.log(experience)
        this.sizes = experience.sizes
        this.scene = experience.scene
        this.canvas = experience.canvas
        this.containerAttribute = container.getAttribute('data-3d');
        this.setInstance()
        this.setOrbitControls()


    }

    setInstance() {
        //const aspectRatio = this.sizes.width / this.sizes.height

        if (this.containerAttribute === 'c') {
            this.instance = new THREE.PerspectiveCamera(15, this.sizes.width / this.sizes.height, 0.1, 100)
            // this.instance = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 5, -5, 0.1, 1000)
            this.instance.position.set(0, 0, 25)
            this.scene.add(this.instance)
        }
        else if (['cr', 'sp', 'gn', 'ma'].includes(this.containerAttribute)) {
            this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100)
            this.instance.position.set(3, 3, 13)
            this.scene.add(this.instance)
        }
        else if (this.containerAttribute === 'map') {
            this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
            // this.instance = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 5, -5, 0.1, 1000)
            this.instance.position.set(0, 0, 40)
            this.scene.add(this.instance)
        }
        else if (this.containerAttribute === 'an') {
            this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
            // this.instance = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 5, -5, 0.1, 1000)
            this.instance.position.set(2.2, 2.2, 2.2)
            this.scene.add(this.instance)
        }
        else if (this.containerAttribute === 'sh', 'cp', 'mg') {

            if (this.containerAttribute === 'sh') {
                this.instance = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 100)
                // this.instance = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 5, -5, 0.1, 1000)
                this.instance.position.set(0, 0, 5)
                this.scene.add(this.instance)

            }
            else if (this.containerAttribute === 'cp') {
                this.instance = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 100)
                // this.instance = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 5, -5, 0.1, 1000)
                this.instance.position.set(0, 0, 3)
                this.scene.add(this.instance)

            }

            else if (this.containerAttribute === 'mg') {
                this.instance = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 100)
                // this.instance = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 5, -5, 0.1, 1000)
                this.instance.position.set(0, 0, 2)
                this.scene.add(this.instance)

            }
        }
    }

    setOrbitControls() {
        if (['cr', 'sp', 'gn', 'ma'].includes(this.containerAttribute)) {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true
            this.controls.dampingFactor = 0.009
            this.controls.enablePan = false
            // this.controls.maxPolarAngle = 1.65
            // this.controls.minPolarAngle = 0.6
            //this.controls.autoRotate = true
            //this.controls.autoRotateSpeed = 0.4


            this.controls.enableZoom = false
        }
        else if (['c', 'sh', 'cp', 'mg'].includes(this.containerAttribute)) {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true
            this.controls.dampingFactor = 0.01
            this.controls.enablePan = false
            this.controls.maxPolarAngle = 1.5
            this.controls.minPolarAngle = 1.5
            this.controls.maxAzimuthAngle = 0.5
            this.controls.minAzimuthAngle = -0.5
            //this.controls.autoRotate = true
            //this.controls.autoRotateSpeed = 0.2

            this.controls.enableZoom = false
        }
        else if (['an'].includes(this.containerAttribute)) {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true
            this.controls.dampingFactor = 0.009
            this.controls.enablePan = false
            //this.controls.maxPolarAngle = 1.5
            //this.controls.minPolarAngle = 1.5
            this.controls.autoRotate = true
            this.controls.autoRotateSpeed = 0.5


            this.controls.enableZoom = false
        }
        else if (['map'].includes(this.containerAttribute)) {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true
            this.controls.dampingFactor = 0.009
            //this.controls.enablePan = true
            //this.controls.maxPolarAngle = 1.5
            //this.controls.minPolarAngle = 0.5
            //this.controls.minZoom = 1
            //this.controls.autoRotate = true
            //this.controls.autoRotateSpeed = 0.5


            this.controls.enableZoom = true
        }
        else {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true
            this.controls.dampingFactor = 0.009
            this.controls.enablePan = false
            this.controls.maxPolarAngle = 1.5
            this.controls.minPolarAngle = 1.5


            this.controls.enableZoom = false
        }
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}