import React, {Component} from 'react';
import './background.less';
import {TweenMax, Bounce} from 'gsap/all';
class Background extends Component {
    constructor(props) {
        super(props);
        this.background = React.createRef();
    }
    componentDidMount() {
        TweenMax.set(this.background.current, {
          width: 500,
          height: 500,
        });
        TweenMax.to([this.background.current], 300, {
          rotation: 360,
          repeat: -1,
          transformOrigin: '50% 50%',
        });
        TweenMax.to(['#sun'], 10, {
          className: '+=on',
          repeat: -1,
          yoyo: true,
          ease: Bounce.easeInOut,
        });
    }
    blinkRed() {
        /* TweenMax.to([this.background.current], 0.1,
            {
             backgroundColor: 'red',
             yoyo: true,
             repeat: 1,
            },
        ); */
    }
    render() {
        return (
            <div className='background' ref={this.background}>
              <div className="missmask"></div>
              <div id='sun'></div>
              <div id='stars'></div>
              <div id='stars2'></div>
              <div id='stars3'></div>
            </div>
        );
    }
}

Background.defaultProps = {
};

export default Background;
