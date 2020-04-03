import React, { useState, useEffect } from "react";

//MUI
import { makeStyles, AppBar, Toolbar, Fab, TextField } from "@material-ui/core";

import {
	Settings as SettingsIcon,
	MusicNote as MusicIcon,
	Search as SearchIcon,
	ShoppingCart as CartIcon,
	LocalCafe as Cafe
} from "@material-ui/icons";
import { Form } from "reactstrap";

const useStyles = makeStyles(theme => ({
	appBar: {
		top: "auto",
		bottom: 0,
		height: "20vh",
		width: "100vw",
		backgroundColor: "#1d1e22"
	},
	inputContainer: {
		position: "absolute",
		top: -30,
		left: "0",
		width: "100%",
		display: "flex",
		zIndex: 1,
		padding: "2px 4px",
		margin: "0 auto"
	},
	input: {
		position: "relative",
		width: "70%",
		margin: "0 auto",
		backgroundColor: "#1d1e22"
	},
	fabButton: {
		backgroundColor: "#FF5A09",
		position: "relative",
		margin: "0 auto",
		height: "3rem",
		width: "3rem"
	},
	icons: {
		display: "flex",
		height: "100%",
		width: "100%",
		justifyContent: "space-around",
		marginTop: "10px",
		alignItems: "center"
	},
	icon: {
		height: "3rem",
		width: "3rem",
		backgroundColor: "#393f4d",
		"&:hover": {
			backgroundColor: "#ec7f37 !important"
		}
	},
	"@media (min-width: 321px)": {
		fabButton: {
			height: "3.5rem",
			width: "3.5rem"
		},
		icons: {
			marginTop: 0
		},
		icon: {
			height: "3.5rem",
			width: "3.5rem"
		}
	},
	"@media (min-width: 378px)": {
		appBar: {
			width: "calc(100vw - 250px)"
		},
		icon: {
			height: "5rem",
			width: "5rem"
		}
	}
}));

export default function BottomBar({ query, onChange, toggleSettings }) {
	const classes = useStyles();

	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		setInputValue(query);
	}, [query]);

	const handleChange = e => {
		setInputValue(e.target.value);
	};

	const handleCategoryChange = value => {
		if (inputValue === value) {
			setInputValue("");
			onChange("");
		} else {
			setInputValue(value);
			onChange(value);
		}
	};

	const handleToggleSettings = () => {
		toggleSettings();
	};

	const handleSubmit = e => {
		if (e) e.preventDefault();
		onChange(inputValue);
	};

	return (
		<AppBar position='fixed' color='primary' className={classes.appBar}>
			<Form className={classes.inputContainer} onSubmit={e => handleSubmit(e)}>
				<TextField
					className={classes.input}
					label='Thématique'
					variant='filled'
					color='secondary'
					value={inputValue}
					onChange={handleChange}
					InputProps={{
						disableUnderline: true
					}}
				/>
				<Fab color='secondary' aria-label='add' className={classes.fabButton}>
					<SearchIcon onClick={() => handleSubmit()} />
				</Fab>
			</Form>

			<Toolbar className={classes.icons}>
				<Fab color='secondary' aria-label='add' className={classes.icon}>
					<MusicIcon onClick={() => handleCategoryChange("musique")} />
				</Fab>
				<Fab color='secondary' aria-label='add' className={classes.icon}>
					<CartIcon onClick={() => handleCategoryChange("shopping")} />
				</Fab>
				<Fab color='secondary' aria-label='add' className={classes.icon}>
					<Cafe onClick={() => handleCategoryChange("cafe")} />
				</Fab>
				<Fab color='secondary' aria-label='add' className={classes.icon}>
					<SettingsIcon onClick={() => handleToggleSettings()} />
				</Fab>
			</Toolbar>
		</AppBar>
	);
}
