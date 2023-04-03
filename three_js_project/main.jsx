import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// we need three things 1.scene 2.camera 3.renderer

// scene == container
const scene = new THREE.Scene();

// camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector("#bg")
})


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)

renderer.render(scene, camera)

// new object
const geometry  = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color:0xffffff})
const tourss = new THREE.Mesh(geometry, material)

scene.add(tourss)

// lightning
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight)


// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50)

// scene.add(lightHelper, gridHelper)


// orbit contorls
const controls = new OrbitControls(camera, renderer.domElement)

// add other objects randomly generated to the scene
function addStars(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars)



// adding background image
const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;

// adding another object 
const ravinduTexture = new THREE.TextureLoader().load('photo.jpg')
const ravindu = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:ravinduTexture})
)
scene.add(ravindu)


// adding another object - moon'
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap:normalTexture
  })
)
scene.add(moon)

// repositioning moon 
moon.position.z = 30;
moon.position.setX(-10);



// move camera on scroll
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  ravindu.rotation.y += 0.01;
  ravindu.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
}
document.body.onscroll = moveCamera



function animate(){
  requestAnimationFrame(animate)

  // rotate the ring
  tourss.rotation.x += 0.01;
  tourss.rotation.y += 0.005;
  tourss.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera)
}

animate()