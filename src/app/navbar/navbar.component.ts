import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/User/user.service';
import { UserAuthService } from '../services/userAuth/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userauthService:UserAuthService,public userService:UserService) { }
  
  ngOnInit(): void {
  }

  public isLoggedIn(){
    return this.userauthService.isLoggedIn();
  }
  public logout(){
    this.userauthService.clear();
  }

}
