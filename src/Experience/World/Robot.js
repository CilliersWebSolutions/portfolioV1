import * as THREE from 'three'

export default class Robot {
    constructor(experience, containerAttribute) {

        // Setup
        this.experience = experience
        this.partAttribute = containerAttribute

        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        // Load the model resource
        this.resource = this.resources.items.robotModel
        this.baseTexture = this.resources.items.bakedTextureRobotBase
        this.addonsTexture = this.resources.items.bakedTextureRobotAddons

        // Initialize the model and animation
        this.setModel(containerAttribute)
    }

    setModel(containerAttribute) {
        const baseMesh = this.resource.scene.children.find(child => child.name === 'baseBaked').clone()
        if (!baseMesh) {
            console.error('Base mesh not found!')
            return;
        }

        baseMesh.scale.set(1.5, 1.5, 1.5)
        baseMesh.material = new THREE.MeshStandardMaterial({ map: this.baseTexture })
        this.setupTexture(baseMesh.material.map)
        baseMesh.material.side = THREE.DoubleSide
        baseMesh.scale.set(1.5, 1.5, 1.5)
        baseMesh.position.y = 1.2

        this.scene.add(baseMesh)

        // Initialize addons meshes
        const addonsMeshes = {}
        addonsMeshes['cr'] = this.resource.scene.children.find(child => child.name === 'satelliteBaked')
        addonsMeshes['sp'] = this.resource.scene.children.find(child => child.name === 'solarBaked')
        addonsMeshes['gn'] = this.resource.scene.children.find(child => child.name === 'gunBaked')
        addonsMeshes['ma'] = this.resource.scene.children.find(child => child.name === 'armBaked')

        // Apply materials to addon meshes
        for (const key in addonsMeshes) {
            if (addonsMeshes[key]) {
                addonsMeshes[key].material = new THREE.MeshStandardMaterial({ map: this.addonsTexture })
            }
        }

        if (addonsMeshes[containerAttribute]) {
            const addonMesh = addonsMeshes[containerAttribute].clone();
            this.setupTexture(addonMesh.material.map);

            addonMesh.scale.set(1.5, 1.5, 1.5)
            addonMesh.position.y = 1.2

            this.scene.add(addonMesh);

            // Enable shadows for addon mesh
            addonMesh.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true
                }
            })
        } else {
            console.warn('Addon mesh not found for containerAttribute:', containerAttribute);
        }

        // Enable shadows for base mesh
        baseMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }

    setupTexture(texture) {
        texture.flipY = false
        texture.encoding = THREE.SRGBColorSpace
    }
}


        // setAnimation() {
        //     this.animation = {}
        //     this.animation.mixer = new THREE.AnimationMixer(this.model)

        //     this.animation.actions = {}
        //     this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        //     this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        //     this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])

        //     this.animation.actions.current = this.animation.actions.idle
        //     this.animation.actions.current.play()



        // update() {
        //     // Update animation mixer
        //     this.animation.mixer.update(this.time.delta * 0.001)
        // 
