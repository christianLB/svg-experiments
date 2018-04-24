import React from 'react';
import AxisTick from './axis_tick';

class Axis extends React.Component {
    getVerticalMargin() {
        return this.props.height - this.props.margin;
    }
    getPoints() {
        if (this.props.horizontal) {
            let y12 = this.getVerticalMargin();
            return {
                x1: this.props.width,
                x2: 0,
                y2: y12,
                y1: y12,
            };
        } else {
            return {
                x1: this.props.margin,
                x2: this.props.margin,
                y1: this.props.height,
                y2: 0,
            };
        }
    }

    getAxisTicks() {
        let ticks = Array.from(new Array(this.props.ticks), (x, i) => {
            let startPoint;
            let margin;

            if (this.props.horizontal) {
                startPoint = (((this.props.width
                             - this.props.intersection)
                             / this.props.ticks) * i)
                             + this.props.intersection;
                margin = this.getVerticalMargin();
            } else {
                let tickgap = (this.props.height
                            - this.props.intersection)
                            / this.props.ticks;
                startPoint = (this.props.height
                           - tickgap * i)
                           - this.props.intersection;
                margin = this.props.margin;
            }

            return <AxisTick
                        horizontal={!this.props.horizontal}
                        startPoint={startPoint}
                        margin={margin}
                        key={i}
                        value={i}
                        style={this.props.style}
                    />;
        });
        ticks[0] = '';// we don't want the first one (0), so remove it.
        return ticks;
    }

    render() {
        let points = this.getPoints();
        let ticks = this.getAxisTicks();
        return (
            <g>
                <line {...points} style={this.props.style}/>
                {ticks}
            </g>
        );
    }
}

Axis.defaultProps = {
    length: 0,
    ticks: 20,
    horizontal: true,
    margin: 0,
    intersection: 0,
    style: {
        stroke: 'rgb(49,49,49)',
        strokeWidth: '1',
    },
};

export default Axis;
