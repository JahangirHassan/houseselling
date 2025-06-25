mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: [ 71.7445, 29.1207], // starting position [lng, lat]
    // center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});