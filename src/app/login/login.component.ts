import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/User/user.service';
import { UserAuthService } from '../services/userAuth/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  erreur=0;

  constructor( private userservice:UserService, private  router:Router,private userAuthService:UserAuthService) { }

  ngOnInit() {}


  login(loginForm: NgForm) {
    this.userservice.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/acceuil']);
        }
      },
      (erreur) => {
        this.erreur=1;
      }
    );
  }

}
