'use strict';

imperio.listenerRoomSetup();

document.getElementById('code').innerHTML = `Mobile code: <span>${imperio.nonce}</span>`;

const elements = {};
const swipeExample = document.getElementById('swipe-example');
const pinchExample = document.getElementById('pinch-example');
const panExample = document.getElementById('pan-example');
const rotateExample = document.getElementById('rotate-example');
const pressExample = document.getElementById('press-example');
const tapExample = document.getElementById('tap-example');
const currentEvent = document.getElementById('current-event');
const cubeContainer = document.getElementById('cube-container');
const mainColor = 'white';
const activeColor = '#FEE123';
swipeExample.style.backgroundColor = mainColor;
pinchExample.style.backgroundColor = mainColor;
panExample.style.backgroundColor = mainColor;
rotateExample.style.backgroundColor = mainColor;
pressExample.style.backgroundColor = mainColor;
tapExample.style.backgroundColor = mainColor;

function handleSwipe(event) {
  const multiplier = event.deltaX > 0 ? 1 : -1; //1 for left, -1 for right
  //magnitude estimates intensity of swipe on a 0-1 scale;
  const magnitude = multiplier * (5 * (Math.abs(event.velocityX) / 10) + 5 * (event.distance / 1000)) / 10;
  const skewString = `skewX(${-1 * magnitude * 80}deg)`;
  const xPosString = `translate(${magnitude * 750}px, 0px)`;
  const timing = 150 + 400 * Math.abs(magnitude);
  swipeExample.style.backgroundColor = activeColor;  
  swipeExample.style.transition = `transform ${timing / 1000}s`;
  swipeExample.style.transform = `${skewString} ${xPosString}`;
  currentEvent.innerHTML = 'SWIPE';
  setTimeout(() => {
    swipeExample.style.transform = `skewX(0deg) translate(0px, 0px)`;
    swipeExample.style.backgroundColor = mainColor;    
    currentEvent.innerHTML = '';
  }, timing);
}

imperio.swipeListener(handleSwipe);

const initializePinch = unmatrix(pinchExample);
const initializePan = unmatrix(panExample);
const initializeRotate = unmatrix(rotateExample);
let scale = initializePinch.scaleX;
let inPinch = false;
let panLocation = [initializePan.translateX, initializePan.translateY];
let inPan = false;
let rotationAngle = initializeRotate.rotate;
let inRotate = false;

function handlePinch(event) {
  if (event.start) {
    inPinch = true;
    pinchExample.style.backgroundColor = activeColor;
    currentEvent.innerHTML = 'PINCH';         
  }
  if (event.end) {
    inPinch = false;
    currentEvent.innerHTML = '';             
    pinchExample.style.backgroundColor = mainColor ;   
    const transform = unmatrix(pinchExample);
    scale = transform.scaleX;
  }
  if (inPinch) {
    const scaleString = `scale(${scale * event.scale})`;
    pinchExample.style.transform = `${scaleString}`;
  }
}

imperio.pinchListener(handlePinch);

function handlePan(event) {
  if (event.start) {
    inPan = true;
    panExample.style.backgroundColor = activeColor;
    currentEvent.innerHTML = 'PAN';    
  }
  if (event.end) {
    inPan = false;
    panExample.style.backgroundColor = mainColor;  
    const transform = unmatrix(panExample);  
    panLocation[0] = transform.translateX;
    panLocation[1] = transform.translateY;
    currentEvent.innerHTML = '';    
  }
  if (inPan) {
    const translateString = `translate(${panLocation[0] + event.deltaX}px, ${panLocation[1] + event.deltaY}px)`;
    panExample.style.transform = `${translateString}`;
  }
}

imperio.panListener(handlePan);

