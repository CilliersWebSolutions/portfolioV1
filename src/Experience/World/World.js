
import Experience from "../Experience"
import Environment from "./Environment"
//import Floor from './Floor'
//import Resources from '../utils/Resources'
import Rubix from './Rubix.js'
import Robot from './Robot.js'
import Particles from './Particles.js'
import Shirt from './Shirt.js'
import Cap from './Cap.js'
import Mug from './Mug.js'

export default class World {
    constructor(experience, container) {

        this.experience = experience

        this.scene = this.experience.scene
        this.resources = this.experience.resources
        //this.floor = this.experience.floor

        this.containerAttribute = container.getAttribute('data-3d');

        //Wait for resources
        this.resources.on('ready', () => {


            // Setup
            if (this.containerAttribute === 'c') {

                this.Particles = new Particles(this.experience)

            } else if (this.containerAttribute === 'an') {

                // this.floor = new Floor(this.experience)
                this.rubix = new Rubix(this.experience)

                this.environment = new Environment(this.experience, container)

            } else if (['cr', 'sp', 'gn', 'ma'].includes(this.containerAttribute)) {

                //this.floor = new Floor(this.experience)
                this.robot = new Robot(this.experience, this.containerAttribute)
                this.environment = new Environment(this.experience, container)
            }
            else if (this.containerAttribute === 'sh') {

                //this.floor = new Floor(this.experience)
                this.shirt = new Shirt(this.experience)
                this.environment = new Environment(this.experience, container)
            }
            else if (this.containerAttribute === 'cp') {

                //this.floor = new Floor(this.experience)
                this.cap = new Cap(this.experience)
                this.environment = new Environment(this.experience, container)
            }
            else if (this.containerAttribute === 'mg') {

                //this.floor = new Floor(this.experience)
                this.mug = new Mug(this.experience)
                this.environment = new Environment(this.experience, container)
            }
            else {
                console.log('nothing was loaded')
            }
        })
    }

    update() {
        if (this.rubix)
            this.rubix.update()

        if (this.experience.camera)
            this.experience.camera.update();
    }
}