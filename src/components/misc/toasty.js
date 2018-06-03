import React from 'react';
import './toasty.less';

class Toasty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.props.style,
            className: this.props.className,
        };
        this.audio = new Audio('./src/components/misc/toasty.mp3');
    }
    setStyle(style) {
        this.setState({style: Object.assign({}, this.state.style, style)});
    }
    show() {
        this.audio.play();
        this.setState({className: ['toasty', 'on']});
        setTimeout(() => {
            this.hide();
        }, 1000);
    }
    hide() {
        this.setState({className: ['toasty']});
    }
    render() {
        return (
            <div className={this.state.className.join(' ')}
                 style={this.state.style}>
            </div>
        );
    }
}
/* eslint-disable max-len */

Toasty.defaultProps = {
    className: ['toasty'],

    style: {
        transitionProperty: 'all',
        transitionDuration: '200ms',
        transitionTimingFunction: 'linear',
        position: 'absolute',
        width: '200px',
        height: '200px',
        bottom: 0,
        zIndex: 9000,
    },
};

export default Toasty;
