import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddComponent } from './client/add/add.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { ClientComponent } from './client/client/client.component';
import { ListClientsComponent } from './client/list-clients/list-clients.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/login'},
  {path:'to',component:AppComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'home',component:HomeComponent ,canActivate:[AuthGuard],data:{roles:['User']}},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'login',component:LoginComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'add',component:AddComponent,canActivate:[AuthGuard],data:{roles:['User']}},
  {path:'client/:idC',component:ClientDetailsComponent},
  {path:'update-client/:idC',component:UpdateClientComponent},
  {path: 'details/:idC', component: ClientDetailsComponent },
  {path:'gestionclients',component:ClientComponent,canActivate:[AuthGuard],data:{roles:['User']}},
  {path:'contact',component:ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
