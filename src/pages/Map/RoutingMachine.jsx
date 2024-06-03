/* eslint-disable react/prop-types */
// src/components/RoutingMachine.js
import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import orsRouter from './ORSRouter';
import { environment } from '../../environments/environments';

const RoutingMachine = ({ waypoints, setDistance }) => {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: waypoints,
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }],
      },
      router: orsRouter({
        apiKey: environment.ORSToken,
      }),
      addWaypoints: true,
      show: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    routingControl.on('routesfound', function (e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      setDistance(summary.totalDistance);
    });

    routingControl.on('routingerror', function (e) {
      console.error('Routing error:', e.error);
    });

    // Cleanup on component unmount
    return () => map.removeControl(routingControl);
  }, [map, waypoints, setDistance]);

  return null;
};

export default RoutingMachine;
