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
        this.mapSeperatedParts = this.resources.items.mapSeperatedParts

        this.mapTexture = this.resources.items.mapTexture

        console.log('this is the map model', this.resource)
        this.setModel(containerAttribute)

    }
    setModel(containerAttribute) {
        const mapStaticMesh = this.resource.scene.children.find(child => child.name === 'mapStatic')
        const mapSeperatedPartsMesh = this.resource.scene.children.find(child => child.name === 'mapStatic')

        const mapFamilyMesh = this.mapSeperatedParts.scene.children.find(child => child.name === 'mapFamily')
        const mapFoodMesh = this.mapSeperatedParts.scene.children.find(child => child.name === 'mapFood')
        const mapOfficeMesh = this.mapSeperatedParts.scene.children.find(child => child.name === 'mapOffice')
        const mapShopMesh = this.mapSeperatedParts.scene.children.find(child => child.name === 'mapShop')
        const mapSingleMesh = this.mapSeperatedParts.scene.children.find(child => child.name === 'mapSingle')
        const mapToiletsMesh = this.mapSeperatedParts.scene.children.find(child => child.name === 'mapToilets')

        // if (!mapMesh) {
        //     console.error('Base mesh not found!')
        //     return;
        // }


        mapStaticMesh.material = new THREE.MeshStandardMaterial({ map: this.mapTexture })
        mapFamilyMesh.material = new THREE.MeshStandardMaterial({ map: this.mapTexture })
        mapFoodMesh.material = new THREE.MeshStandardMaterial({ map: this.mapTexture })
        mapOfficeMesh.material = new THREE.MeshStandardMaterial({ map: this.mapTexture })
        mapShopMesh.material = new THREE.MeshStandardMaterial({ map: this.mapTexture })
        mapSingleMesh.material = new THREE.MeshStandardMaterial({ map: this.mapTexture })
        mapToiletsMesh.material = new THREE.MeshStandardMaterial({ map: this.mapTexture })

        this.setupTexture(mapStaticMesh.material.map)
        this.setupTexture(mapFamilyMesh.material.map)
        this.setupTexture(mapFoodMesh.material.map)
        this.setupTexture(mapOfficeMesh.material.map)
        this.setupTexture(mapShopMesh.material.map)
        this.setupTexture(mapSingleMesh.material.map)
        this.setupTexture(mapToiletsMesh.material.map)










        //mapMesh.scale.set(1, 1, 1)
        //mapMesh.position.x = 10
        //mapMesh.rotation.x = (Math.PI / 4)
        //mapMesh.rotation.z = - Math.PI / 36
        // mapMesh.rotation.z = - Math.PI

        //mapMesh.rotation.z = Math.PI / 2

        this.scene.add(mapStaticMesh)
        this.scene.add(mapFamilyMesh)
        this.scene.add(mapFoodMesh)
        this.scene.add(mapOfficeMesh)
        this.scene.add(mapShopMesh)
        this.scene.add(mapSingleMesh)
        this.scene.add(mapToiletsMesh)

        // mapStaticMesh.traverse((child) => {
        //     if (child instanceof THREE.Mesh) {
        //         child.castShadow = true
        //         child.receiveShadow = true
        //     }

        // })

        // mapSeperatedParts.traverse((child) => {
        //     if (child instanceof THREE.Mesh) {
        //         child.castShadow = true
        //         child.receiveShadow = true
        //     }

        // })


        this.mapStaticMesh = mapStaticMesh






    }





    setupTexture(texture) {
        texture.flipY = false
        texture.encoding = THREE.SRGBColorSpace
    }
}