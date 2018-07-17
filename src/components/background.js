import React, {Component} from 'react';
import './background.less';
import {TweenMax, TimelineMax} from 'gsap/all';
class Background extends Component {
    constructor(props) {
        super(props);
        this.background = React.createRef();
        this.stars = React.createRef();
        this.sun = React.createRef();
        this.state = {
          stars1: [],
          stars2: [],
          stars3: [],
        };
    }
    componentDidMount() {
        this.setState({
            stars1: this.getStars(1),
            stars2: this.getStars(2),
            stars3: this.getStars(3),
        });
        /* TweenMax.set(this.background.current, {
          width: 500,
          height: 500,
        }); */
        /* TweenMax.to([this.stars.current], 300, {
          rotation: 360,
          repeat: -1,
          transformOrigin: '50% 50%',
        }); */
        /* TweenMax.to(['#sun'], 10, {
          className: '+=on',
          repeat: -1,
          yoyo: true,
          ease: Bounce.easeInOut,
        }); */
        // this.toDay();
        /* TweenMax.to([this.stars.current], 2, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          ease: Bounce.easeInOut,
        }); */
    }
    blinkRed() {
        // this.tl.pause();
        TweenMax.fromTo([this.background.current], 0.1,
          {background: ''},
          {background: 'rgba(255, 0, 0, 0.5)',
           yoyo: true,
           repeat: 1,
           onComplete: () => {
             // this.tl.resume();
           },
          }
        );
        /* TweenMax.to([this.background.current], 0.1,
            {
              className: '+=miss',
              yoyo: true,
              repeat: 1,
              onComplete: () => {
                this.tl.resume();
              },
            }
        );*/
    }
    toDay() {
      this.tl = new TimelineMax({
          delay: 0.5,
          duration: 120,
      });
      let tl = this.tl;

      tl.to(this.sun.current, 0, {
          x: 10,
          y: document.body.offsetHeight + this.sun.current.offsetHeight,
       })
      .to(this.sun.current, 120, {
          y: 0 - this.sun.current.offsetHeight / 2,
          x: 50,
      });
      tl.to(this.background.current, 120, {
        className: '+=day',
      }, 0);
      /* tl.to(this.stars.current, 120, {
        opacity: .3,
      }, 0); */
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    getStars(n) {
        return Array.from(new Array(n * 80)).map((v, i, ar) => {
            let style = {
              position: 'absolute',
              top: this.getRandom(0, this.background.current.offsetHeight),
              left: this.getRandom(0, this.background.current.offsetWidth),
              width: `${n}px`,
              height: `${n}px`,
              backgroundColor: '#FFFFFF',
            };
            return <span key={i} style={style}></span>;
        });
    }
    render() {
        return (
            <div className='background' ref={this.background}>
              <div>
                <div>
                  {this.state.stars1}
                </div>
                <div>
                  {this.state.stars2}
                </div>
                <div>
                  {this.state.stars3}
                </div>
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
