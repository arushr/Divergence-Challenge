import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import '../assets/Graph.css';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import CSVFile from './Divergence_Fronend_Challenge_RawEEG.csv';
import { Marks } from './Marks';

const Graph = () => {
	const d3graph = useRef();

	const width = 560;
	const height = 500;

	const margin = {
		top: 50,
		right: 30,
		bottom: 30,
		left: 30
	};

	const xAxisLabelOffset = 50;
	const yAxisLabelOffset = 45;

	// Value Accessers

	const xValue = (d) => d.C3;
	const xAxisLabel = 'C3';

	const yValue = (d) => d.C4;
	const yAxisLabel = 'C4 ';

	// const csvData = useData();

	const [csvData, setCsvData] = useState(null);

	useEffect(() => {
		const row = (d) => {
			d.C3 = +d.C3;
			d.C4 = +d.C4;

			return d;
		};
		d3.csv(CSVFile, row).then((data) => {
			setCsvData(data.slice(0, 10));
		});
	});
	/*
		const width = parseInt(d3.select('#graphContainer').style('width'), 10);
		const height = parseInt(
			d3.select('#graphContainer').style('height'),
			10
		);
        */

	/*
		const svg = d3
			.select(d3graph.current)
			.attr('width', width)
			.attr('height', height)
			.style('background-color', 'red')
			.append('g')
			.attr('transform', `translate( ${margin.left} , ${margin.top} )`);

            
	}, []);

	*/
	// console.log(csvData, 'this is scscs');
	const siFormat = d3.format('.2s');
	const xAxisTickFormat = (tickValue) =>
		siFormat(tickValue).replace('G', 'B');

	if (!csvData) {
		return <pre>Loading...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	//

	// extent used for going from minium to maximum

	// distance used, so using Linear Scale

	const xScale = d3
		.scaleLinear()
		.domain(d3.extent(csvData, xValue))
		.range([0, innerWidth]);

	const yScale = d3
		.scaleLinear()
		.domain(d3.extent(csvData, yValue))
		.range([0, innerHeight]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom
					xScale={xScale}
					innerHeight={innerHeight}
					tickFormat={xAxisTickFormat}
					tickOffset={7}
				/>
				<text
					className="axis-label"
					textAnchor="middle"
					transform={`translate(${-yAxisLabelOffset},${
						innerHeight / 2
					}) rotate(-90)`}
				>
					{yAxisLabel}
				</text>
				<AxisLeft
					yScale={yScale}
					innerWidth={innerWidth}
					tickOffset={7}
				/>
				<text
					className="axis-label"
					x={innerWidth / 2}
					y={innerHeight + xAxisLabelOffset}
					textAnchor="middle"
				>
					{xAxisLabel}
				</text>
				<Marks
					data={csvData}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					tooltipFormat={xAxisTickFormat}
					circleRadius={3}
				/>
			</g>
		</svg>
	);
	/*
		<div id="graphContainer">
			<svg ref={d3graph}> </svg>
			{console.log(csvData)}
		</div>
       
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				{xScale.ticks().map((tickValue) => (
					<g
						key={tickValue}
						transform={`translate(${xScale(tickValue)},0)`}
					>
						<line y2={innerHeight} stroke="black" />
						<text
							style={{ textAnchor: 'middle' }}
							dy=".71em"
							y={innerHeight + 3}
						>
							{tickValue}
						</text>
					</g>
				))}
				{yScale.domain().map((tickValue) => (
					<text
						key={tickValue}
						style={{ textAnchor: 'end' }}
						x={-3}
						dy=".32em"
						y={yScale(tickValue) + yScale.bandwidth() / 2}
					>
						{tickValue}
					</text>
				))}
				{csvData.map((d) => (
					<rect
						key={d.Country}
						x={0}
						y={yScale(d.Country)}
						width={xScale(d.Population)}
						height={yScale.bandwidth()}
					/>
				))}
			</g>
		</svg>
         */
};

export default Graph;
