import React from "react";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
	AppBar,
	CssBaseline,
	Toolbar,
	Typography,
	Divider,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader
} from "@material-ui/core";
import { AddCircle as AddIcon, ImageSearch as SearchIcon, Menu as MenuIcon } from "@material-ui/icons";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		backgroundColor: "#1d1e22",
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none"
		}
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: "#393f4d"
	}
}));

function ResponsiveDrawer(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleOnClick = query => {
		props.onChange(query);
		handleDrawerToggle();
	};

	const drawer = (
		<div>
			<List>
				<ListSubheader className='position-relative'>Catégories</ListSubheader>
				<Divider />
				{props.themes.map(theme => {
					return (
						<ListItem button key={theme.name} onClick={() => handleOnClick(theme.name)}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary={theme.name} />
						</ListItem>
					);
				})}
				<ListSubheader className='position-relative'>Tags</ListSubheader>
				<Divider />
				{props.tags.map(tag => {
					return (
						<ListItem button key={tag.name} onClick={() => handleOnClick(tag.name)}>
							<ListItemIcon>
								<SearchIcon />
							</ListItemIcon>
							<ListItemText primary={tag.name} />
						</ListItem>
					);
				})}
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Mappy
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label='mailbox folders'>
				<Hidden smUp implementation='css'>
					<Drawer
						container={container}
						variant='temporary'
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant='permanent'
						open>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<Toolbar />
		</div>
	);
}

export default ResponsiveDrawer;
