import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/Client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  public ministeres = ["Ministère de l'intérieur", "Ministère des finances", "Ministère de l’Industrie, des Mines et de l’Energie", "Ministère du Commerce et du Développement des Exportations"
    , "Ministère de la santé", "Ministère de l’Agriculture, des Ressources Hydrauliques et de la Pêche Maritime", "Ministère de l'éducation", "Ministère de l'enseignement supérieur et de la recherche scientifique"
    , "Ministère de la Jeunesse et des Sports", "Ministère des Technologies de la Communication", "Ministère des Transports", "Ministère de l'Environnement", "Ministère du tourisme",
    "Ministère de l'Emploi et de la Formation professionnelle"];

  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  clients: Client[];
  page: number = 1;
  nom: any;
  form: FormGroup;
  prenom: string
  filteredClients: Client[] = [];
  bool=true;
  newDeb:any;
  constructor(private clientService: ClientService, private router: Router, private ref: ChangeDetectorRef, private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.getClients();
  }

 

  ngOnChanges(): void {
    if (this.groupFilters) {
      this.filterClientList(this.groupFilters, this.clients);
    }
  }

  //filter table
  filterClientList(filters: any, clients: any): void {
    this.filteredClients = this.clients;     //Reset Client List
    const keys = Object.keys(filters);
    const filterClient = client => keys.every(key => client[key] === filters[key]);
    this.filteredClients = this.clients.filter(filterClient);
    this.ref.detectChanges();
  }


//effacer le filtrage
  public removeFilter() {
    this.filteredClients = [...this.clients];
    this.nom = ' ';
    this.prenom = '';

  }


  // Crud ------------------------------------


  //afficher tous les clients
  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.clients = res;
      console.log(res);
    })
    this.filteredClients = this.filteredClients.length > 0 ? this.filteredClients : this.clients;
  }


  // afficher un client par id
  getClientByIdC(idC: number): Client {
    clients: this.getClients()
    return this.clients.find(client => client.idC == idC)

  }

//supprimer un client
  public deleteClient(client: any) {
    Swal.fire({
      title: 'Vous etes sur !?',
      text: 'Etes-vous sûr(e) de vouloir supprimer le client',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {

      if (result.isConfirmed) {


        this.clientService.deleteClient(client.idC).subscribe(
          (resp) => {
            console.log(resp);
            this.getClients();
          },
          (err) => {
            console.log(err);
          }
        );
        window.location.reload();

      } else if (result.isDismissed) {

        this.router.navigate(['/gestionclients'])


      }
    })

  }

  // details du client
  clientDetails(idC: number) {
    this.router.navigate(['details', idC]);
  }

 // edit client par id
  edit(idC: number) {
    this.router.navigate(['update-client', idC]);
  }

  // vers la page d'ajout
  toAdd() {
    this.router.navigate(['/add']);
  }


  key = 'code_client';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse

  }
 
}
