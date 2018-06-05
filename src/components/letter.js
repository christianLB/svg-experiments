import {TweenMax, TimelineMax, Expo, Circ} from 'gsap/all';

import React, {Component} from 'react';
import './letter.less';

class Letter extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.explode = {};
        this.caer = {};
        this.fontSize = this.getRandom(20, 90);
        this.explode = new TimelineMax({callbackScope: this});
        this.caer = new TimelineMax({callbackScope: this});
        this.speed = 5;
    }
    componentDidMount() {
        this.caida();
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    caida() {
        let c = TweenMax.to(this.container.current, 2, {bottom: 0});
        this.caer.to(this.container.current, 0, {opacity: 0});
        this.caer.to(this.container.current, 0, {
          bottom: document.body.offsetHeight,
          left: this.getRandom(0, this.props.maxX),
          fontSize: this.getRandom(20, 90),
          opacity: 1,
          delay: this.getRandom(1, 20),
        }, 0.1);
        this.caer.add(c);
        /* this.caer.to(this.container.current, this.speed,
          {bottom: -this.fontSize, ease: Circ.easeIn},
        ); */
        c.eventCallback('onComplete', () => {
          this.caer.pause();
          this.props.onComplete(this);
          this.speed = 1;
          this.fontSize = this.getRandom(20, 90);
          // this.caer.restart();
          this.caida();
        });
        this.caer.play();
    }
    destroy() {
      let letter = this.container.current;
      let exp = letter.querySelector('.exp');
      let exp2 = letter.querySelector('.exp2');
      let explode = this.explode;

      explode.to([exp, exp2], 0, {
        width: `${this.fontSize}px`,
        height: `${this.fontSize}px`,
        opacity: 1,
      }, 0.1);
      explode.set([exp, exp2], {scale: 1});
      explode.eventCallback('onComplete', () => {
        this.fontSize = this.getRandom(20, 90);
        this.explode.restart().pause();
        this.caer.restart().pause();
        this.caida();
      });
      // explode2 /////////////////////////
      explode.to(exp2, 0.5, {
        scale: 4,
        border: '5px solid red',
        opacity: 0,
        ease: Expo.easeOut,
      }, 0.2);
      explode.to(exp, 1.2, {scale: 1.5, ease: Expo.easeOut}, 0);
      explode.to(exp, 0.5, {backgroundColor: 'yellow'}, 0.3);
      explode.to(exp, 0.5, {backgroundColor: 'red', opacity: 0}, 0.6);
      explode.to(letter, 0.2, {opacity: 0}, 0.6);
      explode.to(letter, 1.2, {scale: 2, color: 'yellow', ease: Expo.easeOut}
      , 0.1);
      this.explode.play();
    }
    translate(x, y) {
        x=isNaN(x)?0:x;
        y=isNaN(y)?0:y;

        this.setStyle({transform: `translate(${x}px, ${y}px)`});
    }
    setStyle(obj) {
        this.setState({
            style: Object.assign({}, this.state.style, obj),
        });
    }
    render() {
        return (
            <div
                className={this.props.className}
                ref={this.container}
            >
                <span className="exp2"></span>
                <span className="exp"></span>
                {this.props.character}
            </div>
        );
    }
}

Letter.defaultProps = {
    className: 'letter',
    maxX: 0,
    parentHeight: 0,
};

export default Letter;
