import React from 'react';

class AxisTick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: props.style,
            textStyle: props.textStyle,
        };
    }
    render() {
        let points = {};
        let coords = (this.props.horizontal)?
                     {drawAxis: 'x', incrementAxis: 'y'}:
                     {drawAxis: 'y', incrementAxis: 'x'};

        switch (this.props.orientation) {
            case 'outer':
                break;
            case 'middle':
                points[coords.second] =
                    points[coords.first] - this.props.length / 2;
                break;
            default:// inner
                    points[`${coords.drawAxis}1`]
                        = this.props.margin;
                    points[`${coords.drawAxis}2`]
                        = points[`${coords.drawAxis}1`]
                        + this.props.length
                        * (this.props.horizontal?1:-1);
                    points[`${coords.incrementAxis}1`]
                        = this.props.startPoint;
                    points[`${coords.incrementAxis}2`]
                        = points[`${coords.incrementAxis}1`];
                break;
        }
        return (
            <g name="tick">
                <line
                    {...points} style={this.props.style}/>
                <text
                    x={points.x2 + (this.props.horizontal?this.props.textgap:0)}
                    y={points.y2 + (this.props.horitontal?0
                        :-this.props.textgap)}
                    style={this.state.textStyle}
                    textAnchor={this.props.horizontal?'start':'middle'}
                >
                    {this.props.value}
                </text>
            </g>
        );
    }
}

AxisTick.defaultProps = {
    length: 10,
    orientation: 'inner', // [outer, middle]
    horizontal: true,
    startPoint: 0,
    value: 0,
    margin: 0,
    style: {
        // stroke: 'rgb(49,49,49)',
        // fill: 'none',
        // shapeRendering: 'crispEdges',
    },
    textStyle: {
        fontSize: '0.9em',
        color: 'rgb(49,49,49)',
    },
    textgap: 3,
};

export default AxisTick;
