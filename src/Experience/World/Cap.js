import * as THREE from 'three'

export default class Cap {
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
                flame: this.resources.items.capOrangeFlame,
                bird: this.resources.items.capOrangeBird,
                star: this.resources.items.capOrangeStar,
                ball: this.resources.items.capOrangeBall
            },
            grey: {
                flame: this.resources.items.capGreyFlame,
                bird: this.resources.items.capGreyBird,
                star: this.resources.items.capGreyStar,
                ball: this.resources.items.capGreyBall
            },

            black: {
                flame: this.resources.items.capBlackFlame,
                bird: this.resources.items.capBlackBird,
                star: this.resources.items.capBlackStar,
                ball: this.resources.items.capBlackBall
            },
            white: {
                flame: this.resources.items.capWhiteFlame,
                bird: this.resources.items.capWhiteBird,
                star: this.resources.items.capWhiteStar,
                ball: this.resources.items.capWhiteBall
            }
        };
    }

    setModel() {
        const capMesh = this.resource.scene.children.find(child => child.name === 'capBaked')


        capMesh.material = new THREE.MeshStandardMaterial({ map: this.textures[this.selectedColor][this.selectedGraphic] })

        this.setupTexture(capMesh.material.map);
        capMesh.material.side = THREE.DoubleSide

        this.scene.add(capMesh)

        capMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        });

        this.capMesh = capMesh

    }

    setupTexture(texture) {
        texture.flipY = false; // Flip texture
        texture.encoding = THREE.SRGBColorSpace;
    }

    addGraphicEventListeners() {
        document.querySelectorAll('[button-graphic="cap"]').forEach(button => {
            button.addEventListener('click', (event) => {
                // Prevent default link behavior
                event.preventDefault()

                // Retrieve data-graphic attribute
                const selectedGraphic = event.currentTarget.getAttribute('data-graphic')

                // Update selected graphic and update texture
                this.selectedGraphic = selectedGraphic
                this.updateTexture()
            })
        })
    }

    addEventListeners() {
        document.querySelectorAll('[button-round="cap"]').forEach(button => {

            button.addEventListener('click', (event) => {
                this.selectedColor = event.target.dataset.color;
                this.updateTexture();
            });
        });

        document.querySelectorAll('[button-graphic="cap"]').forEach(button => {

            button.addEventListener('click', (event) => {
                this.selectedGraphic = event.target.dataset.graphic;
                this.updateTexture()
            });
        });
    }

    updateTexture() {
        // Retrieve texture based on selected attributes
        const newTexture = this.textures[this.selectedColor]?.[this.selectedGraphic]

        if (newTexture) {
            this.setupTexture(newTexture)
            this.capMesh.material.map = newTexture
            this.capMesh.material.needsUpdate = true
        }
    }
}