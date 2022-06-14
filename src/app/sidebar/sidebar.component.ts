import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/userAuth/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userauthService:UserAuthService) { }

  ngOnInit(): void {
  }
  public logout(){
    this.userauthService.clear();
  }
  public isLoggedIn(){
    return this.userauthService.isLoggedIn();
  }
}
