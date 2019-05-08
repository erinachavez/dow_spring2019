let scene, camera, renderer, controls, mesh;
let seed_value, density, z_height, frame_count, paused;

// default values
seed_value = 0;
density = 50;
z_height = 10;
pause = false;

// add event listeners for input elements
let density_input = document.getElementById("density");
density_input.addEventListener("change", function(){
  density = density_input.value;
});

let z_height_input = document.getElementById("z_height");
z_height_input.addEventListener("change", function(){
  z_height = z_height_input.value;
});

let pause_input = document.getElementById("pause");
pause_input.addEventListener("click", function(){
  if (pause == false) {
    pause = true;
    pause_input.value = "Play";
  }
  else {
    pause = false;
    pause_input.value = "Pause";
  }
});

init();

function init() {
  // scene
  scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;

  // cubemap
  scene.background = new THREE.CubeTextureLoader()
    .setPath( 'images/sky/' )
    .load( [
      'pos-x.jpg',
      'neg-x.jpg',
      'pos-y.jpg',
      'neg-y.jpg',
      'pos-z.jpg',
      'neg-z.jpg'
    ] );

  camera = new THREE.PerspectiveCamera(45, width/height, 10, 25000);
  camera.position.set(0, -200, 1000);
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xfffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  // render
  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);

  // orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // append renderer w/ orbit controls to page
  document.body.appendChild(renderer.domElement);

  // custom geometry
  terrain();
}

function terrain() {
  let loader = new THREE.TextureLoader();

  // https://threejs.org/docs/index.html#api/en/materials/MeshMatcapMaterial
  let material = new THREE.MeshMatcapMaterial({map: loader.load('images/ocean.jpg'), side: THREE.DoubleSide});

  // Create flat plane
  let geometry = new THREE.PlaneGeometry(2000, 1000, 199, 199); // width, height, width segments, height segments

  mesh = new THREE.Mesh(geometry, material);

  // create perline noise random geometry
  noise.seed(seed_value);
  for (let i = 0; i < mesh.geometry.vertices.length; i++) {
    var value = noise.perlin2(mesh.geometry.vertices[i].x / density, mesh.geometry.vertices[i].y / density);
    mesh.geometry.vertices[i].z = value * z_height;
  }

  mesh.position.y = -325; // move down
  mesh.rotation.x = -Math.PI / 2; // rotate flat

  // necessary for adding light to the custom vertices
  geometry.computeVertexNormals();

  scene.add(mesh);

  frame_count = 0;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // if user hasn't paused animation
  if (!pause) {
    // slow down frame count
    if (frame_count%7.5 == 0){
      noise.seed(seed_value);
      for (let i = 0; i < mesh.geometry.vertices.length; i++) {
        var value = noise.perlin2(mesh.geometry.vertices[i].x / density, mesh.geometry.vertices[i].y / density);
        mesh.geometry.vertices[i].z = value * z_height;
      }
      mesh.geometry.verticesNeedUpdate = true;

      // if seed value reaches limit (1), reset
      if (seed_value >= 1) {
        seed_value = 0;
      }
      else {
        seed_value += .0001;
      }
    }

    // update frame count
    frame_count += 1;
  }

  controls.update();
}

function windowResize() {
  camera.aspect = (window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', windowResize);
