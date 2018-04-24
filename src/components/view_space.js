import React from 'react';

class ViewSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circles: this.props.circles,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (!(prevState.x===nextProps.x) || !(prevState.y===nextProps.y)) {
            return {
                style: {
                    transform:
                    `translate(${nextProps.y}px,
                    ${nextProps.x}px)`,
                },
            };
        }

        return null;
    }
    translate() {
        this.setState({
            style: Object.assign(
                {},
                this.state.style,
                {transform: `translate(${this.props.marginx}px,
                    ${this.props.marginy}px)`}
            ),
        });
    }

    getCircles() {
        return this.props.circles.map((item, i) => {
            return <circle
                        cx={item.cx}
                        cy={-item.cy}
                        r={item.r}
                        key={i}
                    />;
        });
    }

    render() {
        return (
            <g
                style={this.state.style}
            >
                {this.getCircles()}
            </g>
        );
    }
}

ViewSpace.defaultProps = {
    width: 0,
    height: 0,
    ariaLabelledby: 'workspace',
};

export default ViewSpace;
