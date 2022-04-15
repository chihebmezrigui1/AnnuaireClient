import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Structure } from 'src/app/models/Structure';
import { ClientService } from 'src/app/services/Client/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  idC: number;
  client: Client;
  libelle:Structure[]
  constructor(private route:ActivatedRoute,private clientService:ClientService,private router:Router) { }

  ngOnInit(): void {
    this.client = new Client();

    this.idC = this.route.snapshot.params['idC'];
    
    this.clientService.getClientById(this.idC)
      .subscribe(data => {
        console.log(data)
        this.client = data;
      }, error => console.log(error));
  }
  list(){
    this.router.navigate(['listclients']);
  }
  

}
