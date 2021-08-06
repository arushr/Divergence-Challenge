import React from 'react';
import logo from '../logo.svg';
import '../LandingPage.css';
import Graph from './Graph';

const App = () => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<Graph />
		</header>
	</div>
);

export default App;
