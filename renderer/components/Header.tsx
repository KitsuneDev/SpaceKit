import React, { Component } from 'react'
import Link from "next/link";
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
	root: {
	  flexGrow: 1,
	  paddingBottom: 10
	},
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	title: {
	  flexGrow: 1,
	},
	companySign: {
		fontWeight: "lighter"
	}
  }));

const Header = (props: any) => {
  var classes = useStyles();
  return <div className={classes.root}>
            <AppBar position="static">
            	<Toolbar>
            		<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            			<MenuIcon />
            		</IconButton>
            		<Typography variant="h6" className={classes.title}>
            			<div className={classes.companySign}>SpaceKit</div>
            		</Typography>
					<Link href="/mods">
            			<Button color="inherit">Manage Mods</Button>
					</Link>
            	</Toolbar>
            </AppBar>
            </div>;
};

export default Header;
    