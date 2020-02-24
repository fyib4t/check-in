import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  latitude= 13.968165100000002;
  longitude= 100.5990321;
  // latitude: number;
  // longitude: number;;
  map: google.maps.Map;
  coordinates = new google.maps.LatLng(this.latitude, this.longitude);
  constructor() { }

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    mapTypeId: 'terrain',
    zoom: 15
   };

   marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map
  });

  circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    radius: 100,
    center: this.coordinates,
    map: this.map
 })

 ngAfterViewInit(){
    let position = this.setCurrentLocation();
    this.mapInitializer();
    console.log(position)
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
  }

 setCurrentLocation(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) =>{
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        console.log(position)
        return position
      })
    }else{
      return console.log("5555555555555555")
    }
  }

  

}
