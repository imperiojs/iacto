'use strict';

imperio.desktopRoomSetup();

const elements = {};
const swipeExample = document.getElementById('swipe-example');
const pinchExample = document.getElementById('pinch-example');
const panExample = document.getElementById('pan-example');
const rotateExample = document.getElementById('rotate-example');
const pressExample = document.getElementById('press-example');
const swipeText = document.getElementById('swipe-text');
const pinchText = document.getElementById('pinch-text');
const panText = document.getElementById('pan-text');
const rotateText = document.getElementById('rotate-text');
const pressText = document.getElementById('press-text');

document.getElementById('code').innerHTML = `Mobile code: <span>${imperio.nonce}</span>`;

function handleSwipe(event) {
  swipeText.style.color = 'yellow';
  setTimeout(() => { swipeText.style.color = 'grey'; }, 250);
}

imperio.desktopSwipeHandler(handleSwipe);

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
    pinchText.style.color = 'yellow';
  }
  if (event.end) {
    inPinch = false;
    const transform = unmatrix(pinchExample);
    scale = transform.scaleX;
    pinchText.style.color = 'grey';
  }
  if (inPinch) {
    const translateString = `translate(${panLocation[0]}px, ${panLocation[1]}px)`;
    const rotateString = `rotate(${rotationAngle}deg)`;
    const scaleString = `scale(${scale * event.scale})`;
    pinchExample.style.transform = `${translateString} ${rotateString} ${scaleString}`;
  }
}

imperio.desktopPinchHandler(handlePinch);

function handlePan(event) {
  if (event.start) {
    inPan = true;
    panText.style.color = 'yellow';
  }
  if (event.end) {
    inPan = false;
    const transform = unmatrix(panExample);  
    panLocation[0] = transform.translateX;
    panLocation[1] = transform.translateY;
    panText.style.color = 'grey';
  }
  if (inPan) {
    const translateString = `translate(${panLocation[0] + event.deltaX}px, ${panLocation[1] + event.deltaY}px)`;
    const rotateString = `rotate(${rotationAngle}deg)`;
    const scaleString = `scale(${scale})`;
    panExample.style.transform = `${translateString} ${rotateString} ${scaleString}`;
  }
}

imperio.desktopPanHandler(handlePan);

function handleRotate(event) {
  if (event.start) {
    inRotate = true;
    const translateString = `translate(${panLocation[0]}px, ${panLocation[1]}px)`;
    const rotateString = `rotate(${rotationAngle + event.rotation}deg)`;
    const scaleString = `scale(${scale})`;
    rotateExample.style.transform = `${translateString} ${rotateString} ${scaleString}`;
    rotateText.style.color = 'black';
  }
  if (event.end) {
    inRotate = false;
    const transform = unmatrix(rotateExample);  
    rotationAngle = transform.rotate;
    rotateText.style.color = 'grey';
  }
  if (inRotate) {
    const translateString = `translate(${panLocation[0]}px, ${panLocation[1]}px)`;
    const rotateString = `rotate(${rotationAngle + event.rotation}deg)`;
    const scaleString = `scale(${scale})`;
    rotateExample.style.transform = `${translateString} ${rotateString} ${scaleString}`;
  }
}

imperio.desktopRotateHandler(handleRotate);

function handlePress(event) {
  pressExample.style.backgroundColor = 'yellow';
  pressExample.style.height = '200px';
  pressExample.style.width = '200px';
  pressText.style.color = 'black';
}

function handlePressUp(event) {
  pressExample.style.backgroundColor = 'green';
  pressExample.style.height = '100px';
  pressExample.style.width = '100px';
  pressText.style.color = 'grey';
}

imperio.desktopPressHandler(handlePress);
imperio.desktopPressUpHandler(handlePressUp);

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