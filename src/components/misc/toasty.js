import React from 'react';
import {TweenMax, Power4} from 'gsap/all';
import './toasty.less';

class Toasty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.props.style,
            className: this.props.className,
        };
        this.audio = new Audio('./src/components/misc/toasty.mp3');
        this.container = React.createRef();
    }
    setStyle(style) {
        this.setState({style: Object.assign({}, this.state.style, style)});
    }
    show() {
        this.audio.play();
        TweenMax.set([this.container.current], 0, {opacity: 1});
        TweenMax.fromTo([this.container.current], 0.5,
          // from
          {right: -this.container.current.offsetWidth,
          },
          // to
          {right: 0,
            yoyo: true,
          ease: Power4.easeOut,
            repeatDelay: 0.1,
            repeat: 1,
            onComplete: () => {
              TweenMax.set([this.container.current], 0, {opacity: 0});
            },
          });
    }
    render() {
        return (
            <div className={this.state.className.join(' ')}
                 style={this.state.style}
                 ref={this.container}>
            </div>
        );
    }
}
/* eslint-disable max-len */

Toasty.defaultProps = {
    className: ['toasty'],

    style: {
        /* transitionProperty: 'all',
        transitionDuration: '200ms',
        transitionTimingFunction: 'linear', */
        position: 'absolute',
        width: '200px',
        height: '200px',
        bottom: 0,
        zIndex: 9000,
    },
};

export default Toasty;
