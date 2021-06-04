import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "react-stockcharts/lib/GenericChartComponent";

import { first, last, isDefined } from "react-stockcharts/lib/utils";

import { getAxisCanvas } from "react-stockcharts/lib/GenericComponent";


let x1,x2;


class ChartInteraction extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
		this.getInteraction = this.getInteraction.bind(this);
	}
	
	renderSVG(moreProps) {

        return <g></g>;
        
	}

	getInteraction(moreProps)
	{
		const edge = helper(this.props, moreProps);
        // console.log(edge);
        // console.log(x1,x2);
        
        // if(isDefined(x2) && edge.edgeLast.x !== x2)
        // {
        //     this.props.setInteractionType('pan');
        //     // console.log('pan');
        // }
        // else if(isDefined(x1) && edge.edgeFirst.x !== x1)
        // {
        //     this.props.setInteractionType('zoom');
        //     // console.log('zoom');
        // }

        // x1 = edge.edgeFirst.x;
        // x2 = edge.edgeLast.x;

		this.props.setInteractionType(edge);

        return <g></g>;
	}


	render() {

        // console.log(object)
		return <GenericChartComponent
            edgeClip
			clip={false}
			// svgDraw={this.getInteraction}
			canvasToDraw={getAxisCanvas}
			drawOn={["pan"]}
			debug={this.getInteraction}
		/>;
	}
}

ChartInteraction.propTypes = {
	yAccessor: PropTypes.func,
	className: PropTypes.string,
	
};

ChartInteraction.defaultProps = {
	className: "react-stockcharts-lastPointIndicator",
};

function helper(props, moreProps) {
	const { yAccessor } = props;
	const { plotData } = moreProps;

	const itemFirst = first(plotData, yAccessor);
	const itemLast = last(plotData, yAccessor);

	// console.log(itemFirst,itemLast)

	// var currentItem = ChartDataUtil.getCurrentItemForChartNew(currentItems, forChart);
	const edgeFirst = isDefined(itemFirst)
		? getEdge(props, moreProps, itemFirst)
		: null;
    
    const edgeLast = isDefined(itemLast)
		? getEdge(props, moreProps, itemLast)
		: null;

	return {
		itemFirst,
		itemLast,
        edgeFirst,
        edgeLast
    };
}

function getEdge(props, moreProps, item) {

	const { yAccessor} = props;

	const { xScale, chartConfig: { yScale }, xAccessor } = moreProps;

	const yValue = yAccessor(item),
		xValue = xAccessor(item);


	const x = Math.round(xScale(xValue)),
		y = Math.round(yScale(yValue));

	return {
		x,
		y,
	};
}

export default ChartInteraction;
