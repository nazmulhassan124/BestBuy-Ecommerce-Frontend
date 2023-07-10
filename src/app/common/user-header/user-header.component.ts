import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Security/_service/user-auth.service';
import { UserServiceService } from 'src/app/Security/_service/user-service.service';


@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit{

constructor( private userAuthService : UserAuthService,
  private router : Router,
  public userService : UserServiceService){}

  ngOnInit(): void {
    
    // console.log("roles :" +this.userAuthService.getRoles())
  }

  logout (){ this.userAuthService.clear()
  this.router.navigate(['/userHome'])
  }

 

  public isLoggedIn() :boolean {
    // console.log(" is login : " +  this.userAuthService.isLoggedIn())
    return this.userAuthService.isLoggedIn();
  }

roleVarify ( role : any ){
 return this.userService.roleMatch(role);
}

}
