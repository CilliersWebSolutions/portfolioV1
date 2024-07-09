

import * as THREE from 'three'
import gsap from 'gsap'
import VertexShader from './Shaders/vertex.js'
import FragmentShader from './Shaders/fragment.js'


export default class Particles {
    constructor(experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes

        this.resource = this.experience.resources.items.morphModels
        //console.log("model text to be loaded", this.experience.resources.items.morphModels)


        //this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setPoints()
        //this.setDebug()
        //this.setModel()
        //this.setAnimation()
        this.index = 0  // Initialize the index for the morphing

        this.morphDuration = 4;  // Duration for each morph

        this.morphToNextMesh(); // Start the initial morph immediately
    }



    setMesh() {

        const sortedChildren = this.resource.scene.children.sort((a, b) => {
            return a.name.localeCompare(b.name); // Sort by name
        });


        const positions = this.resource.scene.children.map(child => child.geometry.attributes.position);

        // // Ensure positions is not empty
        // if (positions.length === 0) {
        //     console.error("No positions available in the resource.")
        //     return
        // }

        // Ensure all entries in positions have valid count values
        this.maxCount = Math.max(...positions.map(p => p.count || 0))
        if (this.maxCount <= 0) {
            console.error("Invalid count values in positions.")
            return;
        }


        this.positions = positions.map(pos => {
            const array = new Float32Array(this.maxCount * 3);
            const originalArray = pos.array
            for (let i = 0; i < this.maxCount; i++) {
                const i3 = i * 3;
                if (i3 < originalArray.length) {
                    array[i3 + 0] = originalArray[i3 + 0]
                    array[i3 + 1] = originalArray[i3 + 1]
                    array[i3 + 2] = originalArray[i3 + 2]
                } else {
                    const randomIndex = Math.floor(pos.count * Math.random()) * 3;
                    array[i3 + 0] = originalArray[randomIndex + 0]
                    array[i3 + 1] = originalArray[randomIndex + 1]
                    array[i3 + 2] = originalArray[randomIndex + 2]
                }
            }
            return new THREE.Float32BufferAttribute(array, 3);
        });

        this.sizes = new Float32Array(this.maxCount).map(() => Math.random());

        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', this.positions[0])
        this.geometry.setAttribute('aPositionTarget', this.positions[3])
        this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1))

    }
    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: new VertexShader().getShader(),
            fragmentShader: new FragmentShader().getShader(),
            uniforms: {
                uSize: { value: 2 },
                uProgress: { value: 0 },
                uResolution: { value: new THREE.Vector2(this.sizes.width * this.sizes.pixelRatio, this.sizes.height * this.sizes.pixelRatio) },
                uColorA: { value: new THREE.Color('#EE6C4D') },
                uColorB: { value: new THREE.Color('#EE6C4D') },
            },
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
        });
    }
    setPoints() {
        this.points = new THREE.Points(this.geometry, this.material)
        this.points.frustumCulled = false

        this.points.material.opacity = 0; // Start with zero opacity

        this.scene.add(this.points)
        // Use gsap to animate the opacity from 0 to 1 over a duration
        this.points.position.x += 0
        this.points.rotation.y += 8 * (Math.PI / 180)

    }

    // setDebug() {
    //     if (this.debug && this.debug.active) {
    //         this.debugFolder = this.debug.ui.addFolder('particles')

    //         this.debugFolder.addColor(this.material.uniforms.uColorA, 'value').name('Color A')
    //         this.debugFolder.addColor(this.material.uniforms.uColorB, 'value').name('Color B')
    //         this.debugFolder.add(this.material.uniforms.uProgress, 'value').min(0).max(1).step(0.001).name('Progress')
    //     }
    // }
    morphFirst(index, duration = this.morphDuration) {
        this.geometry.attributes.position = this.positions[this.index]
        this.geometry.attributes.aPositionTarget = this.positions[index]

        gsap.fromTo(this.material.uniforms.uProgress, { value: 0.49 }, { value: 1, duration })

        this.index = index
    }
    morph(index, duration = this.morphDuration) {
        this.geometry.attributes.position = this.positions[this.index]
        this.geometry.attributes.aPositionTarget = this.positions[index]

        gsap.fromTo(this.material.uniforms.uProgress, { value: 0 }, { value: 1, duration, ease: 'power1.in' })

        this.index = index
    }


    morphToNextMesh() {
        // Start with an immediate morph to the first mesh from the initial state

        this.morphFirst(1, this.morphDuration);

        // Set a timeout to start the looped morphing sequence after the first morph
        setTimeout(() => {
            this.startAutoMorph();
        }, this.morphDuration);
    }

    startAutoMorph() {
        this.morphInterval = setInterval(() => {
            let nextIndex = (this.index + 1) % this.positions.length;
            if (nextIndex === 0) {
                nextIndex = 1; // Skip initial state to loop between meshes
            }
            this.morph(nextIndex);
        }, (this.morphDuration + 1) * 1000);
    }

    stopAutoMorph() {
        if (this.morphInterval) {
            clearInterval(this.morphInterval)
        }
    }


    update() {
        // Any update logic
    }

    destroy() {
        this.stopAutoMorph()
    }
}
