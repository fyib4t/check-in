import { Component, AfterViewInit, OnInit,ViewChild, ElementRef, NgZone } from '@angular/core';
import { AuthenticationService } from '../_service';
import { MapService } from '../_service/map.service';
import {  Router, RouterLink } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkpoint',
  templateUrl: './checkpoint.component.html',
  styleUrls: ['./checkpoint.component.css']
})
export class CheckpointComponent implements AfterViewInit {
  items =[];
  name: string;
  latitude: number;
  longitude: number;
  radiuse: number;
  text: any;
  ctpList = [];
  address: string;
  zoom:number;
  geoCoder: google.maps.Geocoder;
  map: google.maps.Map;
  marker: google.maps.Marker;
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  centerpoint: any;
  loading = false;
  submitted = false;
  centerpointForm: FormGroup
  url;
  json;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  constructor(private _auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private _router: Router,  
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private mapService: MapService,
    private http: HttpClient
    ) { }

     ngAfterViewInit() {

      // this.centerpointForm = this.formBuilder.group({
      //   ctp_name: ['', Validators.required],
      //   ctp_address: ['', Validators.required],
      //   ctp_lat: ['', Validators.required],
      //   ctp_lng: ['', Validators.required],
      //   radius: ['', Validators.required],
      // });

      // this.centerpoint = {
      //   "ctp_name": "Rangsit Planetarium",
      //   "ctp_address": "Khlong Hok, Khlong Luang District, Pathum Thani 12120",
      //   "ctp_lat": "14.0298",
      //   "ctp_lng": "100.7227",
      //   "radius": 500
      // }
      this.url = `http://localhost:9879/v1/users/add-centerpoint`;
      this.json;

      console.log(this.centerpoint);

        this.loadAllCenterpoint();

        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          this.setCurrentLocation();
          this.geoCoder = new google.maps.Geocoder;
    
          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            types: ["address"]
          });

          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }
    
              //set latitude, longitude and zoom
              this.latitude = place.geometry.location.lat();
              this.longitude = place.geometry.location.lng();
              this.zoom = 12;
            });
          });
        });

    this.items = [
      {
        label: 'Home',
        routerLink: "/home"
      },
      {separator:true},
      {
        label: 'Map',
        items:[{
          label: 'Map View',
          routerLink: '/map'
        },
        {
          label: 'Center Point',
          items:[
            {label:'Add New Center Point',
            routerLink: "/checkpoint"},
          ]
        },
        {label: 'Check Point',
        items:[
          {label:'Add New Check Point',
          routerLink: "/centerpoint"},
        ]
      }
      ]
      },
      {separator:true},
      {
        label: 'History',
        items:[
          {label: 'Check-In by Users',
           routerLink: "/history"},
          {label: 'Check-In by Guest',
           routerLink: "/hist_checkin"}
        ]
      }
    ]
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.zoom = 20;
        this.getAddress(this.latitude, this.longitude);
        this.mapInitializer(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd(event) {
    this.latitude = event.latLng.lat();
    this.longitude = event.latLng.lng();
    console.log('Lat:' + this.latitude, 'Lng: ' + this.longitude)
    this.getAddress(this.latitude, this.longitude);
  }

   getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  getLatLng(latitude, longitude){
    this.latitude = latitude;
    this.longitude = longitude
  }

  mapInitializer(latitude, longitude) {
    this.coordinates = new google.maps.LatLng(latitude, longitude);

    this.mapOptions = {
      center: this.coordinates,
      zoom: 15,
    };

     this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.getAddress(this.marker.getPosition().lat(),this.marker.getPosition().lng());
      this.getLatLng(this.marker.getPosition().lat(),this.marker.getPosition().lng());
  });

    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
  }
  
  saveCenterpoint(){

    this.centerpoint = {
      "ctp_name": this.text,
      "ctp_address": this.address,
      "ctp_lat": this.latitude,
      "ctp_lng": this.longitude,
      "radius": this.radiuse
    }
    // console.log("Lat  "+ this.latitude +"Lnt  "+ this.longitude + "Add  " + this.address);
    console.log(this.centerpoint);
    this.submitted = true;
    this.loading = true;
    this.http.post(this.url,this.centerpoint).toPromise().then((data:any) =>{
      console.log(data);
      this._router.navigate(['/map']);
    })

  }
  

  //table
  loadAllCenterpoint(){
    this.mapService.getcenterpoint().subscribe(data =>{
      this.ctpList = data;
      console.log(this.ctpList);
    });
  }

  logout(){
    this._auth.logout();
    this._router.navigate(['/login']);
  }

}
