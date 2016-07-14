'use strict';

const pinchCount = document.getElementById('pinch-count')

document.getElementById('code').innerHTML = `Mobile code: <span>${imperio.nonce}</span>`;

imperio.desktopRoomSetup(imperio.socket, imperio.room);

function handleSwipe(event) {
  var swipeType = typeof event;
  console.log('swipe type is ' + swipeType); 
  console.log(event);
}

let omgString = '';

function handlePinch(event) {
  console.log('pinch event'); 
  console.log(event);
  omgString += 'omg ';
  pinchCount.innerHTML = omgString;
}

imperio.desktopSwipeHandler(handleSwipe);
imperio.desktopPinchHandler(handlePinch);
