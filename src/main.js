import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Toasty from './components/misc/toasty';
import UiKeyboard from './components/UI/ui_keyboard/ui_keyboard';
import UiWatcher from './components/UI/ui_watcher';
import LetterGame from './components/letter_game';
import Background from './components/background';
import {TweenMax} from 'gsap/all';


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
            presses: 0,
        };
        this.letterGame = React.createRef();
        this.background = React.createRef();
        this.gameContainer = React.createRef();
    }
    // constructor
    componentDidMount() {
       this.hits = document.querySelector('.hits');
       this.miss = document.querySelector('.miss');
    }
    _handleKey(key) {
        this.setState({presses: this.state.presses + 1});
        this.letterGame.current.keyPress(key);
    }
    _handleHit() {
        this.setState({hits: this.state.hits+1}, () => {
          if (this.state.hits%30==0) {
              this.addLetter();
          }
        });

        TweenMax.fromTo([this.hits], 0.1,
          {scale: 1,
           // border: '0px solid #6bc26b',
            backgroundColor: 'none',
            color: 'green',
          },
          {scale: 1.2,
           // border: '3px solid #6bc26b',
           backgroundColor: 'green',
           color: 'white',
           onComplete: () => {},
           yoyo: true,
           repeat: 1,
          }
        );
    }
    _handleMiss() {
        this.setState({miss: this.state.miss+1}, () => {
            this.background.current.blinkRed();
            TweenMax.fromTo([this.miss], 0.1,
                {scale: 1,
                  backgroundColor: 'none',
                  color: 'red',
                },
                {scale: 1.2,
                 color: 'white',
                 backgroundColor: 'red',
                 onComplete: () => {},
                 yoyo: true,
                 repeat: 1,
                }
            );
        }); // setState
    }
    render() {
        const {gameContainer} = this;
        return (
            <div name="game" ref={gameContainer}>
                <Toasty
                    ref={a => this.toasty = a}
                />
                <div className="hud">
                    <UiWatcher className="hits" label={''}
                    value={this.state.hits} />
                    <UiWatcher className="miss" label={''}
                    value={this.state.miss} />
                </div>
                <UiKeyboard
                    target={gameContainer}
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
                <LetterGame
                    width={this.state.width}
                    height={this.state.height}
                    ref={this.letterGame}
                    level={this.state.level}
                    onHit={this._handleHit.bind(this)}
                    onMiss={this._handleMiss.bind(this)}
                />
                <Background ref={this.background} />
            </div>
        );
    }
    addLetter() {
        this.setState({maxLetters: this.state.maxLetters+1});
        this.letterGame.current.addLetter();
    }
    showToasty() {
        this.toasty.show();
        this.letterGame.current.destroyAll();
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