function handleRotate(event) {
  if (event.start) {
    inRotate = true;
    rotateExample.style.backgroundColor = activeColor;
    const rotateString = `rotate(${rotationAngle + event.rotation}deg)`;
    rotateExample.style.transform = `${rotateString}`;
    currentEvent.innerHTML = 'ROTATE';    
  }
  if (event.end) {
    inRotate = false;
    rotateExample.style.backgroundColor = mainColor;
    const transform = unmatrix(rotateExample);  
    rotationAngle = transform.rotate;
    currentEvent.innerHTML = '';   
  }
  if (inRotate) {
    const rotateString = `rotate(${rotationAngle + event.rotation}deg)`;
    rotateExample.style.transform = `${rotateString}`;
  }
}

imperio.rotateListener(handleRotate);

function handlePress(event) {
  pressExample.style.backgroundColor = activeColor;
  pressExample.style.height = '300px';
  pressExample.style.width = '300px';
  currentEvent.innerHTML = 'PRESS'; 
}

function handlePressUp(event) {
  pressExample.style.backgroundColor = mainColor;
  pressExample.style.height = '125px';
  pressExample.style.width = '125px';
  currentEvent.innerHTML = '';  
}

imperio.pressListener(handlePress);
imperio.pressUpListener(handlePressUp);

function handleTap(event) {
  tapExample.style.backgroundColor = activeColor;
  tapExample.style.height = '40px';
  tapExample.style.width = '400px';
  currentEvent.innerHTML = 'TAP';
  setTimeout(() => {
    tapExample.style.height = '125px';
    tapExample.style.width = '125px'; 
    tapExample.style.backgroundColor = mainColor;
    currentEvent.innerHTML = '';    
  }, 250);

  imperio.accelerationListener(measureAccelAndRemoveGestures); 
}

imperio.tapListener(handleTap);

let accelTimes = 0;

const fake = document.getElementById('fake');
const gesture = document.getElementById('gesture-container');

function measureAccelAndRemoveGestures(event) {
  if (accelTimes > 0) return;
  if (event.x > 25 || event.y > 25) {
    const timing = '3';
    swipeExample.style.transition = `transform ${timing}s`;
    panExample.style.transition = `transform ${timing}s`;
    pinchExample.style.transition = `transform ${timing}s`;
    rotateExample.style.transition = `transform ${timing}s`;
    pressExample.style.transition = `transform ${timing}s`;
    tapExample.style.transition = `transform ${timing}s`;
    fake.style.display = `block`;
    fake.style.margin = `0 auto`;
    fake.style.width = `150px`;
    fake.style.height = `150px`;
    fake.style.position = `relative`;
    fake.style.perspective = `1000px`;
    gesture.style.width = `100%`;
    gesture.style.height = `100%`;
    gesture.style.transformStyle = `preserve-3d`;

    swipeExample.style.display = `block`;
    swipeExample.style.position = `absolute`;
    swipeExample.style.width = `150px`;
    swipeExample.style.height = `150px`;
    swipeExample.style.lineHeight = `200px`;
    swipeExample.style.transform = `rotateY(0deg) translateZ(450px)`;

    panExample.style.display = `block`;
    panExample.style.position = `absolute`;
    panExample.style.width = `150px`;
    panExample.style.height = `150px`;
    panExample.style.lineHeight = `200px`;
    panExample.style.transform = `rotateY(60deg) translateZ(450px)`;

    pinchExample.style.display = `block`;
    pinchExample.style.position = `absolute`;
    pinchExample.style.width = `150px`;
    pinchExample.style.height = `150px`;
    pinchExample.style.lineHeight = `200px`;
    pinchExample.style.transform = `rotateY(120deg) translateZ(450px)`;

    rotateExample.style.display = `block`;
    rotateExample.style.position = `absolute`;
    rotateExample.style.width = `150px`;
    rotateExample.style.height = `150px`;
    rotateExample.style.lineHeight = `200px`;
    rotateExample.style.transform = `rotateY(180deg) translateZ(450px)`;

    pressExample.style.display = `block`;
    pressExample.style.position = `absolute`;
    pressExample.style.width = `150px`;
    pressExample.style.height = `150px`;
    pressExample.style.lineHeight = `200px`;
    pressExample.style.transform = `rotateY(240deg) translateZ(450px)`;

    tapExample.style.display = `block`;
    tapExample.style.position = `absolute`;
    tapExample.style.width = `150px`;
    tapExample.style.height = `150px`;
    tapExample.style.lineHeight = `200px`;
    tapExample.style.transform = `rotateY(300deg) translateZ(450px)`;

    accelTimes += 1;
    imperio.gyroscopeListener(gyroFunctions);
    setTimeout(startRotation, 3000)
    
  }
}

