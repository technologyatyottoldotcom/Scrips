import React from "react";

import { isDefined} from "react-stockcharts/lib/utils";

/* eslint-disable react/prop-types */
export function renderSVG(props) {
	const { className } = props;

	const edge = helper(props);
	if (edge === null) return null;
	let circle;

    if(isDefined(edge.circle))
    {
        circle = <g>
            <circle className="pulse-disk" cx={edge.circle.x} cy={edge.circle.y} r={edge.circle.radius} fill={edge.circle.fill}/>
            {/* <circle className="pulse-circle-1" cx={edge.circle.x} cy={edge.circle.y} strokeWidth="2" fill={edge.circle.fill}/>
            <circle className="pulse-circle-2" cx={edge.circle.x} cy={edge.circle.y}  strokeWidth="2" fill={edge.circle.fill}/> */}
        </g>
    }


	return (
		<g className={className}>
            {circle}
		</g>
	);
}
/* eslint-enable react/prop-types */

function helper(props) {
	const {show,hideLine} = props;
	const {fill,lineStroke,lineOpacity,radius} = props;
	const { x1, y1} = props;

	if (!show) return null;
    
    const circle = hideLine 
        ? undefined
        : {
            opacity: lineOpacity,
            stroke: lineStroke,
            fill,
            radius,
            x : x1,
            y : y1,
        };

	return {
        circle,
	};
}



// export default EdgeCoordinate;
