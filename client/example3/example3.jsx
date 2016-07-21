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
    // imperio.pinchListener(handlePinch);
    // imperio.swipeListener(handleSwipe);
    // imperio.rotateListener(handleRotate);
    // imperio.pressListener(handlePress);
    // imperio.pressUpListener(handlePressUp);
  },

  /* Method provided by react-component-visibility mixin
   * Invokes prop function visibilityUpdate
   */
  // componentVisibilityChanged() {
  //   const update = { umbra: this.state.visible };
  //   this.props.visibilityUpdate(update);
  // },

  /* ------------------------------------ */
  /* ----           Render           ---- */
  /* ------------------------------------ */

// ReactDOM.render(<div style={divStyle}>Hello World!</div>, mountNode);

  render() {
    return (
      <div style={{ height: '700px', border: '1px solid black' }}>
        <div>Hello, I am Example3</div>
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
              />
      </div>
    );
  },
});

module.exports = Example3;
