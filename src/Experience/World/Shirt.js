import * as THREE from 'three'
import { gsap } from 'gsap';




export default class Shirt {
    constructor(experience) {

        // Setup
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.resource = this.experience.resources.items.shirtModel


        // Initialize selected attributes
        this.selectedColor = 'orange'
        this.selectedGraphic = 'flame'
        this.selectedPosition = 'center'

        this.isBackShowing = false
        this.initialOrientation = new THREE.Vector3(0, 0, 0)

        // Store the original settings of the OrbitControls
        this.originalOrbitControlsSettings = {
            autoRotate: this.experience.camera.controls.autoRotate,
            autoRotateSpeed: this.experience.camera.controls.autoRotateSpeed,
        }

        // Load Textures
        this.loadTextures()

        // Initialize the shirt model
        this.setModel()

        // Add event listeners for the buttons
        this.addEventListeners()
        this.addGraphicEventListeners()
    }


    /**
     * Load Textures
     */

    loadTextures() {
        this.textures = {
            orange: {
                flame: {
                    center: this.resources.items.shirtOrangeCenterFlame,
                    pocket: this.resources.items.shirtOrangePocketFlame,
                    cover: this.resources.items.shirtOrangeCoverFlame,
                    back: this.resources.items.shirtOrangeBackFlame
                },
                bird: {
                    center: this.resources.items.shirtOrangeCenterBird,
                    pocket: this.resources.items.shirtOrangePocketBird,
                    cover: this.resources.items.shirtOrangeCoverBird,
                    back: this.resources.items.shirtOrangeBackBird
                },
                star: {
                    center: this.resources.items.shirtOrangeCenterStar,
                    pocket: this.resources.items.shirtOrangePocketStar,
                    cover: this.resources.items.shirtOrangeCoverStar,
                    back: this.resources.items.shirtOrangeBackStar
                },
                ball: {
                    center: this.resources.items.shirtOrangeCenterBall,
                    pocket: this.resources.items.shirtOrangePocketBall,
                    cover: this.resources.items.shirtOrangeCoverBall,
                    back: this.resources.items.shirtOrangeBackBall
                }
            },
            grey: {
                flame: {
                    center: this.resources.items.shirtGreyCenterFlame,
                    pocket: this.resources.items.shirtGreyPocketFlame,
                    cover: this.resources.items.shirtGreyCoverFlame,
                    back: this.resources.items.shirtGreyBackFlame
                },
                bird: {
                    center: this.resources.items.shirtGreyCenterBird,
                    pocket: this.resources.items.shirtGreyPocketBird,
                    cover: this.resources.items.shirtGreyCoverBird,
                    back: this.resources.items.shirtGreyBackBird
                },
                star: {
                    center: this.resources.items.shirtGreyCenterStar,
                    pocket: this.resources.items.shirtGreyPocketStar,
                    cover: this.resources.items.shirtGreyCoverStar,
                    back: this.resources.items.shirtGreyBackStar
                },
                ball: {
                    center: this.resources.items.shirtGreyCenterBall,
                    pocket: this.resources.items.shirtGreyPocketBall,
                    cover: this.resources.items.shirtGreyCoverBall,
                    back: this.resources.items.shirtGreyBackBall
                }
            },
            black: {
                flame: {
                    center: this.resources.items.shirtBlackCenterFlame,
                    pocket: this.resources.items.shirtBlackPocketFlame,
                    cover: this.resources.items.shirtBlackCoverFlame,
                    back: this.resources.items.shirtBlackBackFlame
                },
                bird: {
                    center: this.resources.items.shirtBlackCenterBird,
                    pocket: this.resources.items.shirtBlackPocketBird,
                    cover: this.resources.items.shirtBlackCoverBird,
                    back: this.resources.items.shirtBlackBackBird
                },
                star: {
                    center: this.resources.items.shirtBlackCenterStar,
                    pocket: this.resources.items.shirtBlackPocketStar,
                    cover: this.resources.items.shirtBlackCoverStar,
                    back: this.resources.items.shirtBlackBackStar
                },
                ball: {
                    center: this.resources.items.shirtBlackCenterBall,
                    pocket: this.resources.items.shirtBlackPocketBall,
                    cover: this.resources.items.shirtBlackCoverBall,
                    back: this.resources.items.shirtBlackBackBall
                }
            },
            white: {
                flame: {
                    center: this.resources.items.shirtWhiteCenterFlame,
                    pocket: this.resources.items.shirtWhitePocketFlame,
                    cover: this.resources.items.shirtWhiteCoverFlame,
                    back: this.resources.items.shirtWhiteBackFlame
                },
                bird: {
                    center: this.resources.items.shirtWhiteCenterBird,
                    pocket: this.resources.items.shirtWhitePocketBird,
                    cover: this.resources.items.shirtWhiteCoverBird,
                    back: this.resources.items.shirtWhiteBackBird
                },
                star: {
                    center: this.resources.items.shirtWhiteCenterStar,
                    pocket: this.resources.items.shirtWhitePocketStar,
                    cover: this.resources.items.shirtWhiteCoverStar,
                    back: this.resources.items.shirtWhiteBackStar
                },
                ball: {
                    center: this.resources.items.shirtWhiteCenterBall,
                    pocket: this.resources.items.shirtWhitePocketBall,
                    cover: this.resources.items.shirtWhiteCoverBall,
                    back: this.resources.items.shirtWhiteBackBall
                }
            }
        }
    }

