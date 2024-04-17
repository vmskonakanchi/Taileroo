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
  // Initialize min and max values with the first tailor's coordinates
  let minLat = nearbyTailors[0].lat;
  let maxLat = nearbyTailors[0].lat;
  let minLng = nearbyTailors[0].lng;
  let maxLng = nearbyTailors[0].lng;

  // Iterate through the nearby tailors to find the min and max values
  nearbyTailors.forEach(tailor => {
    minLat = Math.min(minLat, tailor.lat);
    maxLat = Math.max(maxLat, tailor.lat);
    minLng = Math.min(minLng, tailor.lng);
    maxLng = Math.max(maxLng, tailor.lng);
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
