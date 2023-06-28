import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-manue',
  templateUrl: './admin-manue.component.html',
  styleUrls: ['./admin-manue.component.css']
})
export class AdminManueComponent implements OnInit{
 
  ngOnInit(): void {  }

  sidebaropen = true; 

  sideBarToggler(){
    this.sidebaropen = !this.sidebaropen;
  }

}
