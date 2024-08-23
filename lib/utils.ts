// Description: This file contains utility functions that are used in multiple places in the app.
export function randomizeCoordinatesWithinRadius(
  lat: number,
  lng: number,
  radius: number = 5,
) {
  // Convert radius from km to degrees
  const radiusInDegrees = radius / 111.32; // Approximately 111.32 km per degree

  // Generate random adjustments for latitude and longitude within the radius
  const latAdjustment =
    Math.random() * radiusInDegrees * (Math.random() > 0.5 ? 1 : -1);
  const lngAdjustment =
    Math.random() * radiusInDegrees * (Math.random() > 0.5 ? 1 : -1);

  // Apply adjustments to the original coordinates
  const newLat = lat + latAdjustment;
  const newLng = lng + lngAdjustment;

  return {lat: newLat, lng: newLng};
}

export function calculateRegion(nearbyTailors: any[], radius: number = 1) {
  if (nearbyTailors.length === 0) {
    return {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    };
  }

  // Initialize min and max values with the first tailor's coordinates
  let minLat = nearbyTailors[0].latitude;
  let maxLat = nearbyTailors[0].latitude;
  let minLng = nearbyTailors[0].longitude;
  let maxLng = nearbyTailors[0].longitude;

  // Iterate through the nearby tailors to find the min and max values
  nearbyTailors.forEach(tailor => {
    minLat = Math.min(minLat, tailor.latitude);
    maxLat = Math.max(maxLat, tailor.latitude);
    minLng = Math.min(minLng, tailor.longitude);
    maxLng = Math.max(maxLng, tailor.longitude);
  });

  // Calculate the center of the region
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  // Convert radius from kilometers to degrees (approximation)
  const radiusInDegrees = radius / 111.32;

  // Calculate the latitude and longitude deltas
  const latDelta = maxLat - minLat + 2 * radiusInDegrees;
  const lngDelta = maxLng - minLng + 2 * radiusInDegrees;

  // Return the region object
  const region = {
    latitude: centerLat,
    longitude: centerLng,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  };

  return region;
}

const deg2rad = (deg: number) => deg * (Math.PI / 180);

type LatLng = {lat: number; lng: number};

export function calculateDistance(srcLatLng: LatLng, destLatLng: LatLng) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(destLatLng.lat - srcLatLng.lat); // deg2rad below
  const dLng = deg2rad(destLatLng.lng - srcLatLng.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(srcLatLng.lat)) *
      Math.cos(deg2rad(destLatLng.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in km
  const distance = R * c;
  return distance;
}
