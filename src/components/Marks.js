import React from 'react';
import * as d3 from 'd3';

export const Marks = ({
	data,
	xScale,
	yScale,
	xValue,
	yValue,
	tooltipFormat,
	circleRadius
}) => (
	<g className="marks">
		<path
			fill="none"
			stroke="black"
			d={d3
				.line()
				.x((d) => xScale(xValue(d)))
				.y((d) => yScale(yValue(d)))
				.curve(d3.curveNatural)(data)}
		/>
		{/*
	data.map((d) => (
		<circle
			key={d.id}
			className="mark"
			cx={xScale(xValue(d))}
			cy={yScale(yValue(d))}
			r={circleRadius}
		>
			<title>{tooltipFormat(xValue(d))}</title>
		</circle>
		
	));
	*/}
	</g>
);
