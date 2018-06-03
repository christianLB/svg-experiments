import {TweenMax, TimelineMax, Expo} from 'gsap/all';

import React, {Component} from 'react';
import './letter.less';

class Letter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: this.props.delay,
            speed: this.props.speed,
        };
        this.container = React.createRef();
        this.explode = new TimelineMax({repeat: 13, repeatDelay: 1});
    }
    componentDidMount() {
        setTimeout(() => {
            this.init();
        }, 1);
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    getLevelVars() {
        let o = {};
        switch (this.props.level) {
            case 1:
                o.speed = 10;
                o.delay = this.getRandom(2, 5);
                break;
            case 2:
                o.speed = 8;
                o.delay = this.getRandom(2, 4);
                break;
            case 3:
                o.speed = 6;
                o.delay = this.getRandom(2, 4);
                break;
            case 4:
                o.speed = 5;
                o.delay = this.getRandom(1, 3);
                break;
            case 5:
                o.speed = 4;
                o.delay = 0;
                break;
            case 6:
                o.speed = 3;
                o.delay = 0;
                break;
            default:
                o.speed = 3;
                o.delay = 0;
        }
        return o;
    }
    init() {
        let container = this.container.current;
        let levelVars = this.getLevelVars();
        let font = this.getRandom(25, 80);
        TweenMax.set(container,
            {transformOrigin: '50% 50% 0', scale: 1}
        );
        TweenMax.to(container, 0,
            {bottom: document.body.offsetHeight,
             left: this.getRandom(0, this.props.maxX),
             fontSize: font,
             lineheight: font,
             opacity: 1,
             border: '0px solid #FFFFFF;',
            }
        );
        this.caer = TweenMax.to(container, levelVars.speed,
            {bottom: 0,
             delay: this.getRandom(1, 10),
                onComplete: () => {
                    this.props.onComplete(this);
                    this.init();
                },
            },
        );
    }
    destroy() {
        this.caer.kill(null, this.container.current);
        let letter = this.container.current;

        let exp = letter.querySelector('.exp');
        let exp2 = letter.querySelector('.exp2');
        let tl = this.explode;
        // ///////////////////////////////////////////

        tl.to(exp2, 0.5, {
          width: '+=500', height: '+=400',
          border: '100px solid red',
          opacity: 0,
          ease: Expo.easeOut,
        }, 0);
        tl.to(exp, 1.2, {
            width: '+=500', height: '+=500', ease: Expo.easeOut}, 0);
        tl.to(exp, 0.5, {backgroundColor: 'yellow'}, 0.3);
        tl.to(exp, 0.5, {backgroundColor: 'red', opacity: 0}, 0.6);
        tl.to(letter, 0.2, {opacity: 0}, 0.6);
        tl.to(letter, 1.2, {
            fontSize: '+=200', color: 'yellow', ease: Expo.easeOut}, 0.1);
    }
    destroyold() {
        this.caer.kill(null, this.container.current);
        TweenMax.to(
            this.container.current,
            .3,
            {
            fontSize: 1,
            border: '1px solid #FF0000',
            }
        );
        TweenMax.to(
            this.container.current,
            0.4,
            {
            border: '30px solid #FF0000',
            scale: 10,
            force3D: true,
            delay: .3,
            ease: Expo.easeOut,
            opacity: 0,
                onComplete: () => {
                    this.init();
                },
            },
        );
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
                style={this.state.style}
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
