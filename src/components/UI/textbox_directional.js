import React from 'react';

class TextboxDirectional extends React.Component {
    componentDidMount() {
        this.inputElement.addEventListener(
            'on-up-key', this.props.onUpKey
        );
         this.inputElement.addEventListener(
            'on-down-key', this.props.onDownKey
        );
         this.inputElement.addEventListener(
            'on-left-key', this.props.onLeftKey
        );
         this.inputElement.addEventListener(
            'on-right-key', this.props.onRightKey
        );
    }

    componentWillUnmount() {
        this.inputElement.removeEventListener(
            'on-up-key', this.props.onUpKey
        );
        this.inputElement.removeEventListener(
            'on-down-key', this.props.onDownKey
        );
        this.inputElement.removeEventListener(
            'on-left-key', this.props.onLeftKey
        );
        this.inputElement.removeEventListener(
            'on-right-key', this.props.onRightKey
        );
    }

    handleKeyUp(e) {
        this.inputElement.style.backgroundColor='';
        if (this.props.deleteOnKeyUp) {
            this.inputElement.value='';
        }
    }

    handleFocus(e) {
        this.inputElement.style.borderColor='blue';
    }

    handleBlur(e) {
        this.inputElement.style.borderColor='inherit';
    }

    handleKeydown(e) {
        this.inputElement.style.backgroundColor=this.props.activeColor;
        switch (e.keyCode) {
            case 38:
                this.props.onUpKey(e);
                break;
            case 40:
                this.props.onDownKey(e);
                break;
            case 37:
                this.props.onLeftKey(e);
                break;
            case 39:
                this.props.onRightKey(e);
                break;
            default:
        }
    }

    render() {
        return (
            <div>
                {this.props.label}
                <input readOnly
                    ref={input => this.inputElement = input}
                    style={this.props.style}
                    onKeyDown={this.handleKeydown.bind(this)}
                    onKeyUp={this.handleKeyUp.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    value={this.props.value}
                />
            </div>
        );
    }
}

TextboxDirectional.defaultProps = {
    activeColor: 'green',
    style: {
        textAlign: 'center',
        fontSize: '1.2em',
        color: 'rgb(0,0,0)',
    },
    onRightKey: () => false,
    onUpKey: () => false,
    onLeftKey: () => false,
    onDownKey: () => false,
};

export default TextboxDirectional;
