# Face-Detection-And-Censorship
### Introduction<br />
<img width="637" alt="censorship2" src="https://user-images.githubusercontent.com/26147681/90512700-72579180-e156-11ea-883e-578d3e1c32b8.png">



### Structure
- [x] Write a funciton that will populate a users video<br />
- [x] Size the canvas to be the same size as the video<br />
- [x] Ask the browser when the next animation frame is, and tell it to run detect for us<br />
- [x] destructuring the properties {width, height, top, left} within the method '.boundingBox'<br />


### Setup
Must use a platform that supports face detection, Chrome browser is what i have used in this project. <br />

  1. chrome://flags<br />
  2. Experimental Web Platform Web features - enabled<br />
  3. Restart browser<br />

  1. git clone project (https://docs.github.com/en/enterprise/2.13/user/articles/cloning-a-repository)<br />
  2. cd into the directory<br />
  3. installl parcel `npm install -g parcel`
  4. npm start (Parcel server should run)<br />
  5. copy+paste 'http://localhost:' into browser<br />


### useful info
https://parceljs.org/getting_started.html<br />
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia<br />
https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect<br />

