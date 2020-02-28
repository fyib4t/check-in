import { Component, OnInit,ViewChild,AfterViewInit,ElementRef } from '@angular/core';
import { AuthenticationService } from '../_service';
import { Router } from '@angular/router';
import { HistoryService } from '../_service/history.service';
@Component({
  selector: 'app-hist-checkin',
  templateUrl: './hist-checkin.component.html',
  styleUrls: ['./hist-checkin.component.css']
})
export class HistCheckinComponent implements AfterViewInit {
  
  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    private histService: HistoryService
  ) { }

  items =[];
  histList: any;
  map: google.maps.Map;
  lat = 13.9887;
  lng = 100.6177;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  marker;
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    mapTypeId: 'terrain',
    zoom: 10
  };


  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  
  ngAfterViewInit(){
    this.mapInitializer();
    this.loadAllHistory();
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
            // {label:'Edited'},
          ]
        },
        {label: 'Check Point',
        items:[
          {label:'Add New Check Point',
          routerLink: "/centerpoint"}
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
    ];
  }

  mapInitializer(){
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
  }

  private loadAllHistory(){
    this.histService.getAllHistroyGuest().subscribe(data =>{
      this.histList = data;
      // console.log(this.histList);

      for(var hts in this.histList){
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.histList[hts].lat, this.histList[hts].lng),
          map: this.map,
          icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 5,
                  fillColor: "#FF1493",
                  fillOpacity: 0.4,
                  strokeWeight: 0.4
                },
          title: this.histList[hts].full_name
        });

        const infoWindow = new google.maps.InfoWindow({
          content: marker.getTitle()
        });
        marker.addListener("click", () => {
          infoWindow.open(this.map, marker);
        });
      }
    });
  }

  logout(){
    this._auth.logout();
    this._router.navigate(['/login']);
  }
}
