
import Experience from "../Experience";
import Environment from "./Environment";
import Floor from './Floor';
import Resources from '../utils/Resources';
import Fox from './Fox.js'
import Robot from './Robot.js'

export default class World {
    constructor(experience, container) {

        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.floor = this.experience.floor

        this.partAttribute = container.getAttribute('data-3d');

        //Wait for resources
        this.resources.on('ready', () => {
            console.log('resources are ready')
            // Setup

            console.log('partAttribute: ', this.partAttribute)

            console.log('test part Attribute is loading', this.partAttribute)
            if (this.partAttribute === 'c') {
                this.floor = new Floor(this.experience)
                this.fox = new Fox(this.experience)
                this.environment = new Environment(this.experience)

            }
            else if (['cr', 'sp', 'gn', 'ma'].includes(this.partAttribute)) {
                this.floor = new Floor(this.experience)
                this.robot = new Robot(this.experience, this.partAttribute)
                this.environment = new Environment(this.experience)
            }
            else {
                console.log('nothing was loaded')
            }




        })
    }

    update() {
        if (this.fox)
            this.fox.update()
        // else if (this.robot)
        //     this.robot.update()
    }
}