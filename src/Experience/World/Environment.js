import * as THREE from 'three';
import Experience from '../Experience';

export default class Environment {
    constructor(experience, container) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.containerAttribute = container.getAttribute('data-3d')

        if (['sat', 'solar', 'gun', 'arm'].includes(this.containerAttribute)) {
            this.setDirectionalLightRover()
            this.setEnvironmentMap()
        }

        else if (this.containerAttribute === 'rubix') {
            this.setAmbLight()
            this.setEnvironmentMapRubix()
            //this.setDirectionalLight()
        }

        else if (this.containerAttribute === 'shirt' || this.containerAttribute === 'cap' || this.containerAttribute === 'mug') {

            this.setEnvironmentMapStore()
            this.setDirectionalLightStore()
        }

        else if (this.containerAttribute === 'map') {
            //this.ambLight = new THREE.AmbientLight(0x404040, 20)
            //this.scene.add(this.ambLight)


            this.setEnvironmentMap()
            this.setDirectionalLightMap()
        }
    }
    setDirectionalLightRover() {
        this.dirLight = new THREE.DirectionalLight(0xffffff, 10)
        this.dirLight.position.set(0, 2, 1)
        this.scene.add(this.dirLight)

    }

    setDirectionalLightMap() {
        this.dirLightMap = new THREE.DirectionalLight(0xffffff, 6)
        this.dirLightMap.position.set(0, 4, 16)
        //this.dirLightMap.rotation.x = Math.PI / 9
        this.dirLightMap.target.position.set(0, 0, -11)
        this.dirLightMap.shadow.camera.far = 1800
        this.dirLightMap.shadow.mapSize.set(4096, 4096)
        this.dirLightMap.shadow.normalBias = 0.05
        this.dirLightMap.castShadow = true

        const d = 50
        this.dirLightMap.shadow.camera.left = -d
        this.dirLightMap.shadow.camera.right = d
        this.dirLightMap.shadow.camera.top = d
        this.dirLightMap.shadow.camera.bottom = -d
        this.scene.add(this.dirLightMap)
        const helper = new THREE.DirectionalLightHelper(this.dirLightMap, 1);
        this.scene.add(helper);
    }

    setDirectionalLightStore() {
        this.dirLightFront = new THREE.DirectionalLight(0xffffff, 4)
        this.dirLightFront.position.set(0, 0, 9)

        this.scene.add(this.dirLightFront)

        // this.dirLightBack = new THREE.DirectionalLight(0xffffff, 4)
        // this.dirLightBack.position.set(-1, 0, -2)

        // this.scene.add(this.dirLightBack)

        // this.dirLightSide = new THREE.DirectionalLight(0xffffff, 4)
        // this.dirLightSide.position.set(2, 0, 12)

        // this.scene.add(this.dirLightSide)

    }

    setAmbLight() {
        this.ambLight = new THREE.AmbientLight(0x404040, 80)

        //this.ambLight.position.set(1, 1, 1)

        this.scene.add(this.ambLight)
    }





    setEnvironmentMap() {
        this.environmentMap = {}

        this.environmentMap.intensity = 3


        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.LinearSRGBColorSpace

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterial()
    }

    setEnvironmentMapStore() {
        this.environmentMap = {}

        this.environmentMap.intensity = 3

        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterial()
    }

    setEnvironmentMapRubix() {
        this.environmentMap = {}

        this.environmentMap.intensity = 2

        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterial()
    }
}
