import EventEmitter from './EventEmitter.js'


export default class Sizes extends EventEmitter {
    constructor(container) {

        super()

        this.container = container
        this.width = this.container.clientWidth
        this.height = this.container.clientHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        window.addEventListener('resize', () => {

            // Update sizes
            this.width = this.container.clientWidth
            this.height = this.container.clientHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }
}