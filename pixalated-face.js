const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new FaceDetector({fastMode: true});

const options = {
  SIZE: 5,
  SCALE: 1,
}

// console.log(video, canvas, faceCanvas, faceDetector);


//  Write a funciton that will populate a users video
async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 534, height: 400},
  });
  video.srcObject = stream;
  await video.play();

  // Size the canvas to be the same size as the video
  console.log(video.videoWidth, video.videoHeight);
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

// recursion - when a function is excuted within its own function 
async function detect() {
  const faces = await faceDetector.detect(video);
  // console.log(faces.length);
  // Ask the browser when the next animation frame is, and tell it to run detect for us
  faces.forEach(drawFace);
  faces.forEach(censor);
  requestAnimationFrame(detect);
}

// destructuring the properties {width, height, top, left} within the method '.boundingBox'
function drawFace(face) {
  const { width, height, top, left} = face.boundingBox;
  // .clearRect will erase the previous wid/height of faceDetect 
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = '#ffc600';
  ctx.lineWidth = 2;
  // .strokeRect method is a way of drawing a rectangle
  ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height)
  // Draw the small face
  faceCtx.drawImage(
    // 5 source args
    video,    // Where does the source come from?
    face.x,   // Where do we start the source pull from?
    face.y,
    face.width,
    face.height,

    // 4 draw args
    face.x,   // Where should we start drawing the x and y?
    face.y,
    options.SIZE,
    options.SIZE
  );
  // Draw the face back on, but scale up

  const width = face.width * options.SCALE;
  const height = face.height * options.SCALE;
  faceCtx.drawImage(
    faceCanvas, // source
    face.x ,   // where do we start the source pull from?
    face.y ,
    options.SIZE,
    options.SIZE,
    // Drawing args
    face.x - (width - face.width) / 2,
    face.y - (width - face.height) / 2,
    width,
    height
  );
}


populateVideo().then(detect);
