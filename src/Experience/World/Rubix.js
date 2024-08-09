import * as THREE from 'three'





export default class Rubix {
    constructor(experience) {

        // Setup

        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.texture = this.experience.resources.items.rubixTexture
        this.resource = this.experience.resources.items.rubixModel

        this.setMesh()
        this.setAnimation()
        //this.setupMaterialSwitching()
    }

    setMesh() {
        this.model = this.resource.scene
        this.model.scale.set(0.2, 0.2, 0.2)

        this.originalMaterials = []
        //console.log(this.model)
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                this.originalMaterials.push(child.material.clone())
                child.material = new THREE.MeshStandardMaterial({ map: this.texture })
                this.setupTexture(child.material.map)
            }
        })

        this.scene.add(this.model)
    }

    setupTexture(texture) {
        texture.flipY = false // Flip texture
        texture.encoding = THREE.SRGBColorSpace
    }

    setAnimation() {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        //this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        //this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        // Set the animation to play once and stop
        this.animation.actions.idle.setLoop(THREE.LoopOnce, 1)
        // Ensure the animation stays at the last frame when finished
        this.animation.actions.idle.clampWhenFinished = true
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()
        this.animation.play = (name, loop = THREE.LoopOnce, timeScale = 1) => {
            const newAction = this.animation.actions[name]
            newAction.reset()
            newAction.setLoop(loop, 1)
            newAction.timeScale = timeScale
            newAction.clampWhenFinished = true
            newAction.play()
            this.animation.actions.current = newAction
        }

        const playForwardThenBackward = () => {
            this.animation.play('idle', THREE.LoopOnce, 1)
            this.animation.mixer.addEventListener('finished', onAnimationFinished)
        }

        const onAnimationFinished = (e) => {
            this.animation.mixer.removeEventListener('finished', onAnimationFinished)
            setTimeout(() => {
                const timeScale = this.animation.actions.current.timeScale

                if (timeScale === 1) {
                    this.animation.play('idle', THREE.LoopOnce, -1)
                } else {
                    this.animation.play('idle', THREE.LoopOnce, 1)
                }

                // Manually set the action time to the end or start for proper reverse playback
                this.animation.actions.current.paused = false
                this.animation.actions.current.time = this.animation.actions.current.timeScale === -1 ? this.animation.actions.current.getClip().duration : 0
                this.animation.actions.current.play()

                this.animation.mixer.addEventListener('finished', onAnimationFinished)
            }, 5000)
        }

        playForwardThenBackward()
    }

    setupMaterialSwitching() {
        const loopMaterials = () => {
            //console.log("start")

            setTimeout(() => {
                //console.log("test 2")
                this.setWireframeMesh()
                setTimeout(() => {
                    //console.log("test 1")
                    this.restoreOriginalMaterial()
                    setTimeout(loopMaterials, 1)  // Loop back to start
                }, 23000)

            }, 23000)
        }

        loopMaterials()
    }

    setBareMesh() {
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({ color: 0xf8f3dd })
            }
        })
    }

    setWireframeMesh() {
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xe0fbfc })
            }
        })
    }

    restoreOriginalMaterial() {
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({ map: this.texture })
                this.setupTexture(child.material.map)
            }
        })

    }





    update() {
        this.animation.mixer.update(this.time.delta * 0.0006)

        if (this.model) {
            this.model.rotation.x += 0.001;

        }
    }
}