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
        this.explode = new TimelineMax({paused: true});
        this.caer = new TimelineMax({paused: true});
    }
    componentDidMount() {
        setTimeout(() => {
            this.init();
        }, 1);
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    init() {
        let container = this.container.current;
        let letter = this.container.current;
        let exp = letter.querySelector('.exp');
        let exp2 = letter.querySelector('.exp2');
        let explode = this.explode;

        let onStart = () => {
            let exp = this.container.current.querySelector('.exp');
            let exp2 = this.container.current.querySelector('.exp2');
            let fontSize = this.getRandom(25, 80);
            TweenMax.to(container, 0,
                {bottom: document.body.offsetHeight,
                 left: this.getRandom(0, this.props.maxX),
                 fontSize: fontSize,
                 opacity: 1,
                }
            );
            exp.style.width = `${fontSize}px`;
            exp.style.height = `${fontSize}px`;
            exp2.style.width = `${fontSize}px`;
            exp2.style.height = `${fontSize}px`;
            this.caer.timeScale(1.1);
        };
        // ///////////////////////////////////////////
        this.caer.to(container, 10,
                    {bottom: 0,
                     delay: this.getRandom(1, 10),
                    },
        );
        this.caer.eventCallback('onStart', onStart);
        this.caer.eventCallback('onComplete', () => {
            this.props.onComplete(this);
            this.caer.restart();
        });
        // ///////////////////////////////////////////
        explode.eventCallback('onComplete', () => {
            this.explode.restart().pause();
            this.caer.restart();
        });
        explode.to([exp, exp2], 0.1, {opacity: 1});
        explode.to(exp2, 0.5, {
          scale: 4,
          border: '5px solid red',
          opacity: 0,
          ease: Expo.easeOut,
        }, 0.2);
        explode.to(exp, 1.2, {
            scale: 1.5,
            ease: Expo.easeOut}, 0);
        explode.to(exp, 0.5, {backgroundColor: 'yellow'}, 0.3);
        explode.to(exp, 0.5, {backgroundColor: 'red', opacity: 0}, 0.6);
        explode.to(letter, 0.2, {opacity: 0}, 0.6);
        explode.to(letter, 1.2, {
            scale: 2, color: 'yellow', ease: Expo.easeOut}, 0.1);
        this.caer.play();
    }
    destroy() {
        this.caer.pause();
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
