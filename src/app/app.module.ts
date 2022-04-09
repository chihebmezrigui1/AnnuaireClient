import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { AddComponent } from './client/add/add.component';
import { ListClientsComponent } from './client/list-clients/list-clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from './services/userAuth/user-auth.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './guard/auth.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AddComponent,
    ListClientsComponent,
    DashboardComponent,
    ForbiddenComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ClientDetailsComponent,
    UpdateClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
  ],
  providers: [
    UserAuthService,
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
