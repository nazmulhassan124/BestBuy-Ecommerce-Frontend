import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Model/category.model';
import { UserAuthService } from 'src/app/Security/_service/user-auth.service';
import { UserServiceService } from 'src/app/Security/_service/user-service.service';
import { HomeService } from 'src/app/service/homeService/home.service';


@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit{



  test: boolean = false;
  email: string = "";
  name: string = "";

  allCategory !: Category [];

constructor( private userAuthService : UserAuthService,
  private router : Router,
  public userService : UserServiceService,
  public homeService : HomeService){}

  ngOnInit(): void {
    
    // console.log("roles :" +this.userAuthService.getRoles())
    this.userData();

    this.homeService.getAllCategory().subscribe((data: Category[])=>{
      this.allCategory=data;
     });
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


userData() {
  if (localStorage.getItem('user')) {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.name = userData.name;
    this.email= userData.email
    this.test = true;
   // this.cartService.getCartList(userData.id);
  }
  
}

}
