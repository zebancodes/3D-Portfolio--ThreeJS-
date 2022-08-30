import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
// Set the size of the renderer to the size of the window
renderer.setSize(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

//render method to render the scene
renderer.render(scene, camera);



//Create lights
const controls = lightControls();
function lightControls() {
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  return controls;
}

//create a cube and add it to the scene



const mario = newMario();
function newMario() {
  const marioTexture = new THREE.TextureLoader().load('dog.jpg');
  const mario = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: marioTexture }));
  scene.add(mario);

  mario.position.z = -5;
  mario.position.x = 2;
  return mario;
}


const moon = newMoon();
function newMoon() {
  const moonTexture = new THREE.TextureLoader().load('pink.jpg');
  const normalTexture = new THREE.TextureLoader().load('lunarpink.jpg');

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  );

  scene.add(moon);

  moon.position.z = 30;
moon.position.setX(-10);
  return moon;
}

//create triangle that has 3 faces that loads a different image to each face
const luigiTexture = new THREE.TextureLoader().load('star.jpg');
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ map: luigiTexture });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
//add stars randomly generated in the scene
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(125));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(250).fill().forEach(addStar);

//Set background scene
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


function moveCamera() {
const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.05;

  mario.rotation.y += 0.01;
  mario.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera

//animate function that recursively calls the render method
function animate() {
  requestAnimationFrame( animate );
  
  //animate the moon
  moon.rotation.y += 0.001;
  moon.rotation.x += 0.001;
  moon.rotation.z += 0.001;
  
  //animate the stars
  scene.children.forEach(child => {
    child.rotation.y += 0.001;
  } );
  renderer.render( scene, camera );

  controls.update( clock.getDelta() );
}

animate();