import * as THREE from 'three';
import { gsap } from 'gsap'

export default class Robot {
    constructor(experience, containerAttribute) {
        // Setup
        this.experience = experience;
        this.partAttribute = containerAttribute;

        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        console.log(this.resources.items.robotModel);

        // Load the model resource
        this.resource = this.resources.items.robotModel;
        this.baseTexture = this.resources.items.bakedTextureRobotBase;
        this.addonsTexture = this.resources.items.bakedTextureRobotAddons;

        this.currentAddonIndex = 0;
        this.addonKeys = ['sat', 'solar', 'gun', 'arm']; // Example keys for your addons

        // Initialize the addons meshes as a class property
        this.addonsMeshes = {};
        const addonMesh = this.addonsMeshes[containerAttribute]
        // Initialize the model and animation
        this.setModel(containerAttribute);
        this.setupSwitchAddonButton();
    }

    setModel(containerAttribute) {
        const baseMesh = this.resource.scene.children.find(child => child.name === 'baseBaked').clone();
        if (!baseMesh) {
            console.error('Base mesh not found!');
            return;
        }

        baseMesh.material = new THREE.MeshStandardMaterial({ map: this.baseTexture });
        this.setupTexture(baseMesh.material.map);
        baseMesh.material.side = THREE.DoubleSide;
        baseMesh.scale.set(1.5, 1.5, 1.5);
        baseMesh.position.y = 1.2;

        this.scene.add(baseMesh);

        // Initialize addons meshes
        this.addonsMeshes['sat'] = this.resource.scene.children.find(child => child.name === 'satelliteBaked');
        this.addonsMeshes['solar'] = this.resource.scene.children.find(child => child.name === 'solarBaked');
        this.addonsMeshes['gun'] = this.resource.scene.children.find(child => child.name === 'gunBaked');
        this.addonsMeshes['arm'] = this.resource.scene.children.find(child => child.name === 'armBaked');

        // Apply materials to addon meshes
        for (const key in this.addonsMeshes) {
            if (this.addonsMeshes[key]) {
                this.addonsMeshes[key].material = new THREE.MeshStandardMaterial({ map: this.addonsTexture });
            }
        }

        // Add the initial addon mesh based on the container attribute
        if (this.addonsMeshes[containerAttribute]) {
            this.addNextAddon(containerAttribute);
        } else {
            console.warn('Addon mesh not found for containerAttribute:', containerAttribute);
        }

        // Enable shadows for base mesh
        baseMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
    }

    setupTexture(texture) {
        texture.flipY = false;
        texture.encoding = THREE.SRGBColorSpace
    }

    setupSwitchAddonButton() {
        const button = document.getElementById('switch-addon-button');
        button.addEventListener('click', () => {
            this.switchAddon();
        });
    }

    switchAddon() {
        // Remove the current addon mesh with animation
        const currentAddonKey = this.addonKeys[this.currentAddonIndex];
        const currentAddonMesh = this.scene.children.find(child => child.name === currentAddonKey);

        if (currentAddonMesh) {
            // Animate out the current addon
            gsap.to(currentAddonMesh.scale, {
                duration: 0.5,
                x: 1.4,
                y: 1.4,
                z: 1.4,
                onComplete: () => {
                    this.scene.remove(currentAddonMesh); // Remove after animation
                    this.addNextAddon(); // Add the next addon
                }
            });

            gsap.to(currentAddonMesh.position, {
                duration: 2,
                y: currentAddonMesh.position.y + 2,
                onComplete: () => {
                    this.scene.remove(currentAddonMesh); // Remove after animation

                }
            })

            gsap.to(currentAddonMesh.material, {
                duration: 0.5,
                opacity: 0,
                onComplete: () => {
                    this.scene.remove(currentAddonMesh); // Remove after animation

                }


            });


        } else {
            this.addNextAddon(); // If no current addon, just add the next one
        }
    }

    addNextAddon() {
        // Update the index to the next addon
        this.currentAddonIndex = (this.currentAddonIndex + 1) % this.addonKeys.length;
        const nextAddonKey = this.addonKeys[this.currentAddonIndex];

        // Add the next addon mesh
        const addonMesh = this.addonsMeshes[nextAddonKey];
        if (addonMesh) {
            const clonedAddonMesh = addonMesh.clone();
            clonedAddonMesh.name = nextAddonKey
            clonedAddonMesh.material = clonedAddonMesh.material.clone()
            clonedAddonMesh.material.transparent = true
            this.setupTexture(clonedAddonMesh.material.map);
            clonedAddonMesh.scale.set(1.4, 1.4, 1.4); // Start scaled down for animation
            clonedAddonMesh.position.y = 1.2;

            this.scene.add(clonedAddonMesh);

            // Animate the new addon in
            gsap.to(clonedAddonMesh.scale, {
                duration: 0.5,
                x: 1.5,
                y: 1.5,
                z: 1.5,
                onComplete: () => {
                    // Enable shadows for the new addon mesh
                    clonedAddonMesh.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.castShadow = true;
                        }
                    });
                }
            });



            // Optional: Fade in effect
            gsap.fromTo(clonedAddonMesh.material, {
                opacity: 0
            }, {
                duration: 0.5,
                opacity: 1
            });
        } else {
            console.warn('Addon mesh not found for key:', nextAddonKey);
        }
    }


    // Uncomment and complete this method if you want to use animations
    /*
    setAnimation() {
        this.animation = {};
        this.animation.mixer = new THREE.AnimationMixer(this.model);

        this.animation.actions = {};
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0]);
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1]);
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2]);

        this.animation.actions.current = this.animation.actions.idle;
        this.animation.actions.current.play();
    }

    update() {
        // Update animation mixer
        if (this.animation && this.animation.mixer) {
            this.animation.mixer.update(this.time.delta * 0.001);
        }
    }
    */
}
