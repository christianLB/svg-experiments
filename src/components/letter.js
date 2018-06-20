import {TweenMax, TimelineMax, Expo, Circ, Elastic} from 'gsap/all';

import React, {Component} from 'react';
import './letter.less';

class Letter extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.explode = {};
        this.caer = {};
        this.fontSize = this.getRandom(20, 90);
        this.caer = new TimelineMax({callbackScope: this});
        this.speed = 10;
        this.active = false;
        this.x = this.getRandom(-550, 550);
        this.y = this.getRandom(100, 500);
        this.state = {
          character: 'a',
        };
    }
    componentDidMount() {
        this.letter = this.container.current;
        this.exp = this.letter.querySelector('.exp');
        this.exp2 = this.letter.querySelector('.exp2');
        this.a = new TweenMax([this.letter], 1, {});
        this.aparecer();
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    getCharacter() {
        return this.state.character;
    }
    changeCharacter() {
      // eslint-disable-next-line object-curly-spacing
      const { charList } = this.props;
      let c = charList[this.getRandom(0, charList.length)];
      this.setState({character: c}, () => {
          // this.aparecer();
      });
    }
    aparecer() {
      this.changeCharacter();
      this.repoSition();
      this.active = true;
      this.a = TweenMax.fromTo([this.letter], 1,
          {fontSize: 0,
           x: this.x,
           y: this.y,
           opacity: 0,
          },
          {fontSize: this.fontSize,
           x: this.x,
           y: this.y,
           opacity: 1,
           lazy: true,
           ease: Elastic.easeOut.config(1, 0.3),
           onComplete: () => {
             this.caida();
           },
          }
      );
    }
    caida() {
        // this.speed = this.speed>=6?this.speed - 0.08 : 0.5;
        this.c = TweenMax.to(
            [this.letter],
            this.speed,
            {
              y: (document.body.offsetHeight +
                 this.container.current.offsetHeight),
              ease: Circ.easeIn,
              // rotation: `+=${this.getRandom(0.2, 5)*360}`,
              delay: this.getRandom(1, 10),
              onComplete: () => {
                if (this.isActive()) {
                  this.props.onComplete(this);
                  this.aparecer();
                }
              },
            },
        );
    }
    repoSition() {
      this.x = this.getRandom(-550, 550);
      this.y = this.getRandom(100, 500);
    }
    isActive() {
       return this.active;
    }
    destroy() {
    //  let explode = this.explode
      this.active = false;

      TweenMax.to([this.letter], 0.1,
        {fontSize: 0}
      );
      TweenMax.fromTo([this.exp], 0.5,
         {opacity: 1,
          scale: 1,
          width: this.fontSize,
          height: this.fontSize,
          border: '0px solid #FFFFFF',
          delay: 1,
         },
         {opacity: 0,
          scale: 2.5,
          border: '5px solid #FFFFFF',
          ease: Expo.easeOut,
          onComplete: () => {
            this.c.pause();
            setTimeout(() => {
              this.aparecer();
            }, this.getRandom(1000, 5000));
         },
       });
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
                {this.state.character}
            </div>
        );
    }
}

Letter.defaultProps = {
    className: 'letter',
    maxX: 0,
    parentHeight: 0,
    charList: Array.from('abcdefghijklmnopqrstuvwxyz'),
};

export default Letter;