function startRotation () {
  swipeExample.style.border = `2px solid red`;
  panExample.style.border = `2px solid red`;
  pinchExample.style.border = `2px solid red`;
  rotateExample.style.border = `2px solid red`;
  pressExample.style.border = `2px solid red`;
  tapExample.style.border = `2px solid red`;
  setInterval(rotate, 40);
}

function unmatrix(el) {
  return 'string' != typeof el
    ? parse(style(el))
    : parse(el);
};

function parse(str) {
  var m = stom(str);
  var A = m[0];
  var B = m[1];
  var C = m[2];
  var D = m[3];

  if (A * D == B * C) throw new Error('transform#unmatrix: matrix is singular');

  // step (3)
  var scaleX = Math.sqrt(A * A + B * B);
  A /= scaleX;
  B /= scaleX;

  // step (4)
  var skew = A * C + B * D;
  C -= A * skew;
  D -= B * skew;

  // step (5)
  var scaleY = Math.sqrt(C * C + D * D);
  C /= scaleY;
  D /= scaleY;
  skew /= scaleY;

  // step (6)
  if ( A * D < B * C ) {
    A = -A;
    B = -B;
    skew = -skew;
    scaleX = -scaleX;
  }

  return {
    translateX: m[4],
    translateY: m[5],
    rotate: rtod(Math.atan2(B, A)),
    skew: rtod(Math.atan(skew)),
    scaleX: round(scaleX),
    scaleY: round(scaleY)
  };
};

function style(el) {
  var style = window.getComputedStyle(el, null);

  return style.getPropertyValue('transform')
    || style.getPropertyValue('-webkit-transform')
    || style.getPropertyValue('-moz-transform')
    || style.getPropertyValue('-ms-transform')
    || style.getPropertyValue('-o-transform');
};

function stom(str) {
  var m = [];

  if (window.WebKitCSSMatrix) {
    m = new window.WebKitCSSMatrix(str);
    return [m.a, m.b, m.c, m.d, m.e, m.f];
  }

  var rdigit = /[\d\.\-]+/g;
  var n;

  while(n = rdigit.exec(str)) {
    m.push(+n);
  }

  return m;
};

function rtod(radians) {
  var deg = radians * 180 / Math.PI;
  return round(deg);
};

function round(n) {
  return Math.round(n * 100) / 100;
}

let alphaDiff = 0;
let betaDiff = 0;
let gammaDiff = 0;

function initializeArray(length) {
  let newArray = [];
  for (let i = 0; i < length; i++) {
    newArray.push(0);
  }
  return newArray;
}

const runningDataSize = 3;
let alphaDataArray = initializeArray(runningDataSize);
let betaDataArray = initializeArray(runningDataSize);
let gammaDataArray = initializeArray(runningDataSize);
let gyroscopeDataStore = [alphaDataArray, betaDataArray, gammaDataArray];
let gyroscopeAverages = initializeArray(3);

function runningAverage(newData, dataArray) {
  const length = dataArray.length;
  dataArray.shift();
  dataArray.push(newData);
  return (dataArray.reduce((a, b) => {return a + b;})) / length;
}

// Running average function stacks most recent acceleration points and calcs avg
function calculateRunningAverages(dataObject, dataArray) {
  let i = 0;
  for (let key in dataObject) {
    gyroscopeAverages[i] = runningAverage(dataObject[key], dataArray[i]);
    i++;
  }
}

function gyroFunctions(gyroDataObject) {
  calculateRunningAverages(gyroDataObject, gyroscopeDataStore);
}

var carousel = document.getElementById("carousel"),
    currdeg  = 0;

function rotate(){
  gesture.style.transform = `rotateY(${gyroscopeAverages[0]}deg)`;  
}