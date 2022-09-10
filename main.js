import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import blueplanet from './blueplanet.jpg';
import colin from './colin.jpg';
import pink from './pink.jpg';
import lunarpink from './lunarpink.jpg';
import violetblue from './violetblue.png';
import silvergalaxy from './silvergalaxy.jpg';
import space from './space.jpg';
import lightblue from './lightblue.png';


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
  const marioTexture = new THREE.TextureLoader().load(colin);
  const mario = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: marioTexture }));
  scene.add(mario);

  mario.position.z = -5;
  mario.position.x = 2;
  return mario;
}

//create a triangle with three sides and add it to the scene

const moon = newMoon();
function newMoon() {
  const moonTexture = new THREE.TextureLoader().load(pink);
  const normalTexture = new THREE.TextureLoader().load(lunarpink);

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
//create second moon
const moon2 = newMoon2();
function newMoon2() {
  const moonTexture = new THREE.TextureLoader().load(blueplanet);
  const normalTexture = new THREE.TextureLoader().load(lunarpink);

  const moon2 = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  );

  scene.add(moon2);

  moon2.position.z = 50;
moon2.position.setX(-15);
  return moon2;
}

const moon3 = newMoon3();
function newMoon3() {
  const moonTexture = new THREE.TextureLoader().load(violetblue);
  const normalTexture = new THREE.TextureLoader().load(lunarpink);

  const moon3 = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  );

  scene.add(moon3);

  moon3.position.z = 70;
moon3.position.setX(-15);
  return moon3;
}



function torus() {
  const luigiTexture = new THREE.TextureLoader().load(silvergalaxy);
  const geometry = new THREE.TorusGeometry(10, 2.8, 16, 100);
  const material = new THREE.MeshStandardMaterial({ map: luigiTexture });
  const torus = new THREE.Mesh(geometry, material);

  scene.add(torus);
}

function torus2() {
  const luigiTexture = new THREE.TextureLoader().load(lightblue);
  const geometry = new THREE.TorusGeometry(5, 0.3, 16, 100);
  const material = new THREE.MeshStandardMaterial({ map: luigiTexture });
  const torus2 = new THREE.Mesh(geometry, material);

  //set torus to be horizontal with moon2
  torus2.rotation.x = 90;


  
  torus2.position.z = 30;
torus2.position.setX(-10);
scene.add(torus2);


}
torus2();
torus();
//add stars randomly generated in the scene
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(7)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

/* const triangle = newTriangle();
function newTriangle() {
  //create a triangle with three sides that uses the same texture
  const triangleTexture = new THREE.TextureLoader().load('colin.jpg');
  const triangle = new THREE.Mesh(
    new THREE.TetrahedronGeometry(3, 0),
    new THREE.MeshBasicMaterial({ map: triangleTexture })
  );
  scene.add(triangle);

  triangle.position.z = 55;
  triangle.position.x = -20;

  
}
*/

Array(250).fill().forEach(addStar);

//Set background scene
const spaceTexture = new THREE.TextureLoader().load(space);
scene.background = spaceTexture;


function moveCamera() {
const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.0125;
  moon.rotation.y += 0.0125;
  moon.rotation.z += 0.0125;

  moon2.rotation.x += 0.0125;
  moon2.rotation.y += 0.0125;
  moon2.rotation.z += 0.0125;
  
  moon3.rotation.x += 0.0125;
  moon3.rotation.y += 0.0125;
  moon3.rotation.z += 0.0125;

  mario.rotation.y += 0.0125;
  mario.rotation.z += 0.0125;
  
  

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera

//animate function that recursively calls the render method
function animate() {
  requestAnimationFrame( animate );
  
  //animate the stars
  scene.children.forEach(child => {
    child.rotation.y += 0.001;
  } );
  renderer.render( scene, camera );

  controls.update( clock.getDelta() );
}
animate();