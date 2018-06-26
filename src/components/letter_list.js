import React, {Component} from 'react';
import Letter from './letter';

class LetterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            letters: [],
            letterCount: 0,
            maxLetters: this.props.level*20,
            delay: 5-this.props.level,
            speed: this.props.level,
        };
        this.list = [];
    }
    componentDidMount() {
        Array.from(new Array(this.state.maxLetters)).forEach((x, i) => {
            this.addLetter();
        });
    }
    destroyAll() {
      this.list.filter(letter => letter.current.isActive())
        .forEach(letter => letter.current.destroy());
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    keyPress(key) {
        let letters = this.list.filter(letter => {
          return letter.current.getCharacter(false)===key
                 && letter.current.isActive();
        });
        letters.forEach(letter => {
            letter.current.destroy();
            this.props.onHit(letter);
        });
        letters.length<=0?this.props.onMiss(key):(void(0));
    }
    addLetter() {
        this.setState(prevState => ({
            letterCount: prevState.letterCount+1,
            letters: prevState.letters.concat(
                [this.getLetter(prevState.letterCount)]
            ),
        }));
    }
    getLetter(key) {
        // let char = this.getCharacter();
        this.list[key] = React.createRef();
        return <Letter
            maxX={this.props.width}
            key={key}
            refIndex={key}
            charList={this.props.charList}
            // character={char}
            level={this.props.level}
            ref={this.list[key]}
            onComplete={this.props.onMiss.bind(this)}
        />;
    }
    render() {
        return (
            <React.Fragment>
                {this.state.letters}
            </React.Fragment>
        );
    }
}

LetterList.defaultProps = {
    className: 'letter',
    parentWidth: 0,
    parentHeight: 0,
    width: 0,
};

export default LetterList;
