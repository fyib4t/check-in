import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MenubarModule} from 'primeng/menubar';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import {DropdownModule} from 'primeng/dropdown';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CheckpointComponent } from './checkpoint/checkpoint.component';
import { CenterpointComponent } from './centerpoint/centerpoint.component';
import {ContextMenuModule} from 'primeng/contextmenu';
import {InputTextModule} from 'primeng/inputtext';
import { EditedComponent } from './edited/edited.component';
import { ManageComponent } from './manage/manage.component';
import { AddUserComponent } from './add-user/add-user.component';
import { HistoryComponent } from './history/history.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import {GMapModule} from 'primeng/gmap';
import {TableModule} from 'primeng/table';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AlertComponent } from './_components/alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckinComponent } from './checkin/checkin.component';
import { MaptestComponent } from './maptest/maptest.component';
import { TestuiComponent } from './testui/testui.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RadioButtonModule} from 'primeng/radiobutton';
// import {FilterUtils} from 'primeng/api';
// import {
//   MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
//   MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
// } from '@angular/material';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map',      component: MapComponent },
  { path: 'login', component:LoginComponent},
  { path: 'centerpoint', component:CenterpointComponent},
  { path: 'checkpoint', component:CheckpointComponent},
  { path: 'history', component:HistoryComponent},
  { path: 'edited', component:EditedComponent},
  { path: 'add-user', component:AddUserComponent},
  { path: 'manage', component:ManageComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'check-in', component:CheckinComponent},
  { path: 'map2', component:MaptestComponent},
  { path: 'testui', component:TestuiComponent},
  { path: '**', component: LoginComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MapComponent,
    CheckpointComponent,
    CenterpointComponent,
    EditedComponent,
    ManageComponent,
    AddUserComponent,
    HistoryComponent,
    RegisterComponent,
    MaintenanceComponent,
    AlertComponent,
    CheckinComponent,
    MaptestComponent,
    TestuiComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvoWqNfccKEDGSaC28MkJkgL2NXGDw774'}),
    FormsModule,
    BrowserAnimationsModule,
    MenubarModule,
    DropdownModule,
    AppRoutingModule,
    ContextMenuModule,
    InputTextModule,
    HttpClientModule,
    GMapModule,
    TableModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSliderModule,
    MatToolbarModule,
    CardModule,
    ButtonModule,
    RadioButtonModule
  
  ],
  exports: [RouterModule],
  providers: [
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
