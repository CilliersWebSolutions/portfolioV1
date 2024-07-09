import EventEmitter from './EventEmitter.js'
import Stats from 'stats.js'

/**
 * Stats
 */

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

export default class Time extends EventEmitter {
    constructor() {
        super()

        //Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        //console.log('test time')
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        stats.begin()

        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
            stats.end()

        })
    }
}