import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default class Header extends Component {
	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" color="inherit">
						Deily
					</Typography>
					<Button color="inherit"><AccountCircle /></Button>
				</Toolbar>
			</AppBar>
		);
	}
}
