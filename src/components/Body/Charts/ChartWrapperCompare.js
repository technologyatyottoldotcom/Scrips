import React from 'react';
import { format } from 'd3-format';
import {XAxis,YAxis} from 'react-stockcharts/lib/axes';
import { curveMonotoneX, curveCardinal } from "d3-shape";
import LastPointIndicator from '../CustomChartComponents/LastPointEdgeIndicator/LastPointIndicator';
import {LineSeries,AreaSeries,BarSeries,CandlestickSeries,ScatterSeries ,OHLCSeries,KagiSeries,RenkoSeries,PointAndFigureSeries, SquareMarker,CircleMarker , BollingerSeries , MACDSeries , RSISeries ,StochasticSeries ,StraightLine ,ElderRaySeries , SARSeries , VolumeProfileSeries} from 'react-stockcharts/lib/series';
import { CrossHairCursor,MouseCoordinateX, MouseCoordinateY ,PriceCoordinate, EdgeIndicator } from "react-stockcharts/lib/coordinates";
import {StockMarker} from '../CustomChartComponents/StockMarker/StockMarker';
import { getCompareXAxisProps , getCompareYAxisProps } from '../../../exports/ChartProps';
import ChartCompareStock from './ChartCompareStock';

export class ChartWrapperCompare extends React.PureComponent {


    

    render() {

        console.log('---CHART WRAPPER---');
        const CompareStockConfig = this.props.CompareStockConfig;

        console.log(CompareStockConfig);

        return (
            <>
                <YAxis {...getCompareYAxisProps()}/>
                <XAxis {...getCompareXAxisProps()} />
                <LineSeries yAccessor={d =>d.compare.open} strokeWidth={2} stroke="#00a0e3" interpolation={curveMonotoneX}/>
                <EdgeIndicator 
                    orient="right"
                    edgeAt="right"
                    itemType="last"
                    yAccessor={d => d.compare.open}
                    displayFormat={format(".2%")}
                    arrowWidth={0}
                    fill='#00a0e3'
                    fontSize={11}
                    rectHeight={18}
                    strokeWidth={1}
                    lineOpacity={0}
                />
                <StockMarker 
                    edgeAt="right"
                    orient="left"
                    itemType="last"
                    yAccessor={d => d.compare.open}
                    displayFormat={format(".2%")}
                    arrowWidth={0}
                    fill='#00a0e3'
                    fontSize={11}
                    rectHeight={18}
                    rectWidth={'RELIANCE'.length * 11}
                    strokeWidth={1}
                    lineOpacity={0}
                    labelText='RELIANCE'
                />
                <LastPointIndicator yAccessor={d => d.compare.open} displayFormat={format(".2%")} fill="#00a0e3" radius={5}/>
                <MouseCoordinateY 
                    at="right" 
                    orient="right" 
                    displayFormat={format(".2%")}
                    arrowWidth={0}
                    strokeWidt={2}
                />

                {CompareStockConfig.map((config,indx)=>{
                    return <ChartCompareStock 
                                initialIndex={this.props.initialIndex} 
                                key={indx} 
                                indx={indx} 
                                config={config} 
                                getCompareAccessor={this.getCompareAccessor}
                                toggleHide={this.props.toggleHide}
                                removeStock={this.props.removeStock}
                            />
                })}

                <CrossHairCursor />
                
                
            </>
        )
    }
}

export default ChartWrapperCompare;
