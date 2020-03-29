import React, { useState } from "react";

//Utils
import { makeStyles, Modal, Backdrop, Fade, Typography, Slider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	modal: {
		position: "relative",
		top: "50%",
		width: "85vw",
		margin: "auto 7.5vw"
	},
	paper: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "#1d1e22",
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: "100%"
	}
}));

export default function SettingsModal({ closeModal, onChange }) {
	const classes = useStyles();
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
		closeModal();
	};

	const handleChange = (event, newValue) => {
		onChange(newValue);
	};

	const marks = [
		{
			value: 25
		},
		{
			value: 50
		},
		{
			value: 75
		},
		{
			value: 100
		},
		{
			value: 125
		},
		{
			value: 150
		},
		{
			value: 175
		},
		{
			value: 200
		}
	];

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}>
			<Fade in={open}>
				<div className={classes.paper}>
					<Typography align='left' variant='h6' id='slider' gutterBottom>
						Nombre de résultats :
					</Typography>
					<Slider
						defaultValue={100}
						aria-labelledby='slider'
						step={null}
						marks={marks}
						max={200}
						valueLabelDisplay='auto'
						onChange={handleChange}
					/>
				</div>
			</Fade>
		</Modal>
	);
}
