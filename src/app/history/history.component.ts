import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_service';
import { Router } from '@angular/router';
import { HistoryService } from '../_service/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  items =[];
  histList: [];
  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    private histService: HistoryService) { }

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
            routerLink: "/checkpoint"},
            // {label:'Edited'},
          ]
        },
        {label: 'Check Point',
        items:[
          {label:'Add New Check Point',
          routerLink: "/centerpoint"},
          // {label:'Edited'},
        ]
      }
      ]
      },
      {separator:true},
      // {
      //   label: 'Users',
      //   items:[
      //     {label: 'Add Users',
      //     routerLink: "/add-user"
      //   },
      //     {label: 'Edited',
      //     routerLink: "/edited"}
      //   ]
      // },
      // {separator:true},
      {
        label: 'History',
        // routerLink: "/history"
        items:[
          {label: 'Check-In by Users',
           routerLink: "/history"},
          {label: 'Check-In by Guest',
           routerLink: "/hist_checkin"}
        ]
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
