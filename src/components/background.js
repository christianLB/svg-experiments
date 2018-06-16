import React, {Component} from 'react';
import './background.less';
import {TweenMax, TimelineMax, Bounce} from 'gsap/all';
class Background extends Component {
    constructor(props) {
        super(props);
        this.background = React.createRef();
        this.stars = React.createRef();
        this.sun = React.createRef();
    }
    componentDidMount() {
        /* TweenMax.set(this.background.current, {
          width: 500,
          height: 500,
        }); */
        TweenMax.to([this.stars.current], 300, {
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
        this.toDay();
        /* TweenMax.to([this.stars.current], 2, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          ease: Bounce.easeInOut,
        }); */
    }
    blinkRed() {
        this.tl.pause();
        TweenMax.to([this.background.current], 0.1,
            {
              className: '+=miss',
              yoyo: true,
              repeat: 1,
              onComplete: () => {
                this.tl.resume();
              },
            }
        );
    }
    toDay() {
      this.tl = new TimelineMax({
          delay: 0.5,
          duration: 60,
      });
      let tl = this.tl;

      tl.to(this.sun.current, 0, {
          x: 10,
          y: document.body.offsetHeight + this.sun.current.offsetHeight,
       })
      .to(this.sun.current, 60, {
          y: 0 - this.sun.current.offsetHeight / 2,
          x: 50,
      });
      tl.to(this.background.current, 60, {
        className: '+=day',
      }, 0);
      tl.to(this.stars.current, 60, {
        opacity: .3,
      }, 0);
    }
    render() {
        return (
            <div className='background' ref={this.background}>
              <div ref={this.stars}>
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
              </div>
              <div id='sun'
                ref={this.sun}
              ></div>
            </div>
        );
    }
}

Background.defaultProps = {
};

export default Background;
