import React, { Component } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../Animation - 1701454528869.json';


class Preloader extends Component {
  render() {
    const { loading } = this.props;

    // Use the loading prop to control the visibility
    const preloaderStyle = {
        display: loading ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed', // Fixed position to cover the whole screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent background
        zIndex: 1000, // High z-index to ensure it's on top of other content
      };
      
    return (
      <div className="preloader" style={preloaderStyle}>
        <Lottie animationData={animationData} loop={true} autoplay={true} />
      </div>
    );
  }
}

export default Preloader;
   