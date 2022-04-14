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

  clients: Client[];
  nomS: any;
  prenomS:any;
  structureS:any;
  page: number = 1;
  keywordNom='nom';
  keywordPrenom='prenom';
  data:any;
  keyword='nom';
  clientsCopy=[]
  clientsFilter=[]
  selected:string
  select:any

  constructor(private clientService: ClientService, private router: Router) {
  }


  ngOnInit(): void {
   return  this.getClients();

  }

  onSelect() {
    this.clientsCopy = this.clients.filter((x) => (x.structure.ministere.libelle ) == this.selected );
        console.log(this.selected);
        console.log(this.clientsCopy);
  }

  removeFilter() {
    this.selected = '';
    this.clientsCopy = [...this.clients];
  }



  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.clients=res;
      console.log(res);    
    })
  }


  getClientByIdC(idC: number): Client {
    clients: this.getClients()
    return this.clients.find(client => client.idC == idC)

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

  clientDetails(idC: number) {
    this.router.navigate(['details', idC]);
  }

  edit(idC: number) {
    this.router.navigate(['update-client', idC]);
  }

  rech(){
    return this.getClients();
  }

  toAdd() {
    this.router.navigate(['/add']);
  }
}
