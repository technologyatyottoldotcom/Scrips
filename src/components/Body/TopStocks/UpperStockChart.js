import React from 'react';
import PropTypes from 'prop-types';
import {ChartCanvas,Chart} from 'react-stockcharts';
import { curveCardinal } from "d3-shape";
import {AreaSeries,LineSeries,StraightLine} from 'react-stockcharts/lib/series';
import {XAxis,YAxis} from 'react-stockcharts/lib/axes';
import { format } from 'd3-format';
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import LastPointIndicator from '../CustomChartComponents/LastPointEdgeIndicator/LastPointIndicator';
import {fitWidth} from 'react-stockcharts/lib/helper';
import { last } from "react-stockcharts/lib/utils";


export class UpperStockChart extends React.PureComponent {

    render() {

        // console.log(this.props.data);

        const { data : initialData, type, width, height , ratio } = this.props;


        let dataVal;
        let xAccessorVal;
        let xScaleVal;
        let displayxAccessorVal;
        let start,end;
        let openPrice;



        const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
            const {
                data,
                xScale,
                xAccessor,
                displayXAccessor,
            } = xScaleProvider(initialData);
        
        dataVal = data;
        xAccessorVal = xAccessor;
        xScaleVal = xScale;
        displayxAccessorVal = displayXAccessor;

        const xExtents = [
			xAccessor(last(data)),
			xAccessor(data[0])
		];


        if(this.props.openPrice && this.props.openPrice !== 'NaN')
        {
            openPrice = parseFloat(this.props.openPrice)
        }
        else
        {
            openPrice = 0;
        }

        // console.log(this.props.openPrice,typeof this.props.openPrice);

        // console.log(openPrice);

        return (
            <ChartCanvas 
                ratio={ratio} 
                width={width} 
                height={height}
				margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
				seriesName="MSFT"
				data={dataVal} 
                type={type}
				xAccessor={xAccessorVal}
                displayXAccessor={displayxAccessorVal}
				xScale={xScaleVal}
				xExtents={xExtents}
                disableInteraction={true}
                useCrossHairStyleCursor={false}
			>
				<Chart 
                    padding={10}
                    id={0} 
                    yExtents={d=> d.open}
                >
                    
					<LineSeries 
                        yAccessor={d => d.open} 
                        strokeWidth={1} 
                        stroke={this.props.status === 'positive' ? "#19E683" : "#e51a4b"} 
                        interpolation={curveCardinal}
                    />
                    {/* <LastPointIndicator yAccessor={d => d.open} displayFormat={format(".4s")} radius={3} fill={this.props.status === 'positive' ? "#00b894" : "#e51a4b"}/> */}
                    <StraightLine strokeDasharray="ShortDash" strokeWidth={1} stroke={this.props.status === 'positive' ? "#19E683" : "#e51a4b"} opacity={1} yValue={openPrice}/>

                </Chart>
			</ChartCanvas>
        )
    }
}

UpperStockChart.propTypes = {
    data : PropTypes.array.isRequired,
    width : PropTypes.number.isRequired,
    ratio : PropTypes.number.isRequired,
    type : PropTypes.oneOf(['svg','hybrid']).isRequired
};

UpperStockChart.defaultProps ={
    type : 'svg'
}

UpperStockChart = fitWidth(UpperStockChart);

export default UpperStockChart;
