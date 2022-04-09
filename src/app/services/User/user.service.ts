import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthService } from '../userAuth/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpclient:HttpClient,private userAuthService:UserAuthService) { }
  public login(loginData:any){
    return this.httpclient.post(`${environment.baseUrl}/authenticate`,loginData,{headers:this.requestHeader})
  }

public roleMatch(allowedRoles):boolean{
  let isMatch:boolean=false;
  const userRoles : any=this.userAuthService.getRoles();
  if(userRoles !=null && userRoles){
    for(let i=0;i<userRoles.length;i++){
      for(let j=0;j<allowedRoles.length;j++){
        if(userRoles[i].roleName==allowedRoles[j]){
          isMatch=true;
          return isMatch;
        }else{
          return isMatch
        }
      }
    }
  }
}
}
