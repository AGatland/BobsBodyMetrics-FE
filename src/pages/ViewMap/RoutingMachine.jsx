/* eslint-disable react/prop-types */
// src/components/RoutingMachine.js
import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import orsRouter from '../Map/ORSRouter';
import { environment } from '../../environments/environments';

const RoutingMachine = ({ waypoints }) => {
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
      addWaypoints: false,
      show: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    routingControl.on('routingerror', function (e) {
      console.error('Routing error:', e.error);
    });

    // Cleanup on component unmount
    return () => map.removeControl(routingControl);
  }, [map, waypoints]);

  return null;
};

export default RoutingMachine;
