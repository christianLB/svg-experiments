import React, {Component} from 'react';
import './main_menu.less';

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }
    render() {
        return (
            <React.Fragment>
                <div className={this.props.className}>
                  <div className='item'>LETTERS</div>
                  <div className='item'>WORDS</div>
                </div>
            </React.Fragment>
        );
    }
}

MainMenu.defaultProps = {
    className: 'mainmenu',
    maxLetters: 0,
    width: 0,
    height: 0,
    letterPressed: '',
    level: 1,
};

export default MainMenu;
