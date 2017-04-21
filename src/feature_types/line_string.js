const Feature = require('./feature');

const LineString = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

LineString.prototype = Object.create(Feature.prototype);

LineString.prototype.isValid = function() {
  return this.coordinates.length > 1;
};

LineString.prototype.addCoordinate = function(path, lng, lat) {
  this.changed();
  const id = parseInt(path, 10);
  this.coordinates.splice(id, 0, [lng, lat]);
};

LineString.prototype.getCoordinate = function(path) {
  const id = parseInt(path, 10);
  return JSON.parse(JSON.stringify(this.coordinates[id]));
};

LineString.prototype.removeCoordinate = function(path) {
  this.changed();
  this.coordinates.splice(parseInt(path, 10), 1);
};

LineString.prototype.updateCoordinate = function(path, lng, lat) {
  const id = parseInt(path, 10);
  this.coordinates[id] = [lng, lat];
  this.changed();
};

LineString.prototype.updateCoordinateShift = function(path, lng, lat) {  
  const id = parseInt(path, 10);
  let latestPoint = this.coordinates.length >= 2 ? this.coordinates.length-2 : 0;
  let latestLat = this.coordinates[latestPoint][1];
  let latestLng = this.coordinates[latestPoint][0];
  let roundedLat = Math.round(lat / latestLat) * latestLat;
  let roundedLng = Math.round(lng / latestLng) * latestLng;

  latestLat = roundedLng !== latestLng ? Math.round(lat / latestLat) * latestLat : lat === 0 ? latestLat : lat;
  latestLng = roundedLat !== latestLat ? Math.round(lng / latestLng) * latestLng : lng === 0 ? latestLng : lng;

  this.coordinates[id] = [latestLng, latestLat];
  this.changed();
};
module.exports = LineString;
