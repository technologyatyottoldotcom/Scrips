

import React, { Component } from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import displayValuesFor from 'react-stockcharts/lib/tooltip/displayValuesFor';
import GenericChartComponent from "react-stockcharts/lib/GenericChartComponent";

import ToolTipText from "react-stockcharts/lib/tooltip/ToolTipText";
import ToolTipTSpanLabel from "react-stockcharts/lib/tooltip/ToolTipTSpanLabel";
import { isDefined, identity, noop, functor } from "react-stockcharts/lib/utils";

export class CompareStockTooltip extends Component {
	constructor(props) {
		super(props);

        this.state = {
            hideColor : '#636e72',
            removeColor : '#636e72'
        }
        
		this.renderSVG = this.renderSVG.bind(this);
	}

   

	renderSVG(moreProps) {

		const { onClick, fontFamily, fontSize, labelFill, valueFill, className } = this.props;
		let { xDisplayFormat, yDisplayFormat, xLabel, yLabel, xAccessor, yAccessor, hide } = this.props;
        let { toggleHide, removeStock } = this.props;

		const { displayValuesFor } = this.props;


		const { chartConfig: { width, height } } = moreProps;
		const currentItem = displayValuesFor(this.props, moreProps);

		const xDisplayValue = isDefined(currentItem) && isDefined(xAccessor(currentItem)) ? xDisplayFormat(xAccessor(currentItem)) : "n/a";
		const yDisplayValue = isDefined(currentItem) && isDefined(yAccessor(currentItem)) ? yDisplayFormat(yAccessor(currentItem)) : "n/a";

		const { origin: originProp } = this.props;
		const origin = functor(originProp);
		const [x, y] = origin(width, height);


		if(hide)
        {
            return (
                <g className={className} transform={`translate(${ x }, ${ y })`} onClick={onClick}>
                    <svg width="240" height="22">
                        <rect width="240" height="22" fill='none' rx={3} style={{
                            stroke : '#cccccc'
                        }}/>
                    </svg>
                    <svg width="20" height="22" x={0} y={0}>
                        <rect width="10" height="22" fill='#b2bec3' />
                    </svg>
                    <ToolTipText x={15} y={15}
                        fontFamily={fontFamily} fontSize={fontSize} fontWeight="bold">
                        { xLabel ? <ToolTipTSpanLabel x={0} dy="5" fill='#b2bec3'>{`${xLabel} : `}</ToolTipTSpanLabel> : null}
                        { xLabel ? <tspan fill='#b2bec3'>{`${xDisplayValue} `}</tspan> : null}
                        <ToolTipTSpanLabel fill='#b2bec3'>{`${yLabel} : `}</ToolTipTSpanLabel>
                        <tspan fill='#b2bec3' >{yDisplayValue}</tspan>
                    </ToolTipText>
                    <g onClick={e => toggleHide(e,yLabel)}>
                        <svg className="compare-icon-back" style={{background : '#ff0000'}} x={185} y={2} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill='#b2bec3' >
                            <rect width="26" height="26" fill="#ffffff"></rect>
                            <path id="icon/action/visibility_off_24px" fillRule="evenodd" clipRule="evenodd" d="M4.69 6.52505L2.01 3.84505L3.42 2.42505L21.15 20.165L19.74 21.575L16.32 18.155C14.98 18.685 13.52 18.975 12 18.975C7 18.975 2.73 15.865 1 11.475C1.77 9.50505 3.06 7.80505 4.69 6.52505ZM12 5.97505C15.79 5.97505 19.17 8.10505 20.82 11.475C20.23 12.695 19.4 13.745 18.41 14.595L19.82 16.005C21.21 14.775 22.31 13.235 23 11.475C21.27 7.08505 17 3.97505 12 3.97505C10.73 3.97505 9.51 4.17505 8.36 4.54505L10.01 6.19505C10.66 6.06505 11.32 5.97505 12 5.97505ZM10.93 7.11505L13 9.18505C13.57 9.43505 14.03 9.89505 14.28 10.465L16.35 12.535C16.43 12.195 16.49 11.835 16.49 11.465C16.5 8.98505 14.48 6.97505 12 6.97505C11.63 6.97505 11.28 7.02505 10.93 7.11505ZM9.51 11.345L12.12 13.955C12.08 13.965 12.04 13.975 12 13.975C10.62 13.975 9.5 12.855 9.5 11.475C9.5 11.4501 9.5025 11.4301 9.505 11.4101L9.505 11.41L9.505 11.41C9.5075 11.39 9.51 11.37 9.51 11.345ZM7.86 9.69505L6.11 7.94505C4.9 8.86505 3.88 10.045 3.18 11.475C4.83 14.845 8.21 16.975 12 16.975C12.95 16.975 13.87 16.835 14.75 16.595L13.77 15.615C13.23 15.845 12.63 15.975 12 15.975C9.52 15.975 7.5 13.955 7.5 11.475C7.5 10.845 7.63 10.245 7.86 9.69505Z"/>
                        </svg>
                    </g>
                    <g onClick={e => removeStock(e,yLabel)}>
                        <svg className="compare-icon-back" x={210} y={2} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill='#b2bec3'>
                            <rect width="26" height="26" fill="#ffffff"></rect>
                            <path fillRule="evenodd" clipRule="evenodd" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                        </svg>
                    </g>
                    
                    
                </g>
            );
        }
        else
        {
            return (
                <g className={className} transform={`translate(${ x }, ${ y })`} onClick={onClick}>
                    <svg width="240" height="22">
                        <rect width="240" height="22" fill='none' rx={3} style={{
                            stroke : '#cccccc'
                        }}/>
                    </svg>
                    <svg width="20" height="22" x={0} y={0}>
                        <rect width="10" height="22" fill={labelFill} />
                    </svg>
                    <ToolTipText x={15} y={15}
                        fontFamily={fontFamily} fontSize={fontSize} fontWeight="bold">
                        { xLabel ? <ToolTipTSpanLabel x={0} dy="5" fill={labelFill}>{`${xLabel} : `}</ToolTipTSpanLabel> : null}
                        { xLabel ? <tspan fill={valueFill}>{`${xDisplayValue} `}</tspan> : null}
                        <ToolTipTSpanLabel fill={labelFill}>{`${yLabel} : `}</ToolTipTSpanLabel>
                        <tspan fill={valueFill} >{yDisplayValue}</tspan>
                    </ToolTipText>
                    <g onClick={e => toggleHide(e,yLabel)}>
                        <svg className="compare-icon-back" style={{background : '#ff0000'}} x={185} y={2} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={this.state.hideColor} onMouseOver={()=>{this.setState({hideColor : labelFill})}} onMouseLeave={()=>{this.setState({hideColor : '#636e72'})}}>
                            <rect width="26" height="26" fill="#ffffff"></rect>
                            <path fillRule="evenodd" clipRule="evenodd" d="M1 12C2.73 7.61 7 4.5 12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12ZM20.82 12C19.17 8.63 15.79 6.5 12 6.5C8.21 6.5 4.83 8.63 3.18 12C4.83 15.37 8.21 17.5 12 17.5C15.79 17.5 19.17 15.37 20.82 12ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM7.5 12C7.5 9.52 9.52 7.5 12 7.5C14.48 7.5 16.5 9.52 16.5 12C16.5 14.48 14.48 16.5 12 16.5C9.52 16.5 7.5 14.48 7.5 12Z"/>
                        </svg>
                    </g>
                    <g onClick={e => removeStock(e,yLabel)}>
                        <svg className="compare-icon-back" x={210} y={2} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={this.state.removeColor} onMouseOver={()=>{this.setState({removeColor : labelFill})}} onMouseLeave={()=>{this.setState({removeColor : '#636e72'})}}>
                            <rect width="26" height="26" fill="#ffffff"></rect>
                            <path fillRule="evenodd" clipRule="evenodd" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                        </svg>
                    </g>
                    
                    
                </g>
            );
        }
	}
	render() {
		return <GenericChartComponent
			clip={true}
			svgDraw={this.renderSVG}
			drawOn={["mousemove"]}
		/>;
	}
}

CompareStockTooltip.propTypes = {
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
    hide : PropTypes.bool,
    toggleHide : PropTypes.func,
    removeStock : PropTypes.func
};

CompareStockTooltip.defaultProps = {
	origin: [0, 0],
	labelFill: "#4682B4",
	valueFill: "#000000",
	yDisplayFormat: format(".2f"),
	displayValuesFor: displayValuesFor,
	xAccessor: noop,
	yAccessor: identity,
	className: "react-stockcharts-tooltip",
    hide : false,
    toggleHide : noop,
    removeStock : noop
};

export default CompareStockTooltip;
