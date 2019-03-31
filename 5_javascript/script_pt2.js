// Gather all flibooks and their frames
let all_frames = [];
const flipBooks = document.getElementsByClassName('flip-book');

for (var i = 0; i < flipBooks.length; i++) {
  frames = flipBooks[i].getElementsByTagName('img');
  all_frames.push(frames);
}

// Initialize animation variables
let current_frame = 0;
let current_animation_frame = 0;
let animation = requestAnimationFrame(flip);

function flip() {
  // Slow down animation frames
  if (current_animation_frame % 7 == 0) {
    Array.prototype.forEach.call(all_frames, function(flipBook) {
      Array.prototype.forEach.call(flipBook, function(frame) {
        if (frame != flipBook[current_frame]) {
          frame.style.display = "none";
        }
        else {
          frame.style.display = "block";
        }
      });
    });

    if (current_frame < all_frames[0].length-1) {
      current_frame++;
    }
    else {
      current_frame = 0;
    }
  }

  current_animation_frame++;
  animation = requestAnimationFrame(flip);
}
