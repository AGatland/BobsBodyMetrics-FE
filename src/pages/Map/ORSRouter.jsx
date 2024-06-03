// src/ORSRouter.js
import L from 'leaflet';
import 'leaflet-routing-machine';
import { environment } from '../../environments/environments';

const ORSRouter = L.Class.extend({
  options: {
    serviceUrl: 'https://api.openrouteservice.org/v2/directions/foot-walking',
    apiKey: environment.ORSToken,
  },

  initialize: function (options) {
    L.Util.setOptions(this, options);
  },

  buildRouteUrl: function (waypoints) {
    const coordinates = waypoints.map(wp => [wp.latLng.lng, wp.latLng.lat]);
    //const locations = coordinates.map(coord => coord.join(',')).join('|');
    return `${this.options.serviceUrl}?api_key=${this.options.apiKey}&start=${coordinates[0].join(',')}&end=${coordinates[1].join(',')}`;
  },

  route: function (waypoints, callback, context){//, options) {
    if (waypoints.length < 2) {
      return callback(null, []);
    }

    const url = this.buildRouteUrl(waypoints);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data || !data.features || data.features.length === 0) {
          return callback(null, []);
        }

        const route = data.features[0];
        const coordinates = route.geometry.coordinates.map(([lng, lat]) => L.latLng(lat, lng));
        const summary = {
          totalDistance: route.properties.segments.reduce((acc, segment) => acc + segment.distance, 0),
          totalTime: route.properties.segments.reduce((acc, segment) => acc + segment.duration, 0),
        };

        const result = [{
          name: 'Route',
          coordinates,
          instructions: route.properties.segments.flatMap(segment => segment.steps.map(step => ({
            type: step.type,
            text: step.instruction,
            distance: step.distance,
            time: step.duration,
            index: step.way_points[0],
          }))),
          summary,
          inputWaypoints: waypoints.map(wp => ({
            latLng: wp.latLng,
            name: wp.name || '',
            options: wp.options || {},
          })),
          waypoints: waypoints.map(wp => wp.latLng),
          waypointIndices: [0, coordinates.length - 1],
        }];

        callback.call(context, null, result);
      })
      .catch(error => {
        console.error('Error fetching route from ORS:', error);
        callback.call(context, error, null);
      });
  },
});

export default function orsRouter(options) {
  return new ORSRouter(options);
}
