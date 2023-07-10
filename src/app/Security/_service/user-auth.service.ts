import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  roles :string [] =[];
  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

public setRole(role : string){
localStorage.setItem('role',role);
}


public getRole(): any {
   let rr ! :string;
   
  return localStorage.getItem('role') ;
 }

  public getRoles(): string[]{
  // console.log(localStorage.getItem("roles"));
   const arrayString =localStorage.getItem("roles");
   if (arrayString) {
    this.roles=JSON.parse(arrayString);

    return this.roles;
  }
  return [];
    //  return JSON.parse(localStorage.getItem("roles") || '{}');   // if return null
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
   
   return localStorage.getItem('jwtToken') || '';
  }

  public clear() {
    localStorage.clear();
  }

  public  isLoggedIn () : boolean{
    if( this.getRoles() && this.getToken()){
      return true;

    }
    return false
  }

}
