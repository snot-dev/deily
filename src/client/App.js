import React, { Component, Fragment } from 'react';
import Header from './components/header';

import './app.css';

export default class App extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<h1>Deily!!</h1>
			</Fragment>
		);
	}
}
