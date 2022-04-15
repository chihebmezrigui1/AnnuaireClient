import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/Client/client.service';

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
  nom:string;
  form: FormGroup;
  prenom:string
  filteredClients: any[] = [];

  constructor(private clientService: ClientService, private router: Router,private ref: ChangeDetectorRef,private fb:FormBuilder) {
  }


  ngOnInit(): void {
    this.getClients();
  }

  ngOnChanges(): void {
    if (this.groupFilters) this.filterClientList(this.groupFilters, this.clients);
  }
  filterClientList(filters: any, clients: any): void {
    this.filteredClients = this.clients;     //Reset Client List
    const keys = Object.keys(filters);
    const filterClient = client => keys.every(key => client[key] === filters[key]);
    this.filteredClients = this.clients.filter(filterClient);
    this.ref.detectChanges();
  }
  
  loadUsers(): void {
    this.clientService.getClients().subscribe(clients => this.clients = clients);
  }

  public removeFilter() {
    this.filteredClients = [...this.clients];
  }


     // Crud ------------------------------------
  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.clients=res;
      console.log(res);    
    })
    this.filteredClients = this.filteredClients.length > 0 ? this.filteredClients : this.clients;                
  }


  getClientByIdC(idC: number): Client {
    clients: this.getClients()
    return this.clients.find(client => client.idC == idC)

  }
  public deleteClient(client: any) {
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
      this.router.navigate(['/clients'])
  .then(() => {
    window.location.reload();
  });
  }

  clientDetails(idC: number) {
    this.router.navigate(['details', idC]);
  }

  edit(idC: number) {
    this.router.navigate(['update-client', idC]);
  }
  toAdd() {
    this.router.navigate(['/add']);
  }

  //-----------------------------------------------------------------------
}
