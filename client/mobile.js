var panDiv = document.getElementById('pan-box');
var swipeDiv = document.getElementById('swipe-box');
var rotateDiv = document.getElementById('rotate-box');
var pinchDiv = document.getElementById('pinch-box');
var tapDiv = document.getElementById('tap-box');

imperio.emitRoomSetup();

imperio.gesture('swipe', swipeDiv);

imperio.gesture('pinch', pinchDiv);

imperio.gesture('pan', panDiv);

imperio.gesture('rotate', rotateDiv);

imperio.gesture('press', panDiv);
imperio.gesture('pressUp', panDiv);

tapDiv.addEventListener('click', imperio.emitTap);

imperio.emitTap()
