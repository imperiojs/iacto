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
const mainColor = 'white';
const activeColor = '#FEE123';
swipeExample.style.backgroundColor = mainColor;
pinchExample.style.backgroundColor = mainColor;
panExample.style.backgroundColor = mainColor
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
  setTimeout(() => {
    swipeExample.style.transform = `skewX(0deg) translate(0px, 0px)`;
    swipeExample.style.backgroundColor = mainColor;    
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
  }
  if (event.end) {
    inPinch = false;
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
  }
  if (event.end) {
    inPan = false;
    panExample.style.backgroundColor = mainColor;  
    const transform = unmatrix(panExample);  
    panLocation[0] = transform.translateX;
    panLocation[1] = transform.translateY;
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
    const translateString = `translate(${panLocation[0]}px, ${panLocation[1]}px)`;
    const rotateString = `rotate(${rotationAngle + event.rotation}deg)`;
    const scaleString = `scale(${scale})`;
    rotateExample.style.transform = `${translateString} ${rotateString} ${scaleString}`;
  }
  if (event.end) {
    inRotate = false;
    rotateExample.style.backgroundColor = mainColor;
    const transform = unmatrix(rotateExample);  
    rotationAngle = transform.rotate;
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
}

function handlePressUp(event) {
  pressExample.style.backgroundColor = mainColor;
  pressExample.style.height = '100px';
  pressExample.style.width = '100px';
}

imperio.pressListener(handlePress);
imperio.pressUpListener(handlePressUp);

function handleTap(event) {
  tapExample.style.backgroundColor = activeColor;
  tapExample.style.height = '40px';
  tapExample.style.width = '400px';
  setTimeout(() => {
    tapExample.style.height = '125px';
    tapExample.style.width = '125px'; 
    tapExample.style.backgroundColor = mainColor;
  }, 250);
}

imperio.tapListener(handleTap);

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

// imperio.webRTCConnect();

// var connectType = document.getElementById('connectionType');
// setInterval(() => {
//   connectType.innerHTML = `connected via ${imperio.connectionType}`;
// }, 500);