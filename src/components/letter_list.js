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
        Array.from(new Array(this.state.maxLetters)).map((x, i) => {
            this.addLetter();
        });
        // this.setState({letters: this.list});
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    getCharacter() {
        // eslint-disable-next-line object-curly-spacing
        const { charList } = this.props;
        return charList[this.getRandom(0, charList.length)];
    }
    keyPress(key) {
        let hit = false;
        this.state.letters.some((letter, i, arr) => {
            if (letter.props.character===key) {
                hit = true;
                this.list[letter.props.refIndex].current.destroy();
                this.props.onHit(letter);
            }
        });
        if (!hit) {
            this.props.onMiss(key);
        }
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
        let char = this.getCharacter();
        this.list[key] = React.createRef();
        return <Letter
            maxX={this.props.width}
            key={key}
            refIndex={key}
            character={char}
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
