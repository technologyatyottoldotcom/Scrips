

import React, { Component } from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import displayValuesFor from 'react-stockcharts/lib/tooltip/displayValuesFor';
import GenericChartComponent from "react-stockcharts/lib/GenericChartComponent";

import { isDefined, identity, noop, functor } from "react-stockcharts/lib/utils";

export class IndicatorOptions extends Component {
	constructor(props) {
		super(props);

        this.state = {
            upColor : '#95a5a6',
            downColor : '#95a5a6',
            closeColor : '#95a5a6'
        }
        
		this.renderSVG = this.renderSVG.bind(this);
	}

   

	renderSVG(moreProps) {

		const { onClick, className , showup , showdown , index } = this.props;
		const { chartConfig: { width, height } } = moreProps;

        const { indicator , DeleteIndicatorType , SwapCharts } = this.props;

		const { origin: originProp } = this.props;
		const origin = functor(originProp);
		const [x, y] = origin(width, height);

        let sux = showdown ? 0 : 35;
        let srx = showdown && showup ? 0 : 35;

        let wd = showup && showdown ? 95 : 60;


        return (
            <g className={className} transform={`translate(${ x }, ${ y })`} onClick={onClick} >
                <g>
                    <svg x={srx} y={0} width={wd} height={25} fill='none'>
                        <rect width={wd} height={25}></rect>
                    </svg>
                </g>
                {showup && 
                    <>
                        <g onClick={e => SwapCharts('up',index)}>
                            <svg x={sux} y={0} width={30} height={30} fill={this.state.upColor} onMouseOver={()=>{this.setState({upColor : '#404040'})}} onMouseLeave={()=>{this.setState({upColor : '#95a5a6'})}}>
                                <rect y="0.0222168" width="25" height="25" rx="3" fill="#F0F0F0"/>
                                <path d="M12.8031 6.02498C13.3692 6.02346 13.8269 6.48112 13.8254 7.04721L13.7944 18.5168C13.7929 19.0828 13.3327 19.543 12.7666 19.5445V19.5445C12.2005 19.5461 11.7429 19.0884 11.7444 18.5223L11.7754 7.05275C11.7769 6.48666 12.237 6.02651 12.8031 6.02498V6.02498Z" />
                                <rect width="6.68231" height="2.05" rx="1.025" transform="matrix(-0.707107 0.707107 -0.710915 -0.703278 13.9253 7.0979)" />
                                <rect width="6.68231" height="2.05" rx="1.025" transform="matrix(-0.707107 -0.707107 0.703278 -0.710915 16.4678 11.8386)" />
                            </svg>
                        </g>
                    </>
                }
                {showdown && 
                    <>
                        <g onClick={e => SwapCharts('down',index)}>
                            <svg x={35} y={0} width={30} height={30} fill={this.state.downColor} onMouseOver={()=>{this.setState({downColor : '#404040'})}} onMouseLeave={()=>{this.setState({downColor : '#95a5a6'})}}>
                                <rect width="25" height="25" rx="3" fill="#F0F0F0"/>
                                <path d="M12.7662 19.5221C12.2001 19.5237 11.7424 19.066 11.744 18.4999L11.7749 7.03036C11.7765 6.46427 12.2366 6.00412 12.8027 6.0026V6.0026C13.3688 6.00107 13.8265 6.45874 13.8249 7.02483L13.794 18.4944C13.7924 19.0605 13.3323 19.5206 12.7662 19.5221V19.5221Z" />
                                <rect width="6.68231" height="2.05" rx="1.025" transform="matrix(0.707107 -0.707107 0.710915 0.703278 11.644 18.4492)" />
                                <rect width="6.68231" height="2.05" rx="1.025" transform="matrix(0.707107 0.707107 -0.703278 0.710915 9.10156 13.7085)" />
                            </svg>
                        </g>
                    </>
                }
                <g onClick={e => DeleteIndicatorType(indicator)}>
                    <svg x={70} y={0} width={30} height={30} fill={this.state.closeColor} onMouseOver={()=>{this.setState({closeColor : '#404040'})}} onMouseLeave={()=>{this.setState({closeColor : '#95a5a6'})}}>
                        <rect width="25" height="25" rx="3" fill="#F0F0F0"/>
                        <rect width="17.285" height="2.05" rx="1.025" transform="matrix(0.705195 0.709013 -0.705195 0.709013 7.4458 5)" />
                        <rect width="17.285" height="2.05" rx="1.025" transform="matrix(0.705195 -0.709013 0.705195 0.709013 6 17.2554)" />
                    </svg>
                </g>
            </g>
        );

	}
	render() {
		return <GenericChartComponent
			clip={true}
			svgDraw={this.renderSVG}
			drawOn={["mousemove"]}
		/>;
	}
}

IndicatorOptions.propTypes = {
	
	origin: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.func
	]).isRequired,
    index : PropTypes.number,
    showup : PropTypes.bool,
    showdown : PropTypes.bool,
    indicator : PropTypes.string,
	className: PropTypes.string,
    DeleteIndicatorType : PropTypes.func,
    SwapCharts : PropTypes.func,
	onClick: PropTypes.func,
};

IndicatorOptions.defaultProps = {
	origin: [0, 0],
    showup : true,
    showdown : true,
    DeleteIndicatorType : noop,
    SwapCharts : noop,
	className: "react-stockcharts-indicator-options",
};

export default IndicatorOptions;
