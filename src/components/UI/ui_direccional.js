import React from 'react';
import './ui_direccional.less';
import UiWatcher from './ui_watcher';

class UiDireccional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keypressed: '',
            draggable: true,
        };
        this.container = React.createRef();
    }
    // componentDidMount() {
    //     this.inputElement.addEventListener(
    //         'on-up-key', this.props.onUpKey
    //     );
    //      this.inputElement.addEventListener(
    //         'on-down-key', this.props.onDownKey
    //     );
    //      this.inputElement.addEventListener(
    //         'on-left-key', this.props.onLeftKey
    //     );
    //      this.inputElement.addEventListener(
    //         'on-right-key', this.props.onRightKey
    //     );
    // }

    // componentWillUnmount() {
    //     this.inputElement.removeEventListener(
    //         'on-up-key', this.props.onUpKey
    //     );
    //     this.inputElement.removeEventListener(
    //         'on-down-key', this.props.onDownKey
    //     );
    //     this.inputElement.removeEventListener(
    //         'on-left-key', this.props.onLeftKey
    //     );
    //     this.inputElement.removeEventListener(
    //         'on-right-key', this.props.onRightKey
    //     );
    // }
    _keyDown(e) {
        switch (e.keyCode) {
            case 38:
                this.props.onUpKey(e);
                this.setState({keypressed: 'up'});
                break;
            case 40:
                this.props.onDownKey(e);
                this.setState({keypressed: 'down'});
                break;
            case 37:
                this.props.onLeftKey(e);
                this.setState({keypressed: 'left'});
                break;
            case 39:
                this.props.onRightKey(e);
                this.setState({keypressed: 'right'});
                break;
            default:
        }
    }
    _keyUp(e) {
        this.setState({keypressed: ''});
    }
    _dragStart(e) {
        this.container.current.classList.add('dragging');
        // this.translate(this.state.prevClientX, this.state.prevclientY);
    }
    _drag(e) {
        if (e.clientX===0 && e.clientY===0) {
            return false;
        }
        let parent = this.container.current.parentNode.getClientRects()[0];
        let container = this.container.current.getClientRects()[0];
        let stepX = e.clientX - this.state.clickX;
        let stepY = parent.height - (parent.height - e.clientY)
            - (container.height + this.state.clickY);
        if (!stepX==0 || !stepY==0) {
            this.translate(stepX, stepY);
        }
    }
    _dragEnd() {
        this.container.current.classList.remove('dragging');
    }
    _mouseDown(e) {
       // let parent = this.container.current.parentNode.getClientRects()[0];
        let offset = this.container.current.getClientRects()[0];
        this.setState({
            clickX: e.clientX - offset.left,
            clickY: Math.abs(e.clientY - offset.bottom), // + offset.height,
        });
    }
    _mouseUp(e) {

    }
    translate(x, y) {
        x=isNaN(x)?0:x;
        y=isNaN(y)?0:y;
        this.container.current.style.transform =
            `translate(${x}px, ${y}px)`;
    }
    render() {
        return (
                <div className={`uidirectional ${this.state.keypressed}`}
                    onKeyDown={this._keyDown.bind(this)}
                    onKeyUp={this._keyUp.bind(this)}
                    tabIndex={1}
                    draggable={this.state.draggable}
                    onDragStart={this._dragStart.bind(this)}
                    onDrag={this._drag.bind(this)}
                    onDragEnd={this._dragEnd.bind(this)}
                    onMouseDown={this._mouseDown.bind(this)}
                    onMouseUp={this._mouseUp.bind(this)}
                    ref={this.container}
                >
                  <div className="up">up</div>
                  <div className="left">left</div>
                  <div className="down">down</div>
                  <div className="right">right</div>
                  <UiWatcher value={this.state.clickX} label={'clickX'}/>
                  <UiWatcher value={this.state.clickY} label={'clickY'}/>
                </div>
        );
    }
}

UiDireccional.defaultProps = {
    prevClientX: 0,
    prevclientY: 0,
    onRightKey: () => false,
    onUpKey: () => false,
    onLeftKey: () => false,
    onDownKey: () => false,
};

export default UiDireccional;
