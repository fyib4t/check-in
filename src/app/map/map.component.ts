import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../_service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  constructor(private mapservice: MapService) { }
  ctpList: any;
  items =[];
  title = 'angular-gmap';
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 13.9887;
  lng = 100.6177;
  coordinates = new google.maps.LatLng(this.lat, this.lng);

    // markers = [
    //   {
    //     position: new google.maps.LatLng(13.9878, 100.6751), //รับค่า lalong จาก database
    //     map: this.map,
    //     title: "Marker 1", //รับค่าชื่อสถานที่จาก database
    //     // icon: {
    //     //   path: google.maps.SymbolPath.CIRCLE,
    //     //   scale: 8.5,
    //     //   fillColor: "#F00",
    //     //   fillOpacity: 0.4,
    //     //   strokeWeight: 0.4
    //     // }
    //   },
    //   {
    //     position: new google.maps.LatLng(13.8057, 100.6930),
    //     map: this.map,
    //     title: "Marker 2",
    //     // circle: new google.maps.Circle({
    //     //   strokeColor: '#FF0000',
    //     //   strokeOpacity: 0.8,
    //     //   strokeWeight: 2,
    //     //   fillColor: '#FF0000',
    //     //   fillOpacity: 0.35,
    //     //   map: this.map,
    //     //   radius: 50000*10000000000000
    //     // })
    //   }
    // ];

    mapOptions: google.maps.MapOptions = {
      center: this.coordinates,
      mapTypeId: 'terrain',
      zoom: 11
     };

    //Default Marker
     marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
      title: "Hello World!"
    });

    //Default Circle
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

    ngAfterViewInit() {
      this.getcenterpoint();
      this.mapInitializer();
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
              routerLink: "/centerpoint"},
              {label:'Edited'},
            ]
          },
          {label: 'Check Point',
          items:[
            {label:'Add New Check Point',
            routerLink: "/checkpoint"},
            {label:'Edited'},
          ]
        }
        ]
        },
        {separator:true},
        {
          label: 'Users',
          items:[
            {label: 'Add Users',
            routerLink: "/add-user"
          },
            {label: 'Edited',
            routerLink: "/edited"}
          ]
        },
        {separator:true},
        {
          label: 'History',
          routerLink: "/history"
        }
      ]
    }

    getcenterpoint(){
      this.mapservice.getcenterpoint().subscribe(date =>{
        this.ctpList = date; //get value
        // console.log(this.ctpList);
        for(var ctp in this.ctpList){
          this.ctpList = date;
          // console.log(new google.maps.LatLng(this.ctpList[ctp].ctp_lat,this.ctpList[ctp].ctp_lng));
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.ctpList[ctp].ctp_lat,this.ctpList[ctp].ctp_lng),
            map: this.map,
            title: this.ctpList[ctp].ctp_name
          });
          // marker.setMap(this.map);
        }
      });

    }

    mapInitializer() {
      this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

      //Adding Click event to default marker
      this.marker.addListener("click", () => {
        const infoWindow = new google.maps.InfoWindow({
          content: this.marker.getTitle()
        });
        infoWindow.open(this.marker.getMap(), this.marker);
      });

      //Adding default marker to map
      this.marker.setMap(this.map);
      this.circle.setMap(this.map);

      //Adding other markers
      // console.log(this.ctpList);
      // this.loadAllMarkers();
      // this.loadAllCircle();
    }

    // loadAllCircle(): void{
    //   console.log(this.ctpList);
    //   // for (var ctp in this.ctpList) {
    //   for (var marker in this.markers) {
    //     var circle = new google.maps.Circle({
    //       strokeColor: '#FF0000',
    //       strokeOpacity: 0.8,
    //       strokeWeight: 2,
    //       fillColor: '#FF0000',
    //       fillOpacity: 0.35,
    //       radius: 100,
    //       center: this.markers[marker].position,
    //       // center: new google.maps.LatLng(this.ctpList[ctp].ctp_lat,this.ctpList[ctp].ctp_lng),
    //       map: this.map
    //     })
    //   }
 
    // }

    // loadAllMarkers(): void {
    //   console.log(this.ctpList);
    //   this.markers.forEach(markerInfo => {
    //     //Creating a new marker object
    //     const marker = new google.maps.Marker({
    //       ...markerInfo
    //     });
    //     console.log(marker)
    //     //creating a new info window with markers info
    //     const infoWindow = new google.maps.InfoWindow({
    //       content: marker.getTitle()
    //     });
  
    //     //Add click event to open info window on marker
    //     marker.addListener("click", () => {
    //       infoWindow.open(marker.getMap(), marker);
    //     });
    //     //Adding marker to google map
    //     marker.setMap(this.map);
    //     // circle.setMap(this.map);

    //   });
    // }
}
