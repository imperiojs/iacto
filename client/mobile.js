var swipeDiv = document.getElementById('swipe');
var pinchDiv = document.getElementById('pinch-box');
var panDiv = document.getElementById('pan-box');

imperio.mobileRoomSetup(imperio.socket, imperio.room);

function swipeCount() {
  console.log('in swipeCount');
};

function handlePinch (event) {
  console.log('detecting pinch');
}

function handlePan (event) {
  console.log('detecting pan');
}

function handleRotate (event) {
  console.log('detecting rotation');
}

function handlePress (event) {
  console.log('detecting press');
}

imperio.curse('swipe', swipeDiv, swipeCount);
imperio.curse('pinch', pinchDiv, handlePinch);
imperio.curse('pinchStart', pinchDiv, handlePinch);
imperio.curse('pinchEnd', pinchDiv, handlePinch);

imperio.curse('pan', panDiv, handlePan);
imperio.curse('panStart', panDiv, handlePan);
imperio.curse('panEnd', panDiv, handlePan);

imperio.curse('rotate', panDiv, handleRotate);
imperio.curse('rotateStart', panDiv, handleRotate);
imperio.curse('rotateEnd', panDiv, handleRotate);

imperio.curse('press', panDiv, handlePress);
imperio.curse('pressUp', panDiv, handlePress);
