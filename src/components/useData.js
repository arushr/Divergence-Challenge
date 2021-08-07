import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = './Divergence_Fronend_Challenge_RawEEG.csv';

export const useData = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const row = (d) => {
			d.C3 = +d.C3;
			d.C4 = +d.C4;

			return d;
		};
		//	csv(csvUrl, row).then(setData);
		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
