import React from 'react';
import './ui_watcher.less';

class uiWatcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keypressed: '',
            draggable: true,
        };
    }
    _dragStart(e) {

    }
    render() {
        return (
            <span
                className={this.props.className}>
                    {this.props.label}
                    {this.props.label.length>0?':':''}
                    {this.props.value}
            </span>
        );
    }
}

uiWatcher.defaultProps = {
    className: 'uiwatcher',
    style: {
    },
};

export default uiWatcher;
