import {
	getCurrentItem
} from 'react-stockcharts/lib/utils/ChartDataUtil';

import {
	last,lastValid
} from './index';
/* eslint-disable no-unused-vars */

export function mouseBasedZoomAnchor({
	xScale,
	xAccessor,
	mouseXY,
	plotData,
	fullData,
}) {
	const currentItem = getCurrentItem(xScale, xAccessor, mouseXY, plotData);
	return xAccessor(currentItem);
}

export function lastVisibleItemBasedZoomAnchor({
	xScale,
	xAccessor,
	mouseXY,
	plotData,
	fullData,
}) {
	const lastItem = last(plotData);
	return xAccessor(lastItem);
}

export function lastValidVisibleItemBasedZoomAnchor({
	xScale,
	xAccessor,
	mouseXY,
	plotData,
	fullData,
}) {
    const lastValidItem = lastValid(plotData);
	return xAccessor(lastValidItem);
}


export function rightDomainBasedZoomAnchor({
	xScale,
	xAccessor,
	mouseXY,
	plotData,
	fullData,
}) {
	const [, end] = xScale.domain();
	return end;
}
/* eslint-enable no-unused-vars */
