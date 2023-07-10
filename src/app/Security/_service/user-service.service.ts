import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/Model/login.model';
import { UserAuthService } from './user-auth.service';
import { SignUp } from 'src/app/Model/signup.model';


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
  PATH_OF_API2 = 'http://localhost:8080';


  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(  private httpclient: HttpClient,
    private userAuthService : UserAuthService) { }

  public login(loginForm :Login ) {
    return this.httpclient.post(this.PATH_OF_API + '/login', loginForm, {
      headers: this.requestHeader,
    });
  }

  public signUp (signup: SignUp){
    return this.httpclient.post(this.PATH_OF_API2 + '/signup', signup, {
      headers: this.requestHeader,
    });
  }


  public roleMatch(allowedRoles: any ): boolean {
    let isMatch = false;
    const userRoles  : any = this.userAuthService.getRole();
    // console.log("get roles : "+userRoles.values);

    if (userRoles != null && userRoles) {
      
          if (userRoles=== allowedRoles) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        
      
    }
    return isMatch;
  }

}
