/* eslint-disable react/prop-types */
// src/components/Map.js
import { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import RoutingMachine from './RoutingMachine';
import GeoSearch from './GeoSearch';

const MapEventsHandler = ({ onClick }) => {
  useMapEvents({
    click: onClick,
  });
  return null;
};

export default function Map({ setDistance }) {
  const mapRef = useRef(null);
  const [position, setPosition] = useState(null); // Initialize with null
  const [waypoints, setWaypoints] = useState([]); // State to manage waypoints

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        () => {
            setPosition([0, 0])
          console.log('Geolocation not supported or permission denied');
        }
      );
    } else {
      console.log('Geolocation not supported by this browser.');
    }
  }, []);

  const handleMapClick = (event) => {
    if (waypoints.length < 2) {
      setWaypoints([...waypoints, event.latlng]);
    } else {
      setWaypoints(calculateDistance(event.latlng));
    }
  };

  const calculateDistance = (latlng) => {
    let wp1dis = Math.sqrt(Math.pow(waypoints[0].lat - latlng.lat, 2)+Math.pow(waypoints[0].lng - latlng.lng, 2))
    let wp2dis = Math.sqrt(Math.pow(waypoints[1].lat - latlng.lat, 2)+Math.pow(waypoints[1].lng - latlng.lng, 2))

    if (wp1dis < wp2dis) {
        return [waypoints[1], latlng]
    }
    return [waypoints[0], latlng]
  }

  if (!position) {
    return <div>Loading...</div>; // Or a custom loader component
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ flexGrow: 1 }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine waypoints={waypoints} setDistance={ setDistance }/>
      <GeoSearch />
      <MapEventsHandler onClick={handleMapClick} />
    </MapContainer>
  );
}
