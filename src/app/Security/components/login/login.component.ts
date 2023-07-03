import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login ={
userName:"",
password:""

  }

constructor(  private userAuthService: UserServiceService ){}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  formSubmit(loginForm: NgForm) {
     console.log(loginForm.value);
     
   this.login.userName= loginForm.value.userName
   this.login.password= loginForm.value.password

    this.userAuthService.login(this.login  ).subscribe((res:any)=>{
      console.log(res)
    })

  
  }


}
