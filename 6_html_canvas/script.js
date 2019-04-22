const c1 = document.getElementById('c1');
const context1 = c1.getContext('2d');

const c2 = document.getElementById('c2');
const context2 = c2.getContext('2d');

const c3 = document.getElementById('c3');
const context3 = c3.getContext('2d');

let w1, w2, w3;
let h1, h2, h3;

let image = document.querySelector('img');

function setup() {
  // Canvas 1
  w1 = c1.width;
  h1 = c1.height;

  c1.style.width = w1 + 'px';
  c1.style.height = h1 + 'px';

  let s1 = window.devicePixelRatio;
  c1.width = w1 * s1;
  c1.height = h1 * s1;

  context1.scale(s1, s1);

  // Canvas 2
  w2 = c2.width;
  h2 = c2.height;

  c2.style.width = w2 + 'px';
  c2.style.height = h2 + 'px';

  let s2 = window.devicePixelRatio;
  c2.width = w2 * s2;
  c2.height = h2 * s2;

  context2.scale(s2, s2);

  // Canvas 3
  w3 = c3.width;
  h3 = c3.height;

  c3.style.width = w3 + 'px';
  c3.style.height = h3 + 'px';

  let s3 = window.devicePixelRatio;
  c3.width = w3 * s3;
  c3.height = h3 * s3;

  context3.scale(s3, s3);
}

let frameRate = 0;
let catRate = 0;

function draw() {
  // Frame rate handling
  if (frameRate % 30 == 0) {
    catRate++;

    if (catRate > 3) {
      catRate = 0;
    }
  }

  // Canvas 1
  let p1 = new Path2D("M 170 140 L 170 125 L 165 115 L 160 90 L 163 70 L 186 48 L 197 35 L 225 14 L 265 10 L 335 47 L 353 80 L 365 90 L 315 85 L 290 90 L 270 98 L 250 108 L 230 122 L 210 137 L 190 150 L 178 157 L 150 169 z");
  let p2 = new Path2D("M 375 183 L 400 180 L 409 175 L 415 170 L 419 165 L 424 153 L 424 140 L 420 130 L 410 118 L 390 104 L 365 90 L 315 85 L 290 90 L 270 98 L 250 108 L 230 122 L 210 137 L 190 150 L 178 157 L 150 169 L 152 173 L 157 177 L 165 173 L 180 170 z");
  let p3 = new Path2D();
  let p4 = new Path2D("M 275 105 L 150 200 L 160 250 L 285 155 z");
  let p5 = new Path2D("M 350 133 L 344 135 L 340 135 L 335 133 L  325 126 L 310 119 L 295 116 L 280 117 L 270 118 L 260 119 L 250 117 L 247 149 L 253 158 L 260 162 L 275 168 L 295 172 L 307 172 L 315 168 L 325 160 L 330 155 L 335 150 L 340 148 L 345 149 L 346 150 L 348 160 L 350 165 L 355 171 L 365 173 L 375 173 L 385 171 L 395 166 L 400 161 L 403 155 L 405 150 L 406 145 L 407 140 L 408 135 L 408 130 L 406 125 L 404 123 L 400 121 L 395 120 L 390 119 L 380 120 L 370 124 L 360 129 z")

  if (catRate == 0) {
    context1.fillStyle = 'rgb(255, 219, 125)';
  }
  else if (catRate == 1) {
    context1.fillStyle = 'rgb(255, 0, 0)';
  }
  else if (catRate == 2) {
    context1.fillStyle = 'rgb(0, 0, 255)';
  }
  else if (catRate == 3) {
    context1.fillStyle = 'rgb(0, 255, 0)';
  }
  context1.fill(p1);
  context1.save();

  if (catRate == 0) {
    context1.fillStyle = 'rgb(189, 118, 0)';
  }
  else if (catRate == 1) {
    context1.fillStyle = 'rgb(255, 118, 0)';
  }
  else if (catRate == 2) {
    context1.fillStyle = 'rgb(189, 118, 255)';
  }
  else if (catRate == 3) {
    context1.fillStyle = 'rgb(189, 255, 0)';
  }
  context1.fill(p2);
  context1.save();

  context1.fillStyle = 'rgb(255, 255, 255)';
  p3.arc(310, 165, 70, 0, Math.PI*2);
  p3.closePath();
  context1.fill(p3);
  context1.save();

  context1.fillStyle = 'rgb(255, 255, 255)';
  context1.fill(p4);
  context1.save();

  // Canvas 2
  context2.drawImage(image, 0, -325, 600, 900);

  let imageData = context2.getImageData(0, 0, c2.width, c2.height);
  let data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (catRate == 1) {
      data[i] = data[i + (c2.width * 4 / 3)];
    }
    else if (catRate == 2) {
      data[i + 1] = data[i + 1 + (c2.width * 4 / 1.5)];
    }
    else if (catRate == 3) {
      data[i + 2] = data[i + 2 + (c2.width * 4 / 4)];
    }
  }

  context2.putImageData(imageData, 0, 0);

  // Canvas 3

  if (catRate == 0) {
    context3.fillStyle = 'rgb(0, 0, 0)';
  }
  else if (catRate == 1) {
    context3.fillStyle = 'rgb(255, 0, 0)';
  }
  else if (catRate == 2) {
    context3.fillStyle = 'rgb(0, 0, 255)';
  }
  else if (catRate == 3) {
    context3.fillStyle = 'rgb(0, 255, 0)';
  }
  context3.fill(p5);
  context3.save();

  // Frame rate + animation
  frameRate++;
  requestAnimationFrame(draw);
};

setup();

image.addEventListener('load', draw);
