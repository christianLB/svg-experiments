import React, {Component} from 'react';
import LetterList from './letter_list';
import './letter_game.less';

class LetterGame extends Component {
    constructor(props) {
        super(props);
        this.charList = Array.from('abcdefghijklmnopqrstuvwxyz');
        this.letterList = React.createRef();
    }
    addLetter() {
        this.letterList.current.addLetter();
    }
    keyPress(key) {
        this.letterList.current.keyPress(key);
    }
    _handleHit(e) {
        this.props.onHit(e);
    }
    _handleMiss(e) {
        this.props.onMiss(e);
    }
    render() {
        return (
            <React.Fragment>
                <LetterList
                    charList={this.charList}
                    width={this.props.width}
                    ref={this.letterList}
                    level={this.props.level}
                    onHit={this._handleHit.bind(this)}
                    onMiss={this._handleMiss.bind(this)}
                />
            </React.Fragment>
        );
    }
}

LetterGame.defaultProps = {
    maxLetters: 0,
    width: 0,
    height: 0,
    letterPressed: '',
    level: 1,
};

export default LetterGame;