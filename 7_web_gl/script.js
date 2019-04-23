let camera, scene, renderer;
let geometry, material, mesh;

const container = document.getElementById("container");

init();
draw();

function init() {
  // Scene Construction
  scene = new THREE.Scene();
  let w = 640;
  let h = 480;

  // Camera
  camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 25000);
  camera.position.y = 100;
  camera.position.z = 700;
  scene.add(camera);

  // Light
  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1); // location x, y, z
  scene.add(light);

  let pointLight = new THREE.PointLight(0xff00ff, 1, 1000);
  pointLight.position.set(-400, 400, 400);
  scene.add(pointLight);

  // Geometry
  // geometry = new THREE.BoxGeometry(200, 200, 200); //width, height, depth
  // geometry = new THREE.OctahedronGeometry(200, 0); //radius, additional vertices
  geometry = new THREE.SphereGeometry(100, 50, 50);
  material = new THREE.MeshPhongMaterial({ color: 0x008080 });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 120;
  scene.add(mesh)

  // Plane
  let planeGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  let planeMaterial = new THREE.MeshBasicMaterial({ color:0x000000, wireframe: true });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI / 2;
  scene.add(plane);

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: 1, antialias: true });
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);

  // Render
  renderer.render(scene, camera);
}

function draw() {
  // Rotate Geometry
  // mesh.rotation.x += 0.025;
  mesh.rotation.y += 0.025;
  // mesh.rotation.z += 0.025;

  // Render
  renderer.render(scene, camera);

  // Animate
  requestAnimationFrame(draw);
}
