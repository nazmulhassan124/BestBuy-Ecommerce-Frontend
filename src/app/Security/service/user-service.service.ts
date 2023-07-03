import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/Model/login.model';


// const headerOption = {
//   headers: new HttpHeaders({
//     'content-type': 'application/json'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  PATH_OF_API = 'http://localhost:8080/api/auth';


  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(  private httpclient: HttpClient,) { }

  public login(loginForm :Login ) {
    return this.httpclient.post(this.PATH_OF_API + '/login', loginForm, {
      headers: this.requestHeader,
    });
  }

}
