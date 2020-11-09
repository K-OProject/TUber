import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/users/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //declare the observable
  constructor(private http: HttpClient) {}

  createLogin(data): Observable<any> {
    return this.http.post(baseUrl + 'login', data);
  }

  /*  loggedInStatusChange(loginStatus): Observable<boolean> {
    return !loginStatus;
  } */
  createRegister(data): Observable<any> {
    let obj = {
      address: data.address,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phoneNumber: data.phoneNumber,
      imgUrl: data.imgUrl,
    };
    console.log(obj);
    console.log(baseUrl + 'register');
    return this.http.post(baseUrl + 'register', data);
  }

  sendEmail(data): Observable<any> {
    return this.http.post(baseUrl + 'send', data);
  }

  //function of the observable
}
