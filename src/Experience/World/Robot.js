import * as THREE from 'three';

export default class Robot {
    constructor(experience, partAttribute) {
        // Setup

        this.experience = experience
        this.partAttribute = partAttribute

        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug


        // Load the model resource
        this.resource = this.resources.items.robotModel
        this.baseTexture = this.resources.items.bakedTextureRobotBase;
        this.addonsTexture = this.resources.items.bakedTextureRobotAddons;

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('robot')
        }

        // Initialize the model and animation
        this.setModel(partAttribute)
        //this.setAnimation()
    }

    setModel(partAttribute) {

        const baseMesh = this.resource.scene.children.find(child => child.name === 'baseBaked').clone();
        if (!baseMesh) {
            console.error('Base mesh not found!');
            return;
        }

        baseMesh.material = new THREE.MeshBasicMaterial({ map: this.baseTexture });
        this.setupTexture(baseMesh.material.map);

        this.scene.add(baseMesh);
        console.log('Base mesh added:', baseMesh);



        // Initialize addons meshes
        const addonsMeshes = {};
        addonsMeshes['cr'] = this.resource.scene.children.find(child => child.name === 'sataliteBaked');
        addonsMeshes['sp'] = this.resource.scene.children.find(child => child.name === 'solarBaked');
        addonsMeshes['gn'] = this.resource.scene.children.find(child => child.name === 'gunBaked');
        addonsMeshes['ma'] = this.resource.scene.children.find(child => child.name === 'armBaked');

        // Apply materials to addon meshes
        for (const key in addonsMeshes) {
            if (addonsMeshes[key]) {
                addonsMeshes[key].material = new THREE.MeshBasicMaterial({ map: this.addonsTexture });
            }
        }


        if (addonsMeshes[partAttribute]) {
            const addonMesh = addonsMeshes[partAttribute].clone();
            this.setupTexture(addonMesh.material.map);
            this.scene.add(addonMesh);
            console.log('Addon mesh added:', addonMesh);


            // Enable shadows for addon mesh
            addonMesh.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                }
            });
        } else {
            console.warn('Addon mesh not found for partAttribute:', partAttribute);
        }





        // Enable shadows for base mesh
        baseMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
    }
    setupTexture(texture) {
        texture.flipY = false; // Flip texture
        texture.encoding = THREE.SRGBColorSpace;
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

        //     // Debug
        //     if (this.debug.active) {
        //         const debugObject = {
        //             playIdle: () => { this.animation.play('idle') },
        //             playWalking: () => { this.animation.play('walking') },
        //             playRunning: () => { this.animation.play('running') }
        //         }

        //         this.debugFolder.add(debugObject, 'playIdle')
        //         this.debugFolder.add(debugObject, 'playWalking')
        //         this.debugFolder.add(debugObject, 'playRunning')
        //     }
        // }

        // update() {
        //     // Update animation mixer
        //     this.animation.mixer.update(this.time.delta * 0.001)
        // 
