import * as THREE from 'three'





export default class Mug {
    constructor(experience) {

        // Setup

        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        //console.log('test mug code works up to here')

        this.resource = this.experience.resources.items.shirtModel
        //console.log('successfully loaded the mug', this.resource)

        // Initialize selected attributes
        this.selectedColor = 'orange'
        this.selectedGraphic = 'flame'

        //focus buttons
        //focusedGraphicButton = document.getElementsByClassName

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

    // FLAME

    loadTextures() {
        this.textures = {
            orange: {
                flame: this.resources.items.cupOrangeFlame,
                bird: this.resources.items.cupOrangeBird,
                star: this.resources.items.cupOrangeStar,
                ball: this.resources.items.cupOrangeBall
            },
            grey: {
                flame: this.resources.items.cupGreyFlame,
                bird: this.resources.items.cupGreyBird,
                star: this.resources.items.cupGreyStar,
                ball: this.resources.items.cupGreyBall
            },

            black: {
                flame: this.resources.items.cupBlackFlame,
                bird: this.resources.items.cupBlackBird,
                star: this.resources.items.cupBlackStar,
                ball: this.resources.items.cupBlackBall
            },
            white: {
                flame: this.resources.items.cupWhiteFlame,
                bird: this.resources.items.cupWhiteBird,
                star: this.resources.items.cupWhiteStar,
                ball: this.resources.items.cupWhiteBall
            }
        }
        // Debugging log for textures
        //console.log('mug Textures loaded:', this.textures)
    }

    setModel() {
        const mugMesh = this.resource.scene.children.find(child => child.name === 'cupBaked')
        //console.log('mug mesh loadedddd', mugMesh)

        mugMesh.material = new THREE.MeshStandardMaterial({ map: this.textures[this.selectedColor][this.selectedGraphic] })
        //console.log('mug Textures loaded:', mugMesh.material)

        this.setupTexture(mugMesh.material.map);
        mugMesh.material.side = THREE.DoubleSide

        mugMesh.scale.set(0.05, 0.05, 0.05)
        this.scene.add(mugMesh)


        mugMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        });

        this.mugMesh = mugMesh;
    }
    setupTexture(texture) {
        texture.flipY = false; // Flip texture
        texture.encoding = THREE.SRGBColorSpace
    }

    addGraphicEventListeners() {
        // Use Webflow's selector or your own selector based on your structure
        document.querySelectorAll('[button-graphic="mug"]').forEach(button => {
            button.addEventListener('click', (event) => {
                // Prevent default link behavior
                event.preventDefault()

                // Retrieve data-graphic attribute
                const selectedGraphic = event.currentTarget.getAttribute('data-graphic')

                // Update selected graphic and update texture
                this.selectedGraphic = selectedGraphic;
                this.updateTexture()
            })
        })
    }
    addEventListeners() {
        document.querySelectorAll('[button-round="mug"]').forEach(button => {
            button.addEventListener('click', (event) => {
                //console.log('Color mug button clicked:', event.target.dataset.color);
                this.selectedColor = event.target.dataset.color;
                this.updateTexture();
            });
        });

        document.querySelectorAll('[button-graphic="mug"]').forEach(button => {

            button.addEventListener('click', (event) => {
                //console.log('Graphic mug button clicked:', event.target.dataset.graphic);
                this.selectedGraphic = event.target.dataset.graphi
                this.updateTexture()
            });
        });
    }

    updateTexture() {
        console.log('Updating mug texture with:', this.selectedColor, this.selectedGraphic);

        // Check if selectedGraphic is defined
        if (!this.selectedGraphic) {
            console.error('Selected mug graphic is undefined.');
            return;
        }

        // Retrieve texture based on selected attributes
        const newTexture = this.textures[this.selectedColor]?.[this.selectedGraphic]

        if (newTexture) {
            this.setupTexture(newTexture)
            this.mugMesh.material.map = newTexture
            this.mugMesh.material.needsUpdate = true
        } else {
            console.error('mug Texture not found for selected attributes.')
        }
    }


}