import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserAuthService } from 'src/app/Security/_service/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  email: string = "";
  name: string = "";


  @Output()
  private _toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  
  public get toggleSideBarForMe(): EventEmitter<any> {
    return this._toggleSideBarForMe;
  }
  public set toggleSideBarForMe(value: EventEmitter<any>) {
    this._toggleSideBarForMe = value;
  }

  constructor( private userAuthService : UserAuthService,
    private router:Router) { }

  ngOnInit(): void {
    this. userData();
  }


  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }

  logout (){ this.userAuthService.clear();
    this.router.navigate(['/userHome']);}


    userData() {
      if (localStorage.getItem('user')) {
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.name = userData.name;
        this.email= userData.email
        
       // this.cartService.getCartList(userData.id);
      }
      
    }
}
