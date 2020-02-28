import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from 'src/app/_service';
import { CenterpointService } from '../_service/centerpoint.service';

@Component({
  selector: 'app-centerpoint',
  templateUrl: './centerpoint.component.html',
  styleUrls: ['./centerpoint.component.css']
})
export class CenterpointComponent implements OnInit {
  centerPointForm: FormGroup;
  loading = false;
  submitted = false;
  items = [];
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private centerpointService: CenterpointService) { }

  ngOnInit(){
    this.centerPointForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      ctp_id: ['', Validators.required]
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
      items:[
        {label: 'Check-In by Users',
         routerLink: "/history"},
        {label: 'Check-In by Guest',
         routerLink: "/hist_checkin"}
      ]
    }
  ]
}
 // convenience getter for easy access to form fields
 get f() { return this.centerPointForm.controls; }

 onSubmit(){
  this.submitted = true;

  // reset alerts on submit
  this.alertService.clear();

  // stop here if form is invalid
  if (this.centerPointForm.invalid) {
      return;
  }

  console.log(this.centerPointForm);

  this.loading = true;
  this.centerpointService.addcenterpoint(this.centerPointForm.value)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Add CenterPoint successful', true);
              this.router.navigate(['/home']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
 }

 logout(){
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

}
