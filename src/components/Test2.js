import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import './styles.css';

import CSVFile from './Divergence_Fronend_Challenge_RawEEG.csv';

const Test2 = () => {
	const d3Chart = useRef();
	const margin = { top: 10, right: 30, bottom: 30, left: 60 },
		width = 460 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	const svg = d3
		.select('#d3demo')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${margin.left},${margin.top})`);

	const [data, setData] = useState(null);
	useEffect(() => {
		d3.csv(CSVFile).then((data) => {
			setData(data.slice(0, 10));
		});
	}, []);

	const sumstat = d3.group(data, (d) => d.C3);

	const x = d3
		.scaleLinear()
		.domain(
			d3.extent(data, function (d) {
				return d.C4;
			})
		)
		.range([0, width]);
	svg.append('g')
		.attr('transform', `translate(0, ${height})`)
		.call(d3.axisBottom(x).ticks(5));

	// Add Y axis
	const y = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(data, function (d) {
				return +d.n;
			})
		])
		.range([height, 0]);
	svg.append('g').call(d3.axisLeft(y));

	// color palette
	const color = d3
		.scaleOrdinal()
		.range([
			'#e41a1c',
			'#377eb8',
			'#4daf4a',
			'#984ea3',
			'#ff7f00',
			'#ffff33',
			'#a65628',
			'#f781bf',
			'#999999'
		]);

	// Draw the line
	svg.selectAll('.line')
		.data(sumstat)
		.join('path')
		.attr('fill', 'none')
		.attr('stroke', function (d) {
			return color(d[0]);
		})
		.attr('stroke-width', 1.5)
		.attr('d', function (d) {
			return d3
				.line()
				.x(function (d) {
					return x(d.year);
				})
				.y(function (d) {
					return y(+d.n);
				})(d[1]);
		});

	return (
		<div id="d3demo">
			{console.log(data)}
			<svg ref={d3Chart}></svg>
		</div>
	);
};

export default Test2;
