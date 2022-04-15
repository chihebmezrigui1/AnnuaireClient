import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Client } from 'src/app/models/Client';
import { Structure } from 'src/app/models/Structure';
import { ClientService } from 'src/app/services/Client/client.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filteredClients: any[] = [];
  form: FormGroup;
  clients:Client[]
  client:Client;
  
  ministeres = ["Ministère de l'intérieur", "Ministère des finances", "Ministère de l’Industrie, des Mines et de l’Energie", "Ministère du Commerce et du Développement des Exportations"
  , "Ministère de la santé", "Ministère de l’Agriculture, des Ressources Hydrauliques et de la Pêche Maritime", "Ministère de l'éducation", "Ministère de l'enseignement supérieur et de la recherche scientifique"
  , "Ministère de la Jeunesse et des Sports", "Ministère des Technologies de la Communication", "Ministère des Transports", "Ministère de l'Environnement", "Ministère du tourisme",
  "Ministère de l'Emploi et de la Formation professionnelle"];

  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any>  = new EventEmitter<any>();
  
  constructor(private fb: FormBuilder,private clientService:ClientService) { }

  ngOnInit(): void {
    this.buildForm()
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      email:new FormControl(''),
      structure: new FormControl(''),
    });
  }
  
  search(filters: Client): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key.toLowerCase);
    this.groupFilters.emit(filters);    
  }
  removeFilter() {
    this.filteredClients = [...this.clients];
  }
}
