// Helper Functions

// RGB to HEX
// credit: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r,g,b) {
  return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Get random color
function random_color(instructions){
  $.ajax({
      url: "http://linserv1.cims.nyu.edu:25000/random_color",
      type: "GET",
      contentType: "application/json",
      success: function( data ) {
        rgb = "rgb(" + data["r"] + "," + data["g"] + "," + data["b"] + ")";
        hex = rgbToHex(data["r"], data["g"], data["b"]);

        if (instructions == "chain_abstractions"){
          link = document.getElementById("chain_abstractions_link");
          link.value = rgb;

          link.addEventListener('mouseenter', function(){
            id = this.id.replace("link", "geo");
            document.getElementById(id).style.display = "block";

            this.style.color = this.value;
          });
          link.addEventListener('mouseleave', function(){
            id = this.id.replace("link", "geo");
            document.getElementById(id).style.display = "none";

            this.style.color = "#000";
          });

          geo = document.getElementById('chain_abstractions_geo');
          init_chain_abstractions(hex, geo);
        }
        else if (instructions == "synesthesia_sentences"){
          link = document.getElementById("synesthesia_sentences_link");
          link.value = rgb;

          link.addEventListener('mouseenter', function(){
            id = this.id.replace("link", "geo");
            document.getElementById(id).style.display = "block";

            this.style.color = this.value;
          });
          link.addEventListener('mouseleave', function(){
            id = this.id.replace("link", "geo");
            document.getElementById(id).style.display = "none";

            this.style.color = "#000";
          });

          geo = document.getElementById('synesthesia_sentences_geo');
          init_synesthesia_sentences(hex, geo);
        }
        else if (instructions == "a_normal_day_in_london"){
          link = document.getElementById("a_normal_day_in_london_link");
          link.value = rgb;

          link.addEventListener('mouseenter', function(){
            id = this.id.replace("link", "geo");
            document.getElementById(id).style.display = "block";

            this.style.color = this.value;
          });
          link.addEventListener('mouseleave', function(){
            id = this.id.replace("link", "geo");
            document.getElementById(id).style.display = "none";

            this.style.color = "#000";
          });

          geo = document.getElementById('a_normal_day_in_london_geo');
          init_a_normal_day_in_london(hex, geo);
        }
      }
  });
}


// Home Page
function navigation(){
  random_color("chain_abstractions");
  random_color("synesthesia_sentences");
  random_color("a_normal_day_in_london");
}


// Chain Abstractions
function chain_abstractions(){
  console.log("Starting call to server...")
  $.ajax({
      url: "http://linserv1.cims.nyu.edu:25000/chain_abstractions",
      type: "GET",
      contentType: "application/json",
      success: function( data ) {
        removeLoading();

        document.getElementById("poem").innerHTML = data;

        var lines = document.getElementById('poem').children;
        if (lines.length != 0) {
          var i=0, c = setInterval(function() {
            lines[i].style.opacity = 1;
            i++;

            if (i >= lines.length){
              // Add actions here for after poem has completely displayed
              clearInterval(c);
            };
          }, 1000);
        }
      },
  });
}


function removeLoading(objectName) {
  var selectedObject = scene.getObjectByName("text");
  scene.remove(selectedObject);

  var selectedObject = scene.getObjectByName("mesh");
  scene.remove(selectedObject);
  animate_skybox();
}

function display_chain_abstractions(){
  chain_abstractions();

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
  camera.position.z = 700;
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xfffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  material = new  THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
  text_mtl = new  THREE.MeshBasicMaterial({color: 0x000000});

  var loader = new THREE.FontLoader();

  loader.load( 'johnston.json', function ( font ) {
  	var geometry = new THREE.TextGeometry( 'Loading...', {
  		font: font,
  		size: 30,
  		height: 5,
  		curveSegments: 12,
  	});
    text = new THREE.Mesh(geometry, text_mtl);
    text.position.x = -70;
    text.position.y = -10;
    text.name = "text";
    scene.add(text);
  });

  geometry = new THREE.IcosahedronGeometry(50, 0);
  mesh = new THREE.Mesh(geometry, material);
  mesh.name = "mesh";
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  animate_skybox();
}

