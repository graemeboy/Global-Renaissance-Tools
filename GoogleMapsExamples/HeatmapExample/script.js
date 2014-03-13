/*
	Author: Graeme Boy (graemeboy@gmail.com)
	Purpose: Exploring the Google Maps Heatmap Library
	
	Description: I used data from the Global Renaissance eBooks corpus to generate 
	data relating to how often certain place names were mentioned in the titles and 
	descriptions of each of the works it contains. In this example, I use only a few heavy-hitting
	places, inluding, for example, Alexandria, China, etc.
*/
/* Add the data for the heat map. To do this, I give add the coordinates as points to the map for a given number of times. Here are the data for the number of place name, number of mentions, and coordinates. */
var map, pointarray, heatmap;
var data = {
	'places': [{
		'name': 'Harbin',
		'mentions': 1,
		'coordinates': [45.80227, 126.53626]
	}, {
		'name': 'Moscow',
		'mentions': 1,
		'coordinates': [55.755826, 37.6173]
	}, {
		'name': 'Cairo',
		'mentions': 1,
		'coordinates': [30.0444196, 31.2357116]
	}, {
		'name': 'Algiers',
		'mentions': 3,
		'coordinates': [36.752887, 3.042048]
	}, {
		'name': 'Berlin',
		'mentions': 3,
		'coordinates': [52.5200066, 13.404954]
	}, {
		'name': 'Sydney',
		'mentions': 4,
		'coordinates': [-33.8674869, 151.2069902]
	}, {
		'name': 'New York',
		'mentions': 6,
		'coordinates': [30.0444196, 31.2357116]
	}, {
		'name': 'Madrid',
		'mentions': 9,
		'coordinates': [40.4167754, -3.7037902]
	}, {
		'name': 'Alexandria',
		'mentions': 10,
		'coordinates': [38.8048355, -77.0469214]
	}, {
		'name': 'Surat',
		'mentions': 11,
		'coordinates': [21.195, 72.819444]
	}, {
		'name': 'Japan',
		'mentions': 12,
		'coordinates': [21.195, 72.819444]
	}, {
		'name': 'Lima',
		'mentions': 26,
		'coordinates': [-12.046374, -77.0427934]
	}, {
		'name': 'China',
		'mentions': 52,
		'coordinates': [35.86166, 104.195397]
	}, {
		'name': 'Africa',
		'mentions': 53,
		'coordinates': [-8.783195, 34.508523]
	}, {
		'name': 'Italy',
		'mentions': 67,
		'coordinates': [41.87194, 12.56738]
	}, {
		'name': 'Virginia',
		'mentions': 80,
		'coordinates': [37.4315734, -78.6568942]
	}, {
		'name': 'America',
		'mentions': 98,
		'coordinates': [37.09024, -95.712891]
	}, {
		'name': 'Spain',
		'mentions': 157,
		'coordinates': [40.463667, -3.74922]
	}, {
		'name': 'India',
		'mentions': 164,
		'coordinates': [20.593684, 78.96288]
	},
	// I will remove France and Lond, because they're just too numerously mentioned!
	/* {'name' : 'France', 'mentions': 508, 'coordinates': [46.227638,2.213749]},{'name' : 'London', 'mentions': 2255, 'coordinates': [51.508515,-0.1254872]}, */ ]
};
/*
                For each of these data, I will repeatedly add the coordinates to the map.
            */
var mentionsData = [];
for (var i = 0; i < data['places'].length; i++) {
	for (var x = 0; x < data['places'][i]['mentions']; x++) {
		// create a new Google Maps coordinate.
		var co = new google.maps.LatLng(
		data['places'][i]['coordinates'][0], data['places'][i].coordinates[1]);
		// Add it to our data array.
		mentionsData.push(co);
	}
}
/*
                We can set the style for our map.
            */
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

function initialize() {
	// Initialize the map
	var mapOptions = {
		center: new google.maps.LatLng(0, 0),
		zoom: 2,
		maxZoom: 4,
		disableDefaultUI: true,
		scrollwheel: false,
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_CENTER
		},
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};
	// Add it to the canvas
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var pointArray = new google.maps.MVCArray(mentionsData);
	// Create a heat map layer to go over the map we've just created.
	// Add the coordinate points to the map.
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: pointArray,
		radius: 50
	});
	heatmap.setMap(map);
}
// We'll also have a function that we can use to toggle the heat map.

function toggleHeatmap() {
	heatmap.setMap(heatmap.getMap() ? null : map);
} /* Because we're testng out Google Maps, I want to see what it looks like with different map styles */
var styleCount = 0;

function toggleMapStyle() {
	var styles = [{
		stylers: [{
			hue: "#00ffe6"
		}, {
			saturation: -20
		}]
	}, {
		featureType: "road",
		elementType: "geometry",
		stylers: [{
			lightness: 100
		}, {
			visibility: "simplified"
		}]
	}, {
		featureType: "road",
		elementType: "labels",
		stylers: [{
			visibility: "off"
		}]
	}];
	var styles2 = [{
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
/* 
        Depending on which style is currently set, which is kept track of
        using the styleCount variable, update the style to something new! Exciting.
    */
	if (styleCount == 0) {
		var styledMap = new google.maps.StyledMapType(styles, {
			name: "Styled Map"
		});
		styleCount++;
	} else if (styleCount == 1) {
		var styledMap = new google.maps.StyledMapType(styles2, {
			name: "Styled Map"
		});
		styleCount++;
	} else {
		var styledMap = new google.maps.StyledMapType([], {
			name: "Styled Map"
		});
		styleCount = 0;
	}
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
}
/*
    Again, because we're testing out Google Maps, and now the heat maps, 
    I want to see what the heat maps look like with different gradients.
    */
function changeGradient() {
	var gradient = ['rgba(0, 255, 255, 0)', 'rgba(0, 255, 255, 1)', 'rgba(0, 191, 255, 1)', 'rgba(0, 127, 255, 1)', 'rgba(0, 63, 255, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 223, 1)', 'rgba(0, 0, 191, 1)', 'rgba(0, 0, 159, 1)', 'rgba(0, 0, 127, 1)', 'rgba(63, 0, 91, 1)', 'rgba(127, 0, 63, 1)', 'rgba(191, 0, 31, 1)', 'rgba(255, 0, 0, 1)']
	// Toggle the heat map gradient.
	heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}
// Initialize on DOM load.
google.maps.event.addDomListener(window, 'load', initialize);