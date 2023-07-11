import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../_service/user-service.service';
import { UserAuthService } from '../../_service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';

  login = {
    userName: "",
    password: ""

  }

  constructor(private userService: UserServiceService ,
     private userAuthService: UserAuthService,
     private router: Router
     ) { }


  ngOnInit(): void {
   
  }

  formSubmit(loginForm: NgForm) {
    console.log(loginForm.value);

    this.login.userName = loginForm.value.userName
    this.login.password = loginForm.value.password

    this.userService.login(this.login).subscribe((response:any)=>{
      console.log(response.jwtToken)
      console.log(response.user.role)
      console.log(response.user)
      this.userAuthService.setToken(response.jwtToken);
      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setRole(response.user.role[0].roleName)
      this.userAuthService.setUser( response)
      

      const role = response.user.role[0].roleName;
      if( role=== 'Admin'){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/userHome']);
      }


    },(error)=>{
      console.log(error)
    })
    
  

  }


}
