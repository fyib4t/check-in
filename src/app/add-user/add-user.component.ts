import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService, AuthenticationService } from 'src/app/_service';

@Component({
  // selector: 'app-add-user',
  // templateUrl: './add-user.component.html',
  // styleUrls: ['./add-user.component.css']
   templateUrl: 'add-user.component.html' 
})
export class AddUserComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  items =[];

  constructor(
    private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private _auth: AuthenticationService,
        private _router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
  get f() { return this.registerForm.controls; }
  onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log(this.registerForm);

    this.loading = true;
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Add User Successful', true);
                this.router.navigate(['/home']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });

  }
  logout(){
    this._auth.logout();
    this._router.navigate(['/login']);
  }

}
