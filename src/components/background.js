import React, {Component} from 'react';
import './background.less';
import {TweenMax, Bounce} from 'gsap/all';
class Background extends Component {
    constructor(props) {
        super(props);
        this.background = React.createRef();
    }
    componentDidMount() {
        TweenMax.set(document.body, {
          className: '+=normal',
        });
         TweenMax.to([this.background.current], 300, {
          rotation: 360,
          repeat: -1,
        });
        TweenMax.to(['#sun'], 10, {
          className: '+=on',
          repeat: -1,
          yoyo: true,
          ease: Bounce.easeInOut,
        });
    }
    render() {
        return (
            <div className='background' ref={this.background}>
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