function animate_skybox() {
  requestAnimationFrame(animate_skybox);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
  controls.update();
}


// Synesthesia Sentences
function synesthesia_sentences(){
  console.log("Starting call to server...");
  $.ajax({
      url: "http://linserv1.cims.nyu.edu:25000/synesthesia_sentences",
      type: "GET",
      contentType: "application/json",
      success: function( data ) {
        display_synesthesia_sentences(data);
      }
  });
}

function translate(value, leftMin, leftMax, rightMin, rightMax){
  leftSpan = leftMax - leftMin;
  rightSpan = rightMax - rightMin;

  valueScaled = parseFloat(value - leftMin) / parseFloat(leftSpan);

  return rightMin + (valueScaled * rightSpan)

}

function display_synesthesia_sentences(html){
  document.getElementById("content").innerHTML = html;
  polarity_raw = document.getElementById("polarity").innerHTML;
  // subjectivity_raw = document.getElementById("subjectivity").innerHTML;

  polarity = translate(parseFloat(polarity_raw), -1, 1, 20, 100);
  // subjectivity = translate(parseFloat(subjectivity_raw), 0, 1, 0, 255);

  points = "";
  cur_x = Math.floor(Math.random() * screen.width);
  cur_y = Math.floor(Math.random() * screen.height);

  for (var i = 0; i < parseInt(polarity); i++){
    x = Math.floor((Math.random() * cur_x+50) + cur_x-50);
    y = Math.floor((Math.random() * cur_y+50) + cur_y-50);

    if (x > screen.width){
      x = 50;
    }

    if (y > screen.height){
      y = 50;
    }

    points += x + "," + y + " ";

    cur_x = x;
    cur_y = y;
  }
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  hex1 = rgbToHex(r, g, b);

  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  hex2 = rgbToHex(r, g, b);

  document.getElementById("synthesize").innerHTML = `
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#` + hex1.replace("0x","") + `"/>
        <stop offset="100%" stop-color="#` + hex2.replace("0x","") + `"/>
      </linearGradient>
    </defs>
    <polygon points='` + points + `' stroke="url(#gradient)" />
  `;
}


// A Normal Day in London
function a_normal_day_in_london(){
  console.log("Starting call to server...")
  $.ajax({
      url: "http://linserv1.cims.nyu.edu:25000/a_normal_day_in_london",
      type: "GET",
      contentType: "application/json",
      success: function( data ) {
        display_a_normal_day_in_london(data);
      },
      error : function(xhr, textStatus, errorThrown ) {
        console.log("error, trying again");
        $.ajax(this);
        return;
    }
  });
}

function display_a_normal_day_in_london(html){
  document.getElementById("content").innerHTML = html;

  document.getElementById("poem").innerHTML += "<button id='close'>close</button>";
  document.getElementById("close").addEventListener("click", function(){
    document.getElementById("poem").style.display = "none";
  });

  ellipses = document.getElementsByTagName("ellipse");
  for (var i = 0; i < ellipses.length; i++){
    ellipses[i].addEventListener('mouseenter', function(){
      document.getElementsByClassName("station")[0].innerHTML = "<span>" + this.id + "</span>";
    });

    ellipses[i].addEventListener('mouseleave', function(){
      document.getElementsByClassName("station")[0].innerHTML = "";
    });
  }

  $(".legend").on("change", function(){
      var line = $(this).attr("id");

      if ($(this).is(":checked")){
          $("." + line).css("display", "block");
      }
      else{
          $("." + line).css("display", "none");
      }
  });

  $(document).on('mousemove', function(e){
    $('.station').offset({
      left: e.pageX + 10,
      top: e.pageY + 10
    });
  });
}
