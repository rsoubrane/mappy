import React, { useState, useEffect } from "react";

//Utils
import Moment from "react-moment";
import { Map, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";

//MUI
import { Phone as PhoneIcon, Directions as DirectionsIcon, Info as MoreIcon, Euro, MoneyOff } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { Icon } from "leaflet";

const myself = new Icon({
	iconUrl: "https://image.flaticon.com/icons/svg/149/149059.svg",
	iconSize: [30, 30]
});
const others = new Icon({
	iconUrl: "https://image.flaticon.com/icons/svg/252/252106.svg",
	iconSize: [30, 30]
});

const MyPopupMarker = ({
	title,
	accuracy,
	latitude,
	longitude,
	timestamp,
	position,
	cover_url,
	category,
	date_start,
	date_end,
	price_type,
	price_link,
	contact,
	address,
	description,
	more_url
}) =>
	longitude && latitude ? (
		<Marker position={position} icon={myself} riseOnHover={true} bubblingMouseEvents={true}>
			<Popup>
				<div className='wrapper'>
					<div className='card'>
						<div className='card__category'>{category}</div>
						<div className='card__title'>{title}</div>

						<div className='card__dates px-3'>
							<h6>{longitude}</h6>
							<h6>{" - "}</h6>
							<h6>{latitude}</h6>
						</div>
						<h6 className='px-3'>{address}</h6>
						<h6 className='text-muted italic'>Précision: ≈{accuracy / 100}km</h6>
					</div>
				</div>
			</Popup>
		</Marker>
	) : (
		<Marker position={position} icon={others} riseOnHover={true} bubblingMouseEvents={true}>
			<Popup>
				<div className='wrapper'>
					<div className='card'>
						<div
							className='card__image'
							style={{
								background: `url(${cover_url})`,
								backgroundSize: "cover"
							}}></div>
						<div className='card__category'>{category}</div>
						<div className='card__title'>{title}</div>

						<div className='card__dates'>
							<h5>
								<Moment format='DD/MM/YYYY'>{date_start}</Moment>
							</h5>
							<h5>{" - "}</h5>
							<h5>
								<Moment format='DD/MM/YYYY'>{date_end}</Moment>
							</h5>
						</div>

						<div className='card__stats clearfix'>
							<Button className='one-fourth' href={price_link} target='_blank'>
								{price_type === "payant" ? <Euro className='stat' /> : <MoneyOff className='stat' />}
							</Button>

							<Button
								className='one-fourth'
								href={`https://google.com/maps/dir//${longitude ? longitude : null}, ${
									latitude ? latitude : null
								}/${position[0]}, ${position[1]}`}
								target='_blank'>
								<DirectionsIcon className='stat' />
							</Button>

							<Button className='one-fourth' href={`tel:${contact}`} target='_blank'>
								<PhoneIcon className='stat' />
							</Button>

							<Button className='one-fourth no-border' href={more_url} target='_blank'>
								<MoreIcon className='stat' />
							</Button>
						</div>
					</div>
				</div>
			</Popup>
		</Marker>
	);

const MyMarkersList = ({ markers }) => {
	const items = markers.map(({ key, ...props }) => <MyPopupMarker key={key} {...props} />);
	return <>{items}</>;
};

export default function MyMap({ events, address, latitude, longitude, timestamp, accuracy }) {
	const [markers, setMarkers] = useState([]);

	useEffect(() => {
		let data = [
			{
				key: "myPosition",
				position: latitude && longitude ? [latitude, longitude] : [0, 0],
				title: "Ma position",
				latitude,
				longitude,
				address,
				timestamp,
				accuracy
			}
		];
		events.forEach(event => {
			const obj = {
				key: event.fields.id,
				position: event.fields.lat_lon ? Object.values(event.fields.lat_lon) : [0, 0],
				cover_url: event.fields.cover_url,
				title: event.fields.title,
				category: event.fields.category,
				date_start: event.fields.date_start,
				date_end: event.fields.date_end,
				price_type: event.fields.price_type,
				price_link: event.fields.access_link,
				contact: event.fields.access_phone,
				address: event.fields.address_street,
				description: event.fields.description,
				more_url: event.fields.url
			};
			data.push(obj);
		});
		setMarkers(data);
	}, [events, address, latitude, longitude, timestamp, accuracy]);

	return (
		<Map
			center={latitude && longitude ? [latitude, longitude] : [48.8566, 2.3522]}
			zoom={latitude && longitude ? 10 : 11}>
			<LayersControl position='topright'>
				<LayersControl.BaseLayer name='Mapbox Custom'>
					<TileLayer url='https://api.mapbox.com/styles/v1/rsoub/ck8db1kuz0vzp1iocagbpz0nn/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg' />
				</LayersControl.BaseLayer>

				<LayersControl.BaseLayer name='Mapbox Emerald'>
					<TileLayer url='https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg' />
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name='Mapbox Streets'>
					<TileLayer url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg' />
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name='Mapbox Satellite'>
					<TileLayer url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg' />
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name='OSM Mapnik'>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
				</LayersControl.BaseLayer>
			</LayersControl>
			<TileLayer url='https://api.mapbox.com/styles/v1/rsoub/ck8db1kuz0vzp1iocagbpz0nn/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg' />
			<MyMarkersList markers={markers} />
		</Map>
	);
}
