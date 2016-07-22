const React = require('react');
const Visibility = require('react-component-visibility');
const Iacto = require('./iacto.jsx');

const Example3 = React.createClass({
  mixins: [Visibility],

  getInitialState() {
    return {
    };
  },

  /* ------------------------------------ */
  /* ----       Event Handlers       ---- */
  /* ------------------------------------ */


  componentDidMount() {
  },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

  render() {
    let instructions = '';
    let emitter = false;
    for (let key in this.props.connections) {
      if (this.props.connections[key] === 'emitter') emitter = true;
    }
    if (!emitter) {
      instructions += 'Connect your mobile device to interact through imperio';
    } else {
      if (this.props.gyroscopeOn) {
        instructions += 'Flick device to go back to enable gestures';
      } else {
        instructions += 'Flick device to go to enable sensors';
      }
    }
    return (
      <div id="iacto-container">
        <p id="gesture-id">{this.props.currentGesture ? this.props.currentGesture : 'imperio'}</p>
        <Iacto
              currentPanLocation={this.props.currentPanLocation}
              currentRotateAngle={this.props.currentRotateAngle}
              currentPinchScale={this.props.currentPinchScale}
              swipeCSS={this.props.swipeCSS} 
              panCSS={this.props.panCSS} 
              pinchCSS={this.props.pinchCSS} 
              rotateCSS={this.props.rotateCSS} 
              pressCSS={this.props.pressCSS} 
              tapCSS={this.props.tapCSS} 
              carouselContCSS={this.props.carouselContCSS} 
              carouselCSS={this.props.carouselCSS}
              gyroscopeOn={this.props.gyroscopeOn}
              connections={this.props.connections}
              />
        <p id="instructions">{instructions}</p>
      </div>

    );
  },
});

module.exports = Example3;
