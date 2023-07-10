import { Component, OnInit } from '@angular/core';
import {  NgForm, RequiredValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from '../../_service/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit{
  myForm ! : FormGroup ;

constructor(private router: Router,
  private userService : UserServiceService
  ){}
  ngOnInit(): void {
  
    this.myForm = new FormGroup({
      name: new FormControl(['']),
      userName: new FormControl(['']),
      email: new FormControl(['']),
      password:new FormControl([''])
    });
  }

  submitForm() {
    console.log( this.myForm.value)
    this.userService.signUp(this.myForm.value).subscribe((res)=>{
      if(res!=null){
        this.router.navigate(['/login'])
      }
    })
  }

//    submit(d: NgForm) {

//     d.value.card=[]
// console.log(d)
   
//   }

}
