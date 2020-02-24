import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { HistoryService } from '../_service/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  items =[];
  histList: [];
  constructor(private router: ActivatedRoute,private service: UserService,private _auth: AuthenticationService,
    private _router: Router,private histService: HistoryService) { }

  ngOnInit(){
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
    ];
  }

  private loadAllHistory(){
    this.histService.getAll().subscribe(data =>{
      this.histList = data;
      console.log(this.histList);
    });
  }

  logout(){
    this._auth.logout();
    this._router.navigate(['/login']);
  }

}
