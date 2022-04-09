import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  ministeres = ["Ministère de l'intérieur", "Ministère des finances", "Ministère de l’Industrie, des Mines et de l’Energie", "Ministère du Commerce et du Développement des Exportations"
    , "Ministère de la santé", "Ministère de l’Agriculture, des Ressources Hydrauliques et de la Pêche Maritime", "Ministère de l'éducation", "Ministère de l'enseignement supérieur et de la recherche scientifique"
    , "Ministère de la Jeunesse et des Sports", "Ministère des Technologies de la Communication", "Ministère des Transports", "Ministère de l'Environnement", "Ministère du tourisme",
    "Ministère de l'Emploi et de la Formation professionnelle"];

  clients: Client[] ;


  nom: any;
  page: number = 1;
  key: string = 'nom';
  reserve: boolean = false;

  constructor(private clientService: ClientService, private router: Router) {
  }


  ngOnInit(): void {
    return this.getClients();
  }



  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.clients = res;
    })
  }

  getClientByIdC(idC:number):Client{
    clients:this.getClients()
    return this.clients.find(client=>client.idC==idC)

  }

  deleteClient(client: any) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)

      this.clientService.deleteClient(client.idC).subscribe(
        (resp) => {
          console.log(resp);
          this.getClients();
        },
        (err) => {
          console.log(err);
        }
      );
  }


  Search() {
    if (this.nom == '') {
      this.ngOnInit()
    } else {
      this.clients = this.clients.filter(res => {
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase())
      })
    }
  }
  sort(key: any) {
    this.key = key;
    this.reserve = !this.reserve
  }

  toAdd() {
    this.router.navigate(['/add']);
  }
}
