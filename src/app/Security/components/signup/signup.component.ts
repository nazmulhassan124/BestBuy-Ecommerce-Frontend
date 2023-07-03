import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

constructor(private router: Router){}

   submit(d: NgForm) {

    d.value.card=[]
console.log(d)
   
  }

}
