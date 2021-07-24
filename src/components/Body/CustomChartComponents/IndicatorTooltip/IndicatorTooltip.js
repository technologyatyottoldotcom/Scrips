

import React, { Component } from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import displayValuesFor from 'react-stockcharts/lib/tooltip/displayValuesFor';
import GenericChartComponent from "react-stockcharts/lib/GenericChartComponent";

import ToolTipText from "react-stockcharts/lib/tooltip/ToolTipText";
import ToolTipTSpanLabel from "react-stockcharts/lib/tooltip/ToolTipTSpanLabel";
import { isDefined, identity, noop, functor } from "react-stockcharts/lib/utils";

export class IndicatorTooltip extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
	}

   

	renderSVG(moreProps) {

		const { onClick, fontFamily, fontSize, labelFill, valueFill, className } = this.props;
		let { xDisplayFormat, yDisplayFormat, xLabel, yLabel, xAccessor, yAccessor } = this.props;

		const { displayValuesFor } = this.props;

		const { chartConfig: { width, height } } = moreProps;

        const currentItem = displayValuesFor(this.props, moreProps);

        // console.log(currentItem);

        const { indicatorConfig } = this.props;


		const { origin: originProp } = this.props;
		const origin = functor(originProp);
		const [x, y] = origin(width, height);

        // console.log(indicatorConfig);

		return (
            <g className={className} transform={`translate(${ x }, ${ y })`} onClick={onClick}>

                {indicatorConfig.map((indicator,indx)=>{

                    const {title,accessor,color} = indicator;

                    const yDisplayValue = isDefined(currentItem) && isDefined(accessor(currentItem)) ? yDisplayFormat(accessor(currentItem)) : "n/a";

                    return <ToolTipText x={10} y={5 * (3*indx+1)} fontFamily={fontFamily} fontSize={fontSize} fontWeight="normal">
                        <ToolTipTSpanLabel fill={color}>{`${title} : `}</ToolTipTSpanLabel>
                        <tspan fill={color} >{yDisplayValue}</tspan>
                    </ToolTipText>

                })}

                {/* <ToolTipText x={15} y={15} fontFamily={fontFamily} fontSize={fontSize} fontWeight="normal">
                        <ToolTipTSpanLabel fill={indicatorConfig[0]['color']}>{`${indicatorConfig[0]['title']} : `}</ToolTipTSpanLabel>
                        <tspan fill={indicatorConfig[0]['color']} >{yDisplayValue}</tspan>
                </ToolTipText> */}
            </g>
        )
	}


	render() {
		return <GenericChartComponent
			clip={true}
			svgDraw={this.renderSVG}
			drawOn={["mousemove"]}
		/>;
	}
}

IndicatorTooltip.propTypes = {
	xDisplayFormat: PropTypes.func,
	yDisplayFormat: PropTypes.func.isRequired,
	xLabel: PropTypes.string,
	yLabel: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func
	]).isRequired,
	labelFill: PropTypes.string.isRequired,
	valueFill: PropTypes.string,
	origin: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.func
	]).isRequired,
	className: PropTypes.string,
	fontFamily: PropTypes.string,
	fontSize : PropTypes.number,
	onClick: PropTypes.func,
	displayValuesFor: PropTypes.func,
	xAccessor: PropTypes.func,
	yAccessor: PropTypes.func,
    indicatorConfig : PropTypes.array
    
};

IndicatorTooltip.defaultProps = {
	origin: [0, 0],
	labelFill: "#4682B4",
	valueFill: "#000000",
	yDisplayFormat: format(".2f"),
	displayValuesFor: displayValuesFor,
	xAccessor: noop,
	yAccessor: identity,
	className: "react-stockcharts-indicator-tooltip",
    
};

export default IndicatorTooltip;
