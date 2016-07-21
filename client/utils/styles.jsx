const styles = {};

styles.carouselContainer = {
  display: 'block',
  margin: '0 auto',
  width: '150px',
  height: '150px',
  position: 'relative',
  perspective: '1000px',
};

styles.carousel = {
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
}

const gestureArray = ['swipe', 'pan', 'pinch', 'rotate', 'press', 'tap'];

for (let i = 0; i < gestureArray.length; i++) {
  styles[gestureArray[i]] = {
    transition: 'transform 3s',
    display: 'block',
    position: 'absolute',
    width: '150px',
    height: '150px',
    lineHeight: '200px',
    transform: `rotateY(${i * 60}) translateZ(450px)`,
  };
}

module.exports = styles;
