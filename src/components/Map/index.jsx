import React, { useState, useEffect } from "react";

//Utils
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map() {
	const [lat, setLat] = useState(37.7749);
	const [lng, setLng] = useState(-122.4194);
	const [zoom, setZoom] = useState(13);

	const [loading, setLoading] = useState(false);

	const position = [lat, lng];

	return (
		<LeafletMap center={position} zoom={zoom}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
			/>
			<Marker position={position}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</LeafletMap>
	);
}