    setModel() {
        const shirtMesh = this.resource.scene.children.find(child => child.name === 'shirtBaked')
        //console.log(shirtMesh)

        shirtMesh.material = new THREE.MeshStandardMaterial({ map: this.textures[this.selectedColor][this.selectedGraphic][this.selectedPosition] })
        //console.log(shirtMesh.material)

        this.setupTexture(shirtMesh.material.map)
        shirtMesh.material.side = THREE.DoubleSide

        this.scene.add(shirtMesh)

        shirtMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })

        this.shirtMesh = shirtMesh

        // Store the initial orientation
        this.initialOrientation.copy(shirtMesh.rotation)
    }

    setupTexture(texture) {
        texture.flipY = false; // Flip texture
        texture.encoding = THREE.SRGBColorSpace;
    }

    addGraphicEventListeners() {
        document.querySelectorAll('[button-graphic="shirt"]').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedGraphic = event.currentTarget.getAttribute('data-graphic');
                this.selectedGraphic = selectedGraphic;
                this.updateTexture();
                if (this.selectedPosition === 'back' && !this.isBackShowing) {
                    this.rotateShirt(true);
                } else if (this.selectedPosition !== 'back' && this.isBackShowing) {
                    this.rotateShirt(false);
                }
            });
        });
    }

    addEventListeners() {
        document.querySelectorAll('[button-round="shirt"]').forEach(button => {
            button.addEventListener('click', (event) => {
                //console.log('Color button clicked:', event.target.dataset.color)
                this.selectedColor = event.target.dataset.color
                this.updateTexture()
            })
        });

        document.querySelectorAll('[button-graphic="shirt"]').forEach(button => {

            button.addEventListener('click', (event) => {
                //console.log('Graphic button clicked:', event.target.dataset.graphic)
                this.selectedGraphic = event.target.dataset.graphic
                this.updateTexture()
            });
        });

        document.querySelectorAll('[button-position="shirt"]').forEach(button => {
            button.addEventListener('click', (event) => {
                this.selectedPosition = event.target.dataset.position;
                this.updateTexture();
                if (this.selectedPosition === 'back' && !this.isBackShowing) {
                    this.rotateShirt(true);
                } else if (this.selectedPosition !== 'back' && this.isBackShowing) {
                    this.rotateShirt(false);
                }
            });
        });
    }

    updateTexture() {
        // Check if selectedGraphic is defined
        if (!this.selectedGraphic) {

            return
        }

        // Retrieve texture based on selected attributes
        const newTexture = this.textures[this.selectedColor]?.[this.selectedGraphic]?.[this.selectedPosition]

        if (newTexture) {
            this.setupTexture(newTexture)
            this.shirtMesh.material.map = newTexture
            this.shirtMesh.material.needsUpdate = true
        }
    }
    rotateShirt(toBack) {
        const targetRotationY = toBack ? Math.PI : 0;
        gsap.to(this.shirtMesh.rotation, {
            y: targetRotationY,
            duration: 1,
            onUpdate: () => {
                this.experience.camera.controls.update(); // Ensure orbit controls update during rotation
            }
        });
        this.isBackShowing = toBack;
    }

}