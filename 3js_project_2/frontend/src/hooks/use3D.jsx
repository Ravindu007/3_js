import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export const use3D = () => {

  const threeD = (canvas) => {

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ canvas });


    const { offsetWidth, offsetHeight } = canvas.parentElement; 
    renderer.setSize(offsetWidth, offsetHeight); //set to the parent div size

    camera.position.setZ(30)
    renderer.render(scene, camera)


    // lightening
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5,5,5)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(pointLight,ambientLight)

    // controls
    const controls =  new OrbitControls(camera, renderer.domElement)


    // create object
    const geometry = new THREE.TorusGeometry(8,3,10,80)
    const material = new THREE.MeshStandardMaterial({color:'green', wireframe:true})
    const ring = new THREE.Mesh(geometry,material)

    scene.add(ring)

    // const mtlLoader = new MTLLoader();
    // const objLoader = new OBJLoader();
    // mtlLoader.load('./home/homeMTL.mtl', function (materials) {
    //   materials.preload();
    //   objLoader.setMaterials(materials);
    //   objLoader.load('./home/homeOBJ.obj', function (object) {
    //     scene.add(object);
    //   });
    // });
    
    function animate(){
      requestAnimationFrame(animate)
      controls.update();

      ring.rotation.x += 0.01;
      ring.rotation.y += 0.01;
      ring.rotation.z += 0.01;
      
      renderer.render(scene,camera)
    }
    animate()
  }

  return {threeD}
}