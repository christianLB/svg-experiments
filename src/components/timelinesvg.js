import React from 'react';
import Axis from './axis';
import ViewSpace from './view_space';
import circles from './data/circles';

class TimeLineSVG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circles: circles,
        };
    }

    render() {
        return (
            <svg
                className={this.props.className}
                xmlns="http://www.w3.org/2000/svg"
                width={this.props.width}
                height={this.props.height}
                viewBox={`0 0 ${this.props.width} ${this.props.height}`}
                aria-labelledby={this.props['aria-labelledby']}
            >
                <Axis
                    margin={this.props.marginx}
                    intersection={this.props.marginy}
                    ticks={this.props.ticks}
                    width={this.props.width}
                    height={this.props.height}
                />
                <Axis
                    margin={this.props.marginy}
                    intersection={this.props.marginx}
                    horizontal={false}
                    ticks={this.props.ticks}
                    height={this.props.height}
                    width={this.props.width}
                />
                <ViewSpace
                    x={this.props.height-this.props.marginx}
                    y={this.props.marginy}
                    width={this.props.width}
                    height={this.props.height}
                    circles={this.state.circles}
                />
            </svg>
        );
    }
}

TimeLineSVG.defaultProps = {
    width: 800,
    height: 400,
    className: 'timelinesvg',
    ariaLabelledby: 'title',
    axis: {
        x: {
            margin: 60,
        },
        y: {
            margin: 60,
        },
    },
};

export default TimeLineSVG;
