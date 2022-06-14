import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { reduce } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/Client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

    alert:boolean=false
    editClient=new FormGroup({
    code_client: new FormControl(''),
    cin:new FormControl(''),
    Matricule_cnrps:new FormControl(''),
    nom:new FormControl(''),
    prenom:new FormControl(''),
    email:new FormControl(''),
    tel:new FormControl(''),
    fix:new FormControl(''),
    mat:new FormControl(''),
    structure:new FormControl(''),
    ministere:new FormControl('')
  })

  idC:number;
  client: Client

  addForm: FormGroup;
  ministeres: any =  ["Ministère de l'intérieur", "Ministère des finances", "Ministère de l’Industrie, des Mines et de l’Energie","Ministère du Commerce et du Développement des Exportations"
  ,"Ministère de la santé","Ministère de l’Agriculture, des Ressources Hydrauliques et de la Pêche Maritime","Ministère de l'éducation","Ministère de l'enseignement supérieur et de la recherche scientifique"
  ,"Ministère de la Jeunesse et des Sports","Ministère des Technologies de la Communication","Ministère des Transports","Ministère de l'Environnement","Ministère du tourisme",
  "Ministère de l'Emploi et de la Formation professionnelle"];


  

  constructor(private clientService:ClientService ,private route :ActivatedRoute,private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    console.log(this.route.snapshot.params['idC']);
    
    this.clientService.getClientById(this.route.snapshot.params['idC']).subscribe((result)=>{
      this.editClient=new FormGroup({
        code_client: new FormControl(result['code_client']),
        cin:new FormControl(result['cin']),
        Matricule_cnrps:new FormControl(result['Matricule_cnrps']),
        nom:new FormControl(result['nom']),
        prenom:new FormControl(result['prenom']),
        email:new FormControl(result['email']),
        tel:new FormControl(result['tel']),
        fix:new FormControl(result['fix']),
        mat:new FormControl(result['mat']),
        structure:new FormControl(result['libelle']),
        ministere:new FormControl(result['libelle'])
      })
    })
  }

  // retour a la liste des clients
  gotoList() {
    this.router.navigate(['/gestionclients']);
  }

  //Alert success
  changeAlertPosition() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'le client est bien modifié',
      showConfirmButton: false,
      timer: 1500
    })
  }

  //update du client
  updateClient() {
    this.clientService.updateClient(this.route.snapshot.params['idC'],this.editClient.value).subscribe((rslt)=>{
      console.log(rslt,"data updated successfull");
      this.changeAlertPosition();      
      this.router.navigate(['/gestionclients'])
    })
  }
}

