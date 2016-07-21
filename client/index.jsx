// require npm modules
const React = require('react');
const ReactDOM = require('react-dom');
// require components
const VisibilityBox = require('./main/visibility.jsx');
const ConnectionInfo = require('./main/connectionInfo.jsx');
const Header = require('./main/header.jsx');
const Example3 = require('./example3/example3.jsx');
const gyroStyles = require('./utils/styles.jsx');

const App = React.createClass({
  getInitialState() {
    return {
      connections: {},
      colors: {
        main: 'white',
        active: 'FEE123',
      },
      swipeCSS: {},
      panCSS: {},
      pinchCSS: {},
      rotateCSS: {},
      pressCSS: {},
      tapCSS: {},
      carouselContCSS: {},
      carouselCSS: {},
      lastPanLocation: [0, 0],
      currentPanLocation: [0, 0],
      lastRotateAngle: 0,
      currentRotateAngle: 0,
      lastPinchScale: 1,
      currentPinchScale: 1,
    };
  },

  componentDidMount() {
    console.log(gyroStyles);
    imperio.listenerRoomSetup();
    imperio.swipeListener(this.handleSwipe);
    imperio.pinchListener(this.handlePinch);
    imperio.panListener(this.handlePan);
    imperio.rotateListener(this.handleRotate);
    imperio.tapListener(this.handleTap);
    // imperio.pressListener(this.handlePress);
    // imperio.pressUpListener(this.handlePressUp);
    imperio.roomUpdate(this.updateConnectionInfo);
  },

  /* ------------------------------------ */
  /* ----       Event Handlers       ---- */
  /* ------------------------------------ */

  /* Invoked when listenerRoomSetup / roomUpdate fires
   * Logs the updated state of the socket room
   */
  updateConnectionInfo(roomData) {
    console.log('Room Updated!', roomData);
    if (roomData) {
      this.setState({ connections: roomData.sockets });
    }
  },

  handleSwipe(event) {
    const multiplier = event.deltaX > 0 ? 1 : -1;
    const magnitude = multiplier * (5 * (Math.abs(event.velocityX) / 10) + 5 * (event.distance / 1000)) / 10;
    const timing = 150 + 400 * Math.abs(magnitude);
    const skewString = `skewX(${-1 * magnitude * 80}deg)`;
    const xPosString = `translate(${magnitude * 750}px, 0px)`;
    const swipeStyle = {
      transition: `transform ${timing / 1000}s`,
      transform: `${skewString} ${xPosString}`,
      backgroundColor: this.state.colors.active,
    };
    this.setState( { swipeCSS: swipeStyle } );
    setTimeout(() => {
      const prevSwipeStyle = {
        transition: `transform ${timing / 1000}s`,
        transform: 'skewX(0deg) translate(0px, 0px)',
        backgroundColor: this.state.colors.main,
      };
      this.setState({ swipeCSS: prevSwipeStyle });
    }, timing);
  },

  handlePan(event) {
    const xLoc = this.state.lastPanLocation[0] + event.deltaX;
    const yLoc = this.state.lastPanLocation[1] + event.deltaY;
    this.setState({ panCSS: { transform: `translate(${xLoc}px, ${yLoc}px)` } });
    if (event.end) this.setState({ lastPanLocation: [xLoc, yLoc] });
  },

  handleRotate(event) {
    const angle = this.state.lastRotateAngle + event.rotation;
    this.setState({ rotateCSS: { transform: `rotate(${angle}deg)` } });
    if (event.end) this.setState({ lastRotateAngle: angle });
  },

  handlePinch(event) {
    const pinchScale = this.state.lastPinchScale * event.scale;
    this.setState({ pinchCSS: { transform: `scale(${pinchScale})` } });
    if (event.end) this.setState({ lastPinchScale: pinchScale });
  },

  handleTap(event) {
    const timing = 0.25;
    const tapStyle = {
      transition: `height ${timing}s, width ${timing}s`,
      height: `50px`,
      width: `350px`,
    };
    this.setState( { tapCSS: tapStyle } );
    setTimeout(() => {
      const prevTapStyle = {
        transition: `height ${timing}s, width ${timing}s`,
        height: `150px`,
        width: `150px`,
      };
      this.setState({ tapCSS: prevTapStyle });
    }, timing * 1000);
    imperio.accelerationListener(this.measureAccelAndRemoveGestures);
  },

  measureAccelAndRemoveGestures(event) {
    console.log('hey there');
    if (this.state.inSensorMode) return;
    if (event.x > 25 || event.y > 25) {
      this.setState({
        carouselContCSS: gyroStyles.carouselContainer,
        carouselCSS: gyroStyles.carousel,
        swipeCSS: gyroStyles.swipe,
        panCSS: gyroStyles.pan,
        pinchCSS: gyroStyles.pinch,
        rotateCSS: gyroStyles.rotate,
        pressCSS: gyroStyles.press,
        tapCSS: gyroStyles.tap,
      });
    }
    // imperio.gyroscopeListener(gyroFunctions);
    // setTimeout(startRotation, 3000)
  },

  // startRotation() {
  //   setInterval(rotate, 40);
  // },

  /* Invoked from any rendered examples upon the example becoming visible
   * Updates state.isVisible to determine which example is visible
   */
  visibilityUpdate(update) {
    for (let example in update) { // eslint-disable-line
      if (update.hasOwnProperty(example)) {
        this.state.isVisible[example] = update[example];
      }
    }
    this.setState({ isVisible: this.state.isVisible });
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    return (
      <div id="app">
        <VisibilityBox isVisible={this.state.isVisible} />
        <ConnectionInfo connections={this.state.connections} />
        <Header />
        <Example3 visibilityUpdate={this.visibilityUpdate} 
                  currentPanLocation={this.state.currentPanLocation}
                  currentRotateAngle={this.state.currentRotateAngle}
                  currentPinchScale={this.state.currentPinchScale}
                  swipeCSS={this.state.swipeCSS} 
                  panCSS={this.state.panCSS} 
                  pinchCSS={this.state.pinchCSS} 
                  rotateCSS={this.state.rotateCSS} 
                  pressCSS={this.state.pressCSS} 
                  tapCSS={this.state.tapCSS} 
                  carouselContCSS={this.state.carouselContCSS} 
                  carouselCSS={this.state.carouselCSS} 
                  />
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
