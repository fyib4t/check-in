import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, UserService, AuthenticationService } from 'src/app/_service';
import { CheckinService } from '../_service/checkin.service';
import { MapService } from 'src/app/_service/map.service'
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './checkin.component.html',
})
export class CheckinComponent implements AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  checkinForm: FormGroup;
  d = new Date();
  latitude: number;
  longitude: number;
  map: google.maps.Map;
  coordinates: google.maps.LatLng;
  geoCoder: google.maps.Geocoder;
  marker: google.maps.Marker;
  mapOptions: google.maps.MapOptions;
  ctpList: any;
  checkInData: any;
  fullName: string;
  email: string;
  gender: string;
  loading = false;
  submitted = false;
  url;
  json;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private checkinServeice: CheckinService,
    private mapservice: MapService,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {
    this.url = `http://localhost:9879/v1/users/checkin`;
    this.setCurrentLocation();
    this.getcenterpoint();
    this.arePointsNear();
  }

  get f() { return this.checkinForm.controls; }

  // mapInitializer(latitude, longitude) {
  //   // this.coordinates = new google.maps.LatLng(latitude, longitude);

  //   // this.mapOptions = {
  //   //   center: this.coordinates,
  //   //   zoom: 15,
  //   // };

  //   // this.marker = new google.maps.Marker({
  //   //   position: this.coordinates,
  //   //   map: this.map,
  //   //   draggable: true,
  //   //   animation: google.maps.Animation.DROP
  //   // });

  //   // this.map = new google.maps.Map(this.gmap.nativeElement, 
  //   // this.mapOptions);
  //   // this.marker.setMap(this.map);
  // }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('Lat: ' + this.latitude + 'Lat: ' + this.longitude);
      })
    }

  }

  getcenterpoint() {
    this.mapservice.getcenterpoint().subscribe(date => {
      this.ctpList = date; //get value
      console.log(this.ctpList);
    });
  }

  arePointsNear() {
    //  var ky = 40000 / 360;
    //   var kx = Math.cos(Math.PI * _centerPoint.latitude / 180.0) * ky;
    //   var dx = (Math.abs(_centerPoint.longitude - _currentPosition.longitude)) * kx;
    //   var dy = (Math.abs(_centerPoint.latitude - _currentPosition.latitude)) * ky;
    //   return Math.sqrt(dx * dx + dy * dy);
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * 13.9680671 / 180.0) * ky;
    var dx = (Math.abs(100.598945 - 100.6019444)) * kx;
    var dy = (Math.abs(13.9680671 - 14.0238088)) * ky;
    var sol = Math.sqrt(dx * dx + dy * dy);
    console.log('This is value: ' + Math.sqrt(dx * dx + dy * dy))

    if (sol <= 0.5) {
      return true;
      console.log('true');
    } else {
      return false;
      console.log('false');
    }
  }

  saveCheckIn() {
    this.checkInData = {
      "full_name": this.fullName,
      "gender": this.gender,
      "email": this.email,
      "status": true,
      "lat": this.latitude,
      "lng": this.longitude,
      "created_on": this.d
    }
    this.submitted = true;
    this.loading = true;
    console.log(this.d);
    this.http.post(this.url,this.checkInData).toPromise().then((data:any) =>{
      console.log(data);
      this.router.navigate(['/check-in-home']);
    })
    console.log(this.checkInData);
  }

}
