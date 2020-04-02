import React, { useState, useEffect } from "react";

//Utils
import axios from "axios";
import { usePosition } from "use-position";

//MUI
import { makeStyles, CircularProgress } from "@material-ui/core";

//Components
import Map from "../../components/Map";
import BottomBar from "./components/BottomBar";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";

const useStyles = makeStyles(theme => ({
	root: {
		height: "80vh",
		width: "100vw"
	},
	loading_container: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		zIndex: 1000
	},
	loading: {
		color: "#FF5A09"
	}
}));

export default function Home() {
	const classes = useStyles();

	const [searchResults, setSearchResults] = useState(100);
	const [query, setQuery] = useState("");
	const [events, setEvents] = useState([]);
	const [themes, setThemes] = useState([]);
	const [address, setAddress] = useState("");
	const [tags, setTags] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const { latitude, longitude, timestamp, accuracy } = usePosition(false);

	useEffect(() => {
		async function fetchEvents() {
			setLoading(true);
			try {
				const res = await axios.get(
					`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&lang=fr&rows=${searchResults}&facet=category&facet=tags&facet=address_zipcode&facet=access_type&facet=price_type=&q=${query}`
				);
				setEvents(res.data.records);
				setThemes(res.data.facet_groups[0].facets);
				setTags(res.data.facet_groups[3].facets);
				if (res.data) setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		async function fetchPosition() {
			try {
				const res = await axios.get(
					`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=8c68c754598f4c7bb99a319dacc97d15`
				);
				if (res.data) setAddress(res.data.results[0].formatted);
			} catch (error) {
				console.log(error);
			}
		}
		fetchEvents();
		if (longitude && latitude && accuracy < 20000) fetchPosition();
	}, [query, searchResults, latitude, longitude, accuracy, timestamp]);

	const onSearchResultChange = newValue => {
		if (newValue && newValue !== searchResults) setSearchResults(newValue);
	};
	const onQueryChange = newQuery => {
		setQuery(newQuery);
	};

	const toggleSettings = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<Drawer themes={themes} tags={tags} onChange={onQueryChange} />
			<div className={classes.root}>
				{isModalOpen ? (
					<Modal onChange={onSearchResultChange} closeModal={toggleSettings} />
				) : loading ? (
					<div className={classes.loading_container}>
						<CircularProgress disableShrink className={classes.loading} size={60} />
					</div>
				) : null}
				<Map
					events={events}
					address={address}
					latitude={latitude}
					longitude={longitude}
					timestamp={timestamp}
					accuracy={accuracy}
				/>
			</div>
			<BottomBar onChange={onQueryChange} query={query} toggleSettings={toggleSettings} />
		</>
	);
}
