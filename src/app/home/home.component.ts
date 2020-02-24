import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CarServiceService } from '../_service/car-service.service';
// import { Car} from 'src/app/_model/car'
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { MapComponent } from '../map/map.component';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items=[];
  usersList=[];
  constructor(private router: ActivatedRoute,private service: UserService,private _auth: AuthenticationService,
    private _router: Router) { 
  // constructor(private carService: CarServiceService) { 
 }

  ngOnInit() {

    this.loadAllUsers();
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
            {label:'Edited'},
          ]
        },
        {label: 'Check Point',
        items:[
          {label:'Add New Check Point',
          routerLink: "/centerpoint"},
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
 
    // this.carService.getCarsSmall().then(cars => this.cars = cars);
  }

  private loadAllUsers() {
    this.service.getAll().subscribe(data =>{
        this.usersList = data;
        console.log(this.usersList);
        // console.log(this._auth.getToken);
        });
}

logout(){
  this._auth.logout();
  this._router.navigate(['/login']);
}

}
