// Chain Abstractions
let camera_c, scene_c, renderer_c, mesh_c;

function init_chain_abstractions(color, container) {
  let geometry, material;

  scene_c = new THREE.Scene();
  let width = screen.width;
  let height = screen.height;

  camera_c = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  camera_c.position.set(0, 0, 700);
  scene_c.add(camera_c);

  geometry = new THREE.DodecahedronGeometry(450, 0);
  material = new  THREE.MeshBasicMaterial({color: parseInt(color), wireframe: true});
  mesh_c = new THREE.Mesh(geometry, material);
  scene_c.add(mesh_c);

  renderer_c = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer_c.setSize(width, height);
  container.appendChild(renderer_c.domElement);

  renderer_c.render(scene_c, camera_c);

  animate_chain_abstractions();
}

function animate_chain_abstractions() {
  requestAnimationFrame(animate_chain_abstractions);

  mesh_c.rotation.x += 0.01;
  mesh_c.rotation.y += 0.02;

  renderer_c.render(scene_c, camera_c);
}


// Synesthesia Sentences
let camera_s, scene_s, renderer_s, mesh_s_1, mesh_s_2;

function init_synesthesia_sentences(color, container) {
  let geometry, material;

  scene_s = new THREE.Scene();
  let width = screen.width;
  let height = screen.height;

  camera_s = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  camera_s.position.set(0, 0, 700);
  scene_s.add(camera_s);

  geometry = new THREE.IcosahedronGeometry(150, 0);
  material = new  THREE.MeshBasicMaterial({color: parseInt(color), wireframe: true});
  mesh_s_1 = new THREE.Mesh(geometry, material);
  mesh_s_1.position.x = 110;
  mesh_s_1.position.y = 110;
  scene_s.add(mesh_s_1);

  geometry = new THREE.IcosahedronGeometry(150, 0);
  material = new  THREE.MeshBasicMaterial({color: parseInt(color), wireframe: true});
  mesh_s_2 = new THREE.Mesh(geometry, material);
  mesh_s_2.position.x = -110;
  mesh_s_2.position.y = -40;
  scene_s.add(mesh_s_2);

  renderer_s = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer_s.setSize(width, height);
  container.appendChild(renderer_s.domElement);

  renderer_s.render(scene_s, camera_s);

  animate_synesthesia_sentences();
}

function animate_synesthesia_sentences() {
  requestAnimationFrame(animate_synesthesia_sentences);

  mesh_s_1.rotation.x += 0.01;
  mesh_s_1.rotation.y += 0.02;

  mesh_s_2.rotation.x += 0.01;
  mesh_s_2.rotation.y += 0.02;

  renderer_s.render(scene_s, camera_s);
}


// A Normal Day in London
let camera_l, scene_l, renderer_l, mesh_l_1, mesh_l_2, mesh_l_3;

function init_a_normal_day_in_london(color, container) {
  let geometry, material;

  scene_l = new THREE.Scene();
  let width = screen.width;
  let height = screen.height;

  camera_l = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  camera_l.position.set(0, 0, 700);
  scene_l.add(camera_l);

  // large sphere
  geometry = new THREE.SphereGeometry(250, 16, 16);
  material = new  THREE.MeshBasicMaterial({color: parseInt(color), wireframe: true});
  mesh_l_1 = new THREE.Mesh(geometry, material);
  mesh_l_1.position.x = width - (width - 200 - 150);
  mesh_l_1.position.y = -150;
  scene_l.add(mesh_l_1);

  // medium sphere
  geometry = new THREE.SphereGeometry(75, 8, 8);
  material = new  THREE.MeshBasicMaterial({color: parseInt(color), wireframe: true});
  mesh_l_2 = new THREE.Mesh(geometry, material);
  mesh_l_2.position.x = -300;
  mesh_l_2.position.y = 150;
  scene_l.add(mesh_l_2);

  // small sphere
  geometry = new THREE.SphereGeometry(10, 6, 6);
  material = new  THREE.MeshBasicMaterial({color: parseInt(color), wireframe: true});
  mesh_l_3 = new THREE.Mesh(geometry, material);
  mesh_l_3.position.x = 150;
  mesh_l_3.position.y = 225;
  scene_l.add(mesh_l_3);

  renderer_l = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer_l.setSize(width, height);
  container.appendChild(renderer_l.domElement);

  renderer_l.render(scene_l, camera_l);

  animate_a_normal_day_in_london();
}

function animate_a_normal_day_in_london() {
  requestAnimationFrame(animate_a_normal_day_in_london);

  mesh_l_1.rotation.x += 0.01;
  mesh_l_1.rotation.y += 0.02;

  mesh_l_2.rotation.x += 0.01;
  mesh_l_2.rotation.y += 0.02;

  mesh_l_3.rotation.x += 0.01;
  mesh_l_3.rotation.y += 0.02;

  renderer_l.render(scene_l, camera_l);
}
