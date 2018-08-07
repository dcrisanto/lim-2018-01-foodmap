
$(document).ready(() => {
    initMap();  
  });


  let map;
  let infowindow;
 
  const initMap = () => {
  // Creamos un mapa con las coordenadas actuales
    navigator.geolocation.getCurrentPosition((pos) => {
 
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
 
    let myLatlng = new google.maps.LatLng(lat, lon);
 
    let mapOptions = {
      center: myLatlng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("map"),  mapOptions);
 
    // Creamos el infowindow
    infowindow = new google.maps.InfoWindow();
 
    // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
    let request = {
      location: myLatlng,
      radius: 3000,
      types: ['restaurant']
    };
 
    // Creamos el servicio PlaceService y enviamos la petición.
    let service = new google.maps.places.PlacesService(map);
 
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
      }
    });
  });
 }
 
  const createMarker = (place) => {
    // Creamos un marcador
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
 
  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  }


  


