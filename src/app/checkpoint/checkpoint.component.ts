import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthenticationService } from '../_service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-checkpoint',
  templateUrl: './checkpoint.component.html',
  styleUrls: ['./checkpoint.component.css']
})
export class CheckpointComponent implements OnInit {

  constructor(private _auth: AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
    
  }

  logout(){
    this._auth.logout();
    this._router.navigate(['/login']);
  }
}
