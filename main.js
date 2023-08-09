import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import blueplanet from './images/blueplanet.jpg';
import colin from './images/colin.png';
import pink from './images/pink.jpg';
import lunarpink from './images/lunarpink.jpg';
import violetblue from './images/violetblue.png';
import silvergalaxy from './images/silvergalaxy.jpg';
import space from './images/space.jpg';
import lightblue from './images/lightblue.png';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio); // Change 1
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Update camera and renderer size if window is resized
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

renderer.render(scene, camera); // Change 5

// Load textures
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const textures = {
  colinSquareTexture: textureLoader.load(colin),
  moonTexture: textureLoader.load(pink),
  normalTexture: textureLoader.load(lunarpink),
  moonTexture2: textureLoader.load(blueplanet),
  moonTexture3: textureLoader.load(violetblue),
  torusTexture: textureLoader.load(silvergalaxy),
  torusTexture2: textureLoader.load(lightblue),
  backgroundTexture: textureLoader.load(space)
};

loadingManager.onLoad = function () { // Change 4
  // Initial render of the scene after textures load
  renderer.render(scene, camera);
}

// Create lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Add controls
const controls = new OrbitControls(camera, renderer.domElement);

function createTriangleGeometry() {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    0, 0, 0,
    1, 0, 0,
    0.5, Math.sqrt(3)/2, 0
  ]);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
  geometry.faces = [];
  geometry.faces.push(new THREE.Face3(0, 1, 2, null, null, 0));
  geometry.faces.push(new THREE.Face3(0, 2, 1, null, null, 1));
  geometry.faces.push(new THREE.Face3(1, 0, 2, null, null, 2));
  
  return geometry;
}

const triangleGeometry = createTriangleGeometry();

const materials = [
  new THREE.MeshBasicMaterial({ map: textures.colinSquareTexture }),
  new THREE.MeshBasicMaterial({ map: textures.moonTexture }),
  new THREE.MeshBasicMaterial({ map: textures.normalTexture })
];

const triangle = new THREE.Mesh(triangleGeometry, materials);
scene.add(triangle);
triangle.position.set(0, 0, -10);
// Create objects
const colinSquare = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: textures.colinSquareTexture }));
scene.add(colinSquare);
colinSquare.position.z = -5;
colinSquare.position.x = 2;

const moon = createMoon(textures.moonTexture, textures.normalTexture, 30, -10);
const moon2 = createMoon(textures.moonTexture2, textures.normalTexture, 50, -15);
const moon3 = createMoon(textures.moonTexture3, textures.normalTexture, 70, -15);

function createMoon(moonTexture, normalTexture, positionZ, positionX) {
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  );
  scene.add(moon);
  moon.position.z = positionZ;
  moon.position.setX(positionX);
  return moon;
}

function createTorus(texture, geometryParams, rotationX, positionZ, positionX) {
  const geometry = new THREE.TorusGeometry(...geometryParams);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const torus = new THREE.Mesh(geometry, material);
  torus.rotation.x = rotationX;
  torus.position.z = positionZ;
  torus.position.setX(positionX);
  scene.add(torus);
}

createTorus(textures.torusTexture, [10, 2.8, 16, 100], 0, 0, 0);
createTorus(textures.torusTexture2, [5, 0.3, 16, 100], 90, 30, -10);

Array(250).fill().forEach(addStar);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

// Set background scene
scene.background = textures.backgroundTexture;

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
  colinSquare.rotation.y += 0.0125;
  colinSquare.rotation.z += 0.0125;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  scene.children.forEach(child => {
    child.rotation.y += 0.001;
  });
  renderer.render(scene, camera);
}

animate();
