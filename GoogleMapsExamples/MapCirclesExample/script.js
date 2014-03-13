/*
	Author: Graeme Boy (graemeboy@gmail.com)
	Purpose: Exploring Google Maps
	
	Description: I used data from the Global Renaissance eBooks corpus to generate 
	data relating to how often certain place names were mentioned in the titles and 
	descriptions of each of the works it contains. In this example, I use only a few heavy-hitting
	places, inluding, for example, Alexandria, China, etc., and I produce a map with clickable circles
	that display the number of mentions for a given place. The radius of the cirlce is related to the
	number of mentions.
*/
function initialize() {
	var map;
	var centerPosition = new google.maps.LatLng(20.593684, 78.96288);
	// Set the map style:
	var mapStyle = [{
		stylers: [{
			saturation: -100
		}, {
			gamma: 0.15
		}, {
			lightness: -20
		}]
	}, {
		elementType: "labels",
		stylers: [{
			invert_lightness: true
		}, {
			lightness: -10
		}]
	}, {
		featureType: "water",
		elementType: "geometry",
		stylers: [{
			lightness: -65
		}]
	}, {
		featureType: "administrative",
		elementType: "geometry",
		stylers: [{
			invert_lightness: true
		}, {
			lightness: -20
		}]
	}];
	// Set some options for the map:
	var options = {
		center: new google.maps.LatLng(0, 0),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 2,
		maxZoom: 4,
		disableDefaultUI: true,
		scrollwheel: false,
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_CENTER
		},
		styles: mapStyle
	};
	// Create the map:
	map = new google.maps.Map(document.getElementById('map'), options);
	// We're going to have circles overlayed on our map, so initialize an array for those:
	var circles = new Array();
	// Here is our raw data, which will include the name and coordinates
	var mentionsData = {};
	mentionsData['data'] = {
		"type": "Topology",
		"transform": {
			"scale": [0.03590091833904782, 0.01725005730520519],
			"translate": [0, 0, ]
		},
		"objects": {
			"mentions_data": {
				"type": "GeometryCollection",
				"geometries": [{
					'type': 'Point',
					'coordinates': [45.80227, 126.53626],
					'properties': {
						'NAME': 'Harbin',
						'MENTIONS': 1,
						'COORDINATES': [45.80227, 126.53626],
					}
				}, {
					'type': 'Point',
					'coordinates': [55.755826, 37.6173],
					'properties': {
						'NAME': 'Moscow',
						'MENTIONS': 1,
						'COORDINATES': [55.755826, 37.6173],
					}
				}, {
					'type': 'Point',
					'coordinates': [30.0444196, 31.2357116],
					'properties': {
						'NAME': 'Cairo',
						'MENTIONS': 1,
						'COORDINATES': [30.0444196, 31.2357116],
					}
				}, {
					'type': 'Point',
					'coordinates': [36.752887, 3.042048],
					'properties': {
						'NAME': 'Algiers',
						'MENTIONS': 3,
						'COORDINATES': [36.752887, 3.042048],
					}
				}, {
					'type': 'Point',
					'coordinates': [52.5200066, 13.404954],
					'properties': {
						'NAME': 'Berlin',
						'MENTIONS': 3,
						'COORDINATES': [52.5200066, 13.404954],
					}
				}, {
					'type': 'Point',
					'coordinates': [-33.8674869, 151.2069902],
					'properties': {
						'NAME': 'Sydney',
						'MENTIONS': 4,
						'COORDINATES': [-33.8674869, 151.2069902],
					}
				}, {
					'type': 'Point',
					'coordinates': [30.0444196, 31.2357116],
					'properties': {
						'NAME': 'New York',
						'MENTIONS': 6,
						'COORDINATES': [30.0444196, 31.2357116],
					}
				}, {
					'type': 'Point',
					'coordinates': [40.4167754, -3.7037902],
					'properties': {
						'NAME': 'Madrid',
						'MENTIONS': 9,
						'COORDINATES': [40.4167754, -3.7037902],
					}
				}, {
					'type': 'Point',
					'coordinates': [38.8048355, -77.0469214],
					'properties': {
						'NAME': 'Alexandria',
						'MENTIONS': 10,
						'COORDINATES': [38.8048355, -77.0469214],
					}
				}, {
					'type': 'Point',
					'coordinates': [21.195, 72.819444],
					'properties': {
						'NAME': 'Surat',
						'MENTIONS': 11,
						'COORDINATES': [21.195, 72.819444],
					}
				}, {
					'type': 'Point',
					'coordinates': [21.195, 72.819444],
					'properties': {
						'NAME': 'Japan',
						'MENTIONS': 12,
						'COORDINATES': [21.195, 72.819444],
					}
				}, {
					'type': 'Point',
					'coordinates': [-12.046374, -77.0427934],
					'properties': {
						'NAME': 'Lima',
						'MENTIONS': 26,
						'COORDINATES': [-12.046374, -77.0427934],
					}
				}, {
					'type': 'Point',
					'coordinates': [35.86166, 104.195397],
					'properties': {
						'NAME': 'China',
						'MENTIONS': 52,
						'COORDINATES': [35.86166, 104.195397],
					}
				}, {
					'type': 'Point',
					'coordinates': [-8.783195, 34.508523],
					'properties': {
						'NAME': 'Africa',
						'MENTIONS': 53,
						'COORDINATES': [-8.783195, 34.508523],
					}
				}, {
					'type': 'Point',
					'coordinates': [41.87194, 12.56738],
					'properties': {
						'NAME': 'Italy',
						'MENTIONS': 67,
						'COORDINATES': [41.87194, 12.56738],
					}
				}, {
					'type': 'Point',
					'coordinates': [37.4315734, -78.6568942],
					'properties': {
						'NAME': 'Virginia',
						'MENTIONS': 80,
						'COORDINATES': [37.4315734, -78.6568942],
					}
				}, {
					'type': 'Point',
					'coordinates': [37.09024, -95.712891],
					'properties': {
						'NAME': 'America',
						'MENTIONS': 98,
						'COORDINATES': [37.09024, -95.712891],
					}
				}, {
					'type': 'Point',
					'coordinates': [40.463667, -3.74922],
					'properties': {
						'NAME': 'Spain',
						'MENTIONS': 157,
						'COORDINATES': [40.463667, -3.74922],
					}
				}, {
					'type': 'Point',
					'coordinates': [20.593684, 78.96288],
					'properties': {
						'NAME': 'India',
						'MENTIONS': 164,
						'COORDINATES': [20.593684, 78.96288],
					}
				},
/*
				I removed France and London, 
				because these are outliers that I don't have to deal with in this example!

				{
				'type': 'Point', 'coordinates': [46.227638,2.213749], 'properties': {
				'NAME': 'France', 'MENTIONS': 508, 'COORDINATES': [46.227638,2.213749],
				}
				},
				{
				'type': 'Point', 'coordinates': [51.508515,-0.1254872], 'properties': {
				'NAME': 'London', 'MENTIONS': 2255, 'COORDINATES': [51.508515,-0.1254872],
				}
				},
			*/
				]
			}
		}
	};
	var prop = Object.getOwnPropertyNames(mentionsData.data.objects)[0]
	geojson = topojson.feature(mentionsData.data, mentionsData.data.objects[prop]);
	geometries = new GeoJSON(geojson);
	for (var i = 0; i < geometries.length; i++) {
		var latLng = new google.maps.LatLng(geometries[i].geojsonProperties.COORDINATES[0], geometries[i].geojsonProperties.COORDINATES[1]);
		geometries[i].setOptions({
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: geometries[i].geojsonProperties['MENTIONS'] / 10,
				fillColor: "#ff0000",
				fillOpacity: 0.6,
				strokeColor: "#333333",
				strokeWeight: 1,
				strokeOpacity: 0.6,
			}
		});
		geometries[i].setPosition(latLng);
/* 	Let's create a little popup for each circle, so that whenever it's clicked on,
			it will show the number of mentions and the name! */
		var infoWindow = new google.maps.InfoWindow();
		google.maps.event.addListener(geometries[i], 'click', function() {
			infoWindow.setContent('<div>' + this.geojsonProperties.NAME + '</div>' + '<div>Mentions: ' + this.geojsonProperties.MENTIONS.toString() + '</div>');
			infoWindow.open(map, this);
		});
		geometries[i].setMap(map);
	}
}
// Load the map whenever the DOM loads!
google.maps.event.addDomListener(window, 'onload', initialize());