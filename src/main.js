import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TimeLineSVG from './components/timelinesvg';
import Toasty from './components/misc/toasty';

import TextboxDirectional from './components/UI/textbox_directional';

import './styles/styles.less';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // modal: false,
            ticks: 20,
            marginAxisX: 60,
            marginAxisY: 60,
            lastDirectionKey: '',
            hud: {
                position: 'absolute',
                right: 0,
                top: 0,
            },
        };
        // method binding for "this" to be available
        // this.openModal = this.openModal.bind(this);
    }// constructor
    render() {
        return (
            <div>
                <div style={this.state.hud}>
                    <TextboxDirectional
                        onUpKey={this.handleUpTicks.bind(this)}
                        onDownKey={this.handleDownTicks.bind(this)}
                        value={this.state.ticks}
                        deleteOnKeyUp={false}
                        label={'ticks'}
                    />
                    <div>
                        margin X: {this.state.marginAxisX}
                    </div>
                    <div>
                        margin Y: {this.state.marginAxisY}
                    </div>
                    <TextboxDirectional
                        onUpKey={this.moveUp.bind(this)}
                        onDownKey={this.moveDown.bind(this)}
                        onLeftKey={this.moveLeft.bind(this)}
                        onRightKey={this.moveRight.bind(this)}
                        value={this.state.lastDirectionKey}
                        label={'mover'}
                    />
                    <input
                        type="button"
                        value="Toasty"
                        style={{width: '200px', marginTop: '30px'}}
                        onClick={this.showToasty.bind(this)}
                    />
                </div>
                <TimeLineSVG
                    ticks={this.state.ticks}
                    marginx={this.state.marginAxisX}
                    marginy={this.state.marginAxisY}
                />
                <Toasty
                    ref={a => this.toasty = a}
                />
            </div>
        );
    }
    showToasty() {
        this.toasty.show();
    }
    handleDownTicks() {
        this.setState({
            ticks: this.state.ticks>0?this.state.ticks-1:this.state.ticks,
        });
    }
    handleUpTicks() {
        this.setState({ticks: this.state.ticks+1});
    }
    moveRight(e) {
        this.setState({lastDirectionKey: 'right'});
        this.setState({marginAxisY: this.state.marginAxisY+15});
    }
    moveLeft() {
        this.setState({lastDirectionKey: 'left'});
        this.setState({marginAxisY: this.state.marginAxisY-15});
    }
    moveUp() {
        this.setState({lastDirectionKey: 'up'});
        this.setState({marginAxisX: this.state.marginAxisX+15});
    }
    moveDown() {
        this.setState({lastDirectionKey: 'down'});
        this.setState({marginAxisX: this.state.marginAxisX-15});
    }

    handleChange(e) {
        if (!isNaN(e.target.value)) {
            this.setState({ticks: parseInt(e.target.value, 10)});
        } else {
            this.setState({ticks: 20});
        }
    }
    handleChangeX(e) {
        if (!isNaN(e.target.value)) {
            this.setState({marginAxisX: parseInt(e.target.value, 10)});
        } else {
            this.setState({marginAxisX: 60});
        }
    }
    handleChangeY(e) {
        if (!isNaN(e.target.value)) {
            this.setState({marginAxisY: parseInt(e.target.value, 10)});
        } else {
            this.setState({marginAxisY: 60});
        }
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app1')
);
