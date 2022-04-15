import { Component, OnInit } from '@angular/core';
import { Client } from '../models/Client';
import { ClientService } from '../services/Client/client.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  nom='';
  prenom='';
  email='';
  structure=''
  clients:Client[]
  searchParams={'nom':'','prenom':'','email':''}
;

  constructor(private clientService:ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.clients=res;
      console.log(res);    
    })
  }

  search(){
    let filter = {'nom':  this.nom,
    'prenom': this.prenom, 'email': this.email}
   this.searchParams = filter;

  }
}
