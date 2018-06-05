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
        this.speed = 10;
    }
    componentDidMount() {
        this.caida();
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    caida() {
        this.speed = this.speed>=0.5?this.speed - 0.08 : 0.5;
        let x = this.getRandom(-550, 550);
        this.c = TweenMax.fromTo(
            [this.container.current],
            this.speed,
            // from
            {
              x: x,
              y: -35,
              fontSize: this.getRandom(20, 90),
            },
            // to
            {
              y: (document.body.offsetHeight +
                 this.container.current.offsetHeight),
              ease: Circ.easeIn,
              rotation: `+=${this.getRandom(0.2, 5)*360}`,
            },
        ).delay(this.getRandom(1, 20));

        this.c.eventCallback('onComplete', () => {
            this.props.onComplete(this);
            this.caida();
        });
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
        this.explode.restart().pause();
        this.c.pause();
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
      explode.to(letter, 1.2, {scale: 1.4, color: 'yellow', ease: Expo.easeOut}
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
