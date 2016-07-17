var panDiv = document.getElementById('pan-box');
var swipeDiv = document.getElementById('swipe-box');
var rotateDiv = document.getElementById('rotate-box');
var pinchDiv = document.getElementById('pinch-box');

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

imperio.curse('pan', panDiv, handlePan);

imperio.curse('rotate', rotateDiv, handleRotate);
imperio.curse('rotateStart', rotateDiv, handleRotate);
imperio.curse('rotateEnd', rotateDiv, handleRotate);

imperio.curse('press', panDiv, handlePress);
imperio.curse('pressUp', panDiv, handlePress);
