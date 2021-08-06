import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import '../assets/Graph.css';
import CSVFile from './Divergence_Fronend_Challenge_RawEEG.csv';

const Graph = () => {
	const d3graph = useRef();

	const margin = {
		top: 50,
		right: 30,
		bottom: 30,
		left: 30
	};

	const svg = useEffect(() => {
		d3.csv(CSVFile).then((data) => {
			console.log(data[0]);
		});

		const width = parseInt(d3.select('#graphContainer').style('width'), 10);
		const height = parseInt(
			d3.select('#graphContainer').style('height'),
			10
		);

		const svg = d3
			.select(d3graph.current)
			.attr('width', width)
			.attr('height', height)
			.style('background-color', 'red')
			.append('g')
			.attr(
				'transform',
				'translate(' + margin.left + ',' + margin.top + ')'
			);
	}, [1]);

	return (
		<div id="graphContainer">
			<svg ref={d3graph}> </svg>
		</div>
	);
};

export default Graph;
