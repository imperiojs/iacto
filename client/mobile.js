var swipeDiv = document.getElementById('swipe');
var pinchDiv = document.getElementById('pinch-box');

imperio.mobileRoomSetup(imperio.socket, imperio.room);

function swipeCount() {
  console.log('in swipeCount');
};

function handlePinch (event) {
  console.log('detecting pinch');
}

imperio.curse('swipe', swipeDiv, swipeCount);
imperio.curse('pinch', pinchDiv, handlePinch);
