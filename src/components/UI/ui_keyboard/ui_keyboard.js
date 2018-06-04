import React from 'react';
import './ui_keyboard.less';


class UiKeyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyPressed: {key: ''},
        };
        this.htmlContainer = React.createRef();
        this.keys = [];
        this.keys[32] = {key: 'kspace', event: 'onspaceKey', keyLabel: 'down'};
        this.keys[37] = {key: 'kleft', event: 'onleftKey', keyLabel: 'left'};
        this.keys[38] = {key: 'kup', event: 'onupKey', keyLabel: 'up'};
        this.keys[39] = {key: 'kright', event: 'onrightKey', keyLabel: 'right'};
        this.keys[40] = {key: 'kdown', event: 'ondownKey', keyLabel: 'down'};
        this.keys[48] = {key: 'n0', event: 'on0Key', keyLabel: '0'};
        this.keys[49] = {key: 'n1', event: 'on1Key', keyLabel: '1'};
        this.keys[50] = {key: 'n2', event: 'on2Key', keyLabel: '2'};
        this.keys[51] = {key: 'n3', event: 'on3Key', keyLabel: '3'};
        this.keys[52] = {key: 'n4', event: 'on4Key', keyLabel: '4'};
        this.keys[53] = {key: 'n5', event: 'on5Key', keyLabel: '5'};
        this.keys[54] = {key: 'n6', event: 'on6Key', keyLabel: '6'};
        this.keys[55] = {key: 'n7', event: 'on7Key', keyLabel: '7'};
        this.keys[56] = {key: 'n8', event: 'on8Key', keyLabel: '8'};
        this.keys[57] = {key: 'n9', event: 'on9Key', keyLabel: '9'};
        this.keys[65] = {key: 'a', event: 'onaKey', keyLabel: 'a'};
        this.keys[66] = {key: 'b', event: 'onbKey', keyLabel: 'b'};
        this.keys[67] = {key: 'c', event: 'oncKey', keyLabel: 'c'};
        this.keys[68] = {key: 'd', event: 'ondKey', keyLabel: 'd'};
        this.keys[69] = {key: 'e', event: 'oneKey', keyLabel: 'e'};
        this.keys[70] = {key: 'f', event: 'onfKey', keyLabel: 'f'};
        this.keys[71] = {key: 'g', event: 'ongKey', keyLabel: 'g'};
        this.keys[72] = {key: 'h', event: 'onhKey', keyLabel: 'h'};
        this.keys[73] = {key: 'i', event: 'oniKey', keyLabel: 'i'};
        this.keys[74] = {key: 'j', event: 'onjKey', keyLabel: 'j'};
        this.keys[75] = {key: 'k', event: 'onkKey', keyLabel: 'k'};
        this.keys[76] = {key: 'l', event: 'onlKey', keyLabel: 'l'};
        this.keys[77] = {key: 'm', event: 'onmKey', keyLabel: 'm'};
        this.keys[78] = {key: 'n', event: 'onnKey', keyLabel: 'n'};
        this.keys[79] = {key: 'o', event: 'onoKey', keyLabel: 'o'};
        this.keys[80] = {key: 'p', event: 'onpKey', keyLabel: 'p'};
        this.keys[81] = {key: 'q', event: 'onqKey', keyLabel: 'q'};
        this.keys[82] = {key: 'r', event: 'onrKey', keyLabel: 'r'};
        this.keys[83] = {key: 's', event: 'onsKey', keyLabel: 's'};
        this.keys[84] = {key: 't', event: 'ontKey', keyLabel: 't'};
        this.keys[85] = {key: 'u', event: 'onuKey', keyLabel: 'u'};
        this.keys[86] = {key: 'v', event: 'onvKey', keyLabel: 'v'};
        this.keys[87] = {key: 'w', event: 'onwKey', keyLabel: 'w'};
        this.keys[88] = {key: 'x', event: 'onxKey', keyLabel: 'x'};
        this.keys[89] = {key: 'y', event: 'onyKey', keyLabel: 'y'};
        this.keys[90] = {key: 'z', event: 'onzKey', keyLabel: 'z'};
    }
    _keyDown(e) {
        let keyPressed = this.keys[e.keyCode];
        if (keyPressed) {
            let handler = this.props[keyPressed.event];
            if (handler) {
                this.props[keyPressed.event](e);
                this.setState({keyPressed: keyPressed});
            }
        }
    }
    _keyUp(e) {
        this.setState({keyPressed: {key: ''}});
    }
    getKeys() {
        return this.keys.map(key => {
            let keyEvent = this.props[key.event];
            if (keyEvent) {
                return <div
                    className={`key ${key.key}`}
                    onClick={keyEvent.bind(this)}
                    key={key.key}
                ></div>;
            }
        });
    }
    blur() {
        this.focus();
    }
    focus() {
        this.htmlContainer.current.focus();
    }
    render() {
        return (
                <div className={
                        `${this.props.className} ${this.state.keyPressed.key}`
                    }
                    onKeyDown={this._keyDown.bind(this)}
                    onKeyUp={this._keyUp.bind(this)}
                    tabIndex={1}
                    onBlur={this.blur.bind(this)}
                    ref={this.htmlContainer}
                >
                    {this.getKeys()}
                </div>
        );
    }
}

UiKeyboard.defaultProps = {
    className: 'keyboard',
};

export default UiKeyboard;
