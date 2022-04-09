import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/User/user.service';
import { UserAuthService } from '../services/userAuth/user-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public userauthService:UserAuthService,public userService:UserService) { }

  ngOnInit(): void {
  }
  public isLoggedIn(){
    return this.userauthService.isLoggedIn();
  }
  public logout(){
    return this.userauthService.clear()
  }

}
