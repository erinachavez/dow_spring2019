const zoetrope = document.getElementById("zoetrope");

document.getElementById("rotate-toggle").addEventListener("change", function() {
  rotate(this);
});

document.getElementById("zoom-toggle").addEventListener("change", function() {
  zoom(this);
});

function rotate(toggle) {
  if (toggle.checked) {
    zoetrope.style.animationPlayState = "running";
  }
  else {
    zoetrope.style.animationPlayState = "paused";
  }
}

function zoom(toggle) {
  if (toggle.checked) {
    zoetrope.style.animationName = "spin-wide-to-spin";

    setTimeout(function(){
      zoetrope.style.animationName = "spin";
    }, 1000);

    document.body.style.perspective = "500px";
  }
  else {
    document.body.style.perspective = "3000px";

    setTimeout(function(){
      zoetrope.style.animationName = "spin-to-spin-wide";

      setTimeout(function(){
        zoetrope.style.animationName = "spin-wide";
      }, 1000);
    }, 750);
  }
}
