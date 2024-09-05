import * as THREE from 'three'

export default class Map {

    constructor(experience, containerAttribute) {
        //setup
        this.experience = experience
        this.partAttribute = containerAttribute

        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //load the model resource
        this.resource = this.resources.items.mapModel
        this.texture = this.resources.items.mapTexture
        console.log('this is the map model', this.resource)
        this.setModel(containerAttribute)

    }
    setModel(containerAttribute) {
        const mapMesh = this.resource.scene.children.find(child => child.name === 'mapBaked')
        if (!mapMesh) {
            console.error('Base mesh not found!')
            return;
        }


        mapMesh.material = new THREE.MeshStandardMaterial({ map: this.texture })
        this.setupTexture(mapMesh.material.map)
        mapMesh.material.side = THREE.DoubleSide
        mapMesh.scale.set(1, 1, 1)
        //mapMesh.position.x = 10
        mapMesh.rotation.y = (Math.PI) - (Math.PI / 18)
        //mapMesh.rotation.z = - Math.PI / 36
        mapMesh.rotation.z = - Math.PI

        mapMesh.rotation.z = Math.PI / 2

        this.scene.add(mapMesh)
        mapMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
            }

        })
        this.mapMesh = mapMesh
    }
    setupTexture(texture) {
        texture.flipY = false
        texture.encoding = THREE.SRGBColorSpace
    }
}