import React from 'react';
import { format } from 'd3-format';
import {XAxis,YAxis} from 'react-stockcharts/lib/axes';
import { curveMonotoneX, curveCardinal } from "d3-shape";
import LabelEdgeCoordinate from '../CustomChartComponents/EdgeLabel/LabelEdgeCoordinate';
import { pointAndFigure ,kagi,renko , compare} from "react-stockcharts/lib/indicator";
import LastPointIndicator from '../CustomChartComponents/LastPointEdgeIndicator/LastPointIndicator';
import PriceMarkerCoordinate from '../CustomChartComponents/PriceMarker/PriceMarkerCoordinate';
import { HoverTooltip } from "../CustomChartComponents/HoverTooltip/HoverTooltip";
import { tooltipContent } from '../../../exports/ChartProps';
import {LineSeries,AreaSeries,BarSeries,CandlestickSeries,ScatterSeries ,OHLCSeries,KagiSeries,RenkoSeries,PointAndFigureSeries, SquareMarker,CircleMarker , BollingerSeries , MACDSeries , RSISeries ,StochasticSeries ,StraightLine ,ElderRaySeries , SARSeries , VolumeProfileSeries} from 'react-stockcharts/lib/series';
import { getXCoordinateProps, getYCoordinateProps, getXAxisProps, getYAxisProps } from '../../../exports/ChartProps';
import { CrossHairCursor,MouseCoordinateX, MouseCoordinateY ,PriceCoordinate, EdgeIndicator } from "react-stockcharts/lib/coordinates";

export class ChartWrapperZoom extends React.PureComponent {

    getChartType(chartType,chartdata)
    {

        let calculatedData,chartSeries;
        if(chartType === 'line'){
            calculatedData = chartdata;
            chartSeries = <>
                            <LineSeries yAccessor ={d =>d.open} strokeWidth={2} stroke="#00a0e3" interpolation={curveCardinal}/>
                            <LastPointIndicator yAccessor={d => d.open} displayFormat={format(".4s")} radius={4} fill='#00a0e3'/>
                          </>;
            
        }
        else if(chartType === 'rangeArea')
        {
            calculatedData = chartdata;
            chartSeries = <LineSeries yAccessor ={d =>d.open} strokeWidth ={30} stroke="#64b5f6"/>
        }
        else if(chartType === 'jumpLine')
        {
            calculatedData = chartdata;
            chartSeries = <ScatterSeries yAccessor ={d =>d.open} marker={SquareMarker} markerProps={{ width : 8 , height : 1 , fill : '#00A0E3' , stroke : '#00A0E3' , strokeWidth : 1}}/>
        }
        else if(chartType === 'column')
        {
           
            calculatedData = chartdata;
            chartSeries = <BarSeries yAccessor ={d =>d.open} width={5} stroke={false} fill='#00a0e3'/>
        }
        else if(chartType === 'stick')
        {
            calculatedData = chartdata;
            chartSeries = <BarSeries yAccessor ={d =>d.open} width={1} stroke={true} fill='#00a0e3'/>
        }
        else if(chartType === 'candlestick')
        {
            calculatedData = chartdata;
            chartSeries = <CandlestickSeries stroke='#ffffff' fill={d => d.close>d.open ? '#00A0E3' : '#EF6C00'} wickStroke={d => d.close>d.open ? '#00A0E3' : '#EF6C00'} opacity = '1'/>
        }
        else if(chartType === 'marker')
        {
            calculatedData = chartdata;
            chartSeries = <ScatterSeries yAccessor ={d =>d.open} marker={CircleMarker} markerProps={{r : 4 , fill : '#00A0E3' , stroke : '#00A0E3' , strokeWidth : 0.1}}/>
        }
        else if(chartType === 'ohlc')
        {
            calculatedData = chartdata;
            chartSeries = <OHLCSeries stroke={d => d.close>d.open ? '#00A0E3' : '#EF6C00'} clip={true}/>
        }
        else if(chartType === 'kagi')
        {

            const kagiCal = kagi();
            calculatedData = kagiCal(chartdata);
            chartSeries = <KagiSeries  strokeWidth={1} stroke={{yang : '#00A0E3' , yin : '#EF6C00'}}/>
        }
        else if(chartType === 'renko')
        {

            const renkoCal = renko();
            calculatedData = renkoCal(chartdata);
            chartSeries = <RenkoSeries yAccessor= {d => ({ open: d.open, high: d.high, low: d.low, close: d.close })}  stroke={{up : '#000000' , down : '#000000'}} fill={{up : '#00A0E3' , down : '#EF6C00' , partial : '#000000'}} clip={true}/>
        }
        else if(chartType === 'point')
        {

            const pointCal = pointAndFigure();
            calculatedData = pointCal(chartdata);
            chartSeries = <PointAndFigureSeries fill={{up : '#EF6C00' , down : '#81ecec'}} stroke= {{ up: "#EF6C00", down: "#00A0E3" }}/>
        }
        else{
            calculatedData = chartdata;
            chartSeries = <AreaSeries yAccessor ={d =>d.open} strokeWidth ={2} stroke="#64b5f6" fill='#00a0e3'/>
        }

        return [calculatedData,chartSeries];
    }

    render() {

        let chartSeries = this.getChartType(this.props.chartType);

        return (
            <>
                {chartSeries}
                <XAxis {...getXAxisProps()} />
                <YAxis {...getYAxisProps()} />
                <MouseCoordinateX {...getXCoordinateProps(this.props.range)}/>
                <MouseCoordinateY {...getYCoordinateProps()}/>
                <LabelEdgeCoordinate 
                    at="right"
                    orient="left"
                    price={this.props.lastPoint.open}
                    displayFormat={format('.2f')}
                    labelText={this.props.stockDetails.stockNSECode}
                    fill="#00a0e3"
                    rectHeight={18}
                    rectWidth={this.props.stockDetails.stockNSECode.length * 11}
                    dx={1}
                    fontSize={11}
                    strokeDasharray="ShortDot"
                    lineStroke="#00a0e3"
                    lineOpacity={0.5}
                    textFill="#ffffff"
                />
                <PriceCoordinate 
                    at="right"
                    orient="right"
                    price={this.props.lastPoint.open}
                    displayFormat={format('.2f')}
                    fill="#00a0e3"
                    rectHeight={18}
                    fontSize={11}
                    hideLine={true}
                    lineOpacity={0}
                />
                <EdgeIndicator 
                    orient="right"
                    edgeAt="right"
                    itemType="last"
                    yAccessor={d =>d.open}
                    displayFormat={format(".2f")}
                    arrowWidth={0}
                    fill="#00a0e3"
                    fontSize={11}
                    rectHeight={18}
                    strokeWidth={1}
                    lineOpacity={0}
                />
                <PriceMarkerCoordinate 
                    at="left"
                    orient="right"
                    price={this.props.closePrice}
                    displayFormat={format('.2f')}
                    strokeDasharray="ShortDot"
                    dx={20} 
                    fill="#4E4E4E"
                    rectWidth={55}
                    rectHeight={20} 
                    fontSize={10}  
                />
                <HoverTooltip
                    tooltipContent={tooltipContent(this.props.range)}
                    fontSize={12}
                    bgOpacity={0}
                    fill='#ffffff'
                    opacity={1}
                    stroke='none'
                    isLabled={false}
                />
                <CrossHairCursor />
            </>
        )
    }
}

export default ChartWrapperZoom;
