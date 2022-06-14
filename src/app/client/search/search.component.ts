import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Client } from 'src/app/models/Client';
import { Ministere } from 'src/app/models/Ministere';
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
  public nom: string;
  public prenom: string;
  public structure: Structure;
  public ministere: Ministere;
  
  ministeres = ["Ministère de l'intérieur", "Ministère des finances", "Ministère de l’Industrie, des Mines et de l’Energie", "Ministère du Commerce et du Développement des Exportations"
  , "Ministère de la santé", "Ministère de l’Agriculture, des Ressources Hydrauliques et de la Pêche Maritime", "Ministère de l'éducation", "Ministère de l'enseignement supérieur et de la recherche scientifique"
  , "Ministère de la Jeunesse et des Sports", "Ministère des Technologies de la Communication", "Ministère des Transports", "Ministère de l'Environnement", "Ministère du tourisme",
  "Ministère de l'Emploi et de la Formation professionnelle"];

  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any>  = new EventEmitter<any>();


  
  constructor(private fb: FormBuilder,private clientService:ClientService) { }

  ngOnInit(): void {
    this.getClients();
    this.buildForm()
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      structure :new FormControl(''),
      ministere:new FormControl('')
    });
  }

  //datalist ..........

  public saveNom(e): void {
    let find = this.clients.find(x => x?.nom == e.target.value);
    console.log(find?.idC);
  }
  public savePrenom(e): void {
    let find = this.clients.find(x => x?.prenom === e.target.value);
    console.log(find?.idC);
  }
  public saveStructure(e): void {
    let find = this.clients.find(x => x?.structure.libelle === e.target.value);
    console.log(find?.idC);
  }
  public saveMinistere(e): void {
    let find = this.clients.find(x => x?.structure.ministere.libelle === e.target.value);
    console.log(find?.idC);
  }

  //affichage des clients
public getClients() {
    this.clientService.getClients().subscribe((res) => {
    this.clients=res;
    console.log(res);
    })
  }

//button search
search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key.toLocaleLowerCase);
    this.groupFilters.emit(filters); 
    console.log(filters);
      

  }



}
