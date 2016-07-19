var panDiv = document.getElementById('pan-box');
var swipeDiv = document.getElementById('swipe-box');
var rotateDiv = document.getElementById('rotate-box');
var pinchDiv = document.getElementById('pinch-box');

imperio.emitRoomSetup();

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

imperio.gesture('swipe', swipeDiv, swipeCount);

imperio.gesture('pinch', pinchDiv, handlePinch);

imperio.gesture('pan', panDiv, handlePan);

imperio.gesture('rotate', rotateDiv, handleRotate);

imperio.gesture('press', panDiv, handlePress);
imperio.gesture('pressUp', panDiv, handlePress);

// imperio.webRTCConnect();
