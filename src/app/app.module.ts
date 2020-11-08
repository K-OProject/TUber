import { BrowserModule } from '@angular/platform-browser';
import { CarsTypeComponent } from './cars-type/cars-type.component';
import { ResetComponentComponent } from './reset-component/reset-component.component';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { googleMapsAPIKey } from '../../api/googleMapsAPI';
import { AutocompleteGoogleDocComponent } from './autocomplete-google-doc/autocomplete-google-doc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //import this in the app module !!!important
import { apiKey, authDomain, projectId, storageBucket } from '../firebase';
import { JwtModule } from '@auth0/angular-jwt';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'requestRide', component: AutocompleteGoogleDocComponent },
  { path: 'rideSummary', component: CarsTypeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponentComponent,
    CarsTypeComponent,
    AutocompleteGoogleDocComponent,
  ],
  imports: [
    AngularFireModule.initializeApp({
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      JwtModule.forRoot({config:{tokenGetter:()=>localStorage.getItem('token')}})
    }),
    AngularFireStorageModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: googleMapsAPIKey,
      libraries: ['places'],
    }),
    AgmDirectionModule,
  ],
  exports: [RouterModule],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent],
})
export class AppModule {}
