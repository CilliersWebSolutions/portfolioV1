import * as THREE from 'three';
import Experience from '../Experience';

export default class Environment {
    constructor(experience, container) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.containerAttribute = container.getAttribute('data-3d')


        if (['cr', 'sp', 'gn', 'ma'].includes(this.containerAttribute)) {
            this.setDirectionalLight()
            this.setEnvironmentMap()
        }


        else if (this.containerAttribute === 'an') {
            this.setAmbLight()
            this.setEnvironmentMap3()
            //this.setDirectionalLight()
        }

        else if (this.containerAttribute === 'sh', 'cp', 'mg') {

            this.setEnvironmentMap2()
            this.setDirectionalLight2()
        }

    }

    setDirectionalLight() {
        this.dirLight = new THREE.DirectionalLight(0xffffff, 10)
        this.dirLight.position.set(0, 2, 1)
        this.scene.add(this.dirLight)
    }

    setDirectionalLight2() {
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

        // this.dirLight.castShadow = true
        // this.dirLight.shadow.camera.far = 15
        // this.dirLight.shadow.mapSize.set(1024, 1024)
        // this.dirLight.shadow.normalBias = 0.05

        //this.ambLight.position.set(1, 1, 1)

        this.scene.add(this.ambLight)
    }





    setEnvironmentMap() {
        this.environmentMap = {}

        this.environmentMap.intensity = 1.5

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

    setEnvironmentMap2() {
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

    setEnvironmentMap3() {
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
