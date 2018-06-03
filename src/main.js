import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Toasty from './components/misc/toasty';
import UiKeyboard from './components/UI/ui_keyboard/ui_keyboard';
import UiWatcher from './components/UI/ui_watcher';
import LetterGame from './components/letter_game';

import './styles/styles.less';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastDirectionKey: '',
            width: window.innerWidth,
            height: window.innerHeight,
            level: 1,
            hits: 0,
            miss: 0,
        };
        this.keyboard = React.createRef();
        this.letterGame = React.createRef();
    }
    // constructor
    componentDidMount() {
       this.keyboard.current.focus();

       setInterval(()=>{
           this.levelUp();
       }, 30000);
    }
    levelUp() {
        this.setState({level: this.state.level+1});
    }
    _handleKey(key) {
        this.setState({letterPressed: key});
        this.letterGame.current.keyPress(key);
    }
    _handleHit() {
        this.setState({hits: this.state.hits+1});
    }
    _handleMiss() {
        this.setState({miss: this.state.miss+1});

        document.body.classList.add('miss');
        setTimeout(() => {
            document.body.classList.remove('miss');
        }, 100);
    }
    render() {
        return (
            <React.Fragment>
                <LetterGame
                    width={this.state.width}
                    height={this.state.height}
                    ref={this.letterGame}
                    level={this.state.level}
                    onHit={this._handleHit.bind(this)}
                    onMiss={this._handleMiss.bind(this)}
                />
                <Toasty
                    ref={a => this.toasty = a}
                />
                <div className="hud">
                    <UiWatcher label={'window width:'}
                    value={window.innerWidth} />
                    <UiWatcher label={'level:'}
                    value={this.state.level} />
                    <UiWatcher label={'Hits:'}
                    value={this.state.hits} />
                    <UiWatcher label={'Miss:'}
                    value={this.state.miss} />
                </div>
                <UiKeyboard
                    ref={this.keyboard}
                    onaKey={this._handleKey.bind(this, 'a')}
                    onbKey={this._handleKey.bind(this, 'b')}
                    oncKey={this._handleKey.bind(this, 'c')}
                    ondKey={this._handleKey.bind(this, 'd')}
                    oneKey={this._handleKey.bind(this, 'e')}
                    onfKey={this._handleKey.bind(this, 'f')}
                    ongKey={this._handleKey.bind(this, 'g')}
                    onhKey={this._handleKey.bind(this, 'h')}
                    oniKey={this._handleKey.bind(this, 'i')}
                    onjKey={this._handleKey.bind(this, 'j')}
                    onkKey={this._handleKey.bind(this, 'k')}
                    onlKey={this._handleKey.bind(this, 'l')}
                    onmKey={this._handleKey.bind(this, 'm')}
                    onnKey={this._handleKey.bind(this, 'n')}
                    onoKey={this._handleKey.bind(this, 'o')}
                    onpKey={this._handleKey.bind(this, 'p')}
                    onqKey={this._handleKey.bind(this, 'q')}
                    onrKey={this._handleKey.bind(this, 'r')}
                    onsKey={this._handleKey.bind(this, 's')}
                    ontKey={this._handleKey.bind(this, 't')}
                    onuKey={this._handleKey.bind(this, 'u')}
                    onvKey={this._handleKey.bind(this, 'v')}
                    onwKey={this._handleKey.bind(this, 'w')}
                    onxKey={this._handleKey.bind(this, 'x')}
                    onyKey={this._handleKey.bind(this, 'y')}
                    onzKey={this._handleKey.bind(this, 'z')}
                    onspaceKey={this.showToasty.bind(this)}
                    onupKey={this.addLetter.bind(this)}
                    on1Key={this.addLetter.bind(this, 100)}
                    on2Key={this.addLetter.bind(this, 200)}
                    on3Key={this.addLetter.bind(this, 300)}
                    on4Key={this.addLetter.bind(this, 400)}
                    on5Key={this.addLetter.bind(this, 500)}
                    on6Key={this.addLetter.bind(this, 600)}
                    on7Key={this.addLetter.bind(this, 700)}
                    on8Key={this.addLetter.bind(this, 800)}
                    on9Key={this.addLetter.bind(this, 900)}
                    on10Key={this.addLetter.bind(this, 1000)}
                />
            </React.Fragment>
        );
    }
    addLetter() {
        this.setState({maxLetters: this.state.maxLetters+1});
        this.letterGame.current.addLetter();
    }
    showToasty() {
        this.toasty.show();
    }
}

Main.defaultProps = {
    maxLetters: 30,
    level: 1,
};

ReactDOM.render(
    <Main />,
    document.getElementById('app1')
);
