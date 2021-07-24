import React from 'react';
import { format } from 'd3-format';
import { curveMonotoneX, curveCardinal } from "d3-shape";
import { CompareStockTooltip } from '../CustomChartComponents/CompareStockToolip/CompareStockTooltip';
import LastPointIndicator from '../CustomChartComponents/LastPointEdgeIndicator/LastPointIndicator';
import {StockMarker} from '../CustomChartComponents/StockMarker/StockMarker';
import {LineSeries,AreaSeries,BarSeries,CandlestickSeries,ScatterSeries ,OHLCSeries,KagiSeries,RenkoSeries,PointAndFigureSeries, SquareMarker,CircleMarker , BollingerSeries , MACDSeries , RSISeries ,StochasticSeries ,StraightLine ,ElderRaySeries , SARSeries , VolumeProfileSeries} from 'react-stockcharts/lib/series';
import { CrossHairCursor,MouseCoordinateX, MouseCoordinateY ,PriceCoordinate, EdgeIndicator } from "react-stockcharts/lib/coordinates";

export class ChartCompareStock extends React.PureComponent {


    getCompareAccessor(d, s)
    {
        return d.compare[s]
    }

    

    render() {

        const config = this.props.config;

        console.log('---CHART COMPARE---');
        console.log(config);

        if(!config.hide)
        {
            return (
                <>
                    <LineSeries yAccessor={(d) => this.getCompareAccessor(d,config.symbol+'open')} strokeWidth={2} stroke={config.color} interpolation={curveMonotoneX}/>
                    <EdgeIndicator 
                            orient="right"
                            edgeAt="right"
                            itemType="last"
                            yAccessor={(d) => this.getCompareAccessor(d,config.symbol+'open')}
                            displayFormat={format(".2%")}
                            arrowWidth={0}
                            fill={config.color}
                            fontSize={11}
                            rectHeight={18}
                            strokeWidth={1}
                            lineOpacity={0}
                        />
                        <LastPointIndicator yAccessor={(d) => this.getCompareAccessor(d,config.symbol+'open')} displayFormat={format(".2%")} fill={config.color} radius={5}/>
                        <StockMarker 
                            edgeAt="right"
                            orient="left"
                            itemType="last"
                            yAccessor={(d) => this.getCompareAccessor(d,config.symbol+'open')}
                            displayFormat={format(".2%")}
                            arrowWidth={0}
                            fill={config.color}
                            fontSize={11}
                            rectHeight={18}
                            rectWidth={config.symbol.length * 11}
                            strokeWidth={1}
                            lineOpacity={0}
                            labelText={config.symbol}
                        />
                                                
                        <CompareStockTooltip
                            yAccessor={d => d[config.symbol+'open']}
                            yLabel={config.symbol}
                            yDisplayFormat={format(".2f")}
                            valueStroke={config.color}
                            labelFill={config.color}
                            hide={config.hide}
                            origin={[10, 25*(this.props.indx+4)]}
                            toggleHide={this.props.toggleHide}
                            removeStock={this.props.removeStock}
                        />
                </>
            )
        }
        else
        {
            return (
                <>
                    <CompareStockTooltip
                        yAccessor={d => d[config.symbol+'open']}
                        yLabel={config.symbol}
                        yDisplayFormat={format(".2f")}
                        valueStroke={config.color}
                        labelFill={config.color}
                        origin={[10, 25*(this.props.indx+4)]}
                        hide={config.hide}
                        toggleHide={this.props.toggleHide}
                        removeStock={this.props.removeStock}
                    />
                </>
            )
        }
    }
}

export default ChartCompareStock;
