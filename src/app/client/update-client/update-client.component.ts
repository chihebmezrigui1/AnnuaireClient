import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  public clientToUpdate={
    code_client:'',
    cin:'',
    Matricule_cnrps:'',
    nom:'',
    prenom:'',
    email:'',
    tel:'',
    fix:'',
    mat:'',
    structure:'',
    ministere:''
    }
    idC:number;
    client: Client = new Client();

  selectedValue = null;
  addForm: FormGroup;
  submitted = false;
  ministeres: any =  ["Ministère de l'intérieur", "Ministère des finances", "Ministère de l’Industrie, des Mines et de l’Energie","Ministère du Commerce et du Développement des Exportations"
  ,"Ministère de la santé","Ministère de l’Agriculture, des Ressources Hydrauliques et de la Pêche Maritime","Ministère de l'éducation","Ministère de l'enseignement supérieur et de la recherche scientifique"
  ,"Ministère de la Jeunesse et des Sports","Ministère des Technologies de la Communication","Ministère des Transports","Ministère de l'Environnement","Ministère du tourisme",
  "Ministère de l'Emploi et de la Formation professionnelle"];

  constructor(private clientService:ClientService ,private route :ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.idC = this.route.snapshot.params['idC'];
    this.clientService.getClientById(this.idC).subscribe(data => {
      this.client = data;
    }, error => console.log(error));
  }

 
  onSubmit(){
    this.clientService.updateClient(this.idC, this.client).subscribe( data =>{
      this.goToEmployeeList();
    }
    , error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/listClients']);
  }
}

