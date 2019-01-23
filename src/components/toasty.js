import React from 'react';
import {Sprite, withApp} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

import toasty from '../aassets/Toasty.png';

class Toasty2 extends React.Component {
  constructor(props) {
    super(props);
    this.centerAnchor = new PIXI.Point(0.5, 0.5);
    this.texture = PIXI.Texture.fromImage(toasty);
    this.getContext = this.getContext.bind(this);
    this.state = {
      rotation: 0,
    };
  }
  componentDidMount() {
    this.props.app.ticker.add(this.animate, this.getContext);
  }

 getContext(d) {
    this.setState({
      rotation: this.state.rotation + 0.1 * d,
    });
 }
 animate(delta) {
   this(delta);
 }

  render() {
    const {centerAnchor, props, texture, state} = this;
    const {rotation} = state;
    return <Sprite
      texture={texture}
      anchore={centerAnchor}
      rotation={rotation}
      {...props}
    />;
    /*eslint-disable*/
    // return this.sprite;
  }
}

export default withApp(Toasty2);
