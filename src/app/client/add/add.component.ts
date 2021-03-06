import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/Client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  ministeres: any =  ["Ministère de l'intérieur", "Ministère des finances", "Ministère de l’Industrie, des Mines et de l’Energie","Ministère du Commerce et du Développement des Exportations"
  ,"Ministère de la santé","Ministère de l’Agriculture, des Ressources Hydrauliques et de la Pêche Maritime","Ministère de l'éducation","Ministère de l'enseignement supérieur et de la recherche scientifique"
  ,"Ministère de la Jeunesse et des Sports","Ministère des Technologies de la Communication","Ministère des Transports","Ministère de l'Environnement","Ministère du tourisme",
  "Ministère de l'Emploi et de la Formation professionnelle"];



  alert:boolean=false
  addForm: FormGroup;
  submitted = false;
  constructor(private clientService: ClientService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
    const PAT_NAME = "^[a-zA-Z ]{3,20}$";
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$"

    this.addForm = this.formBuilder.group({
      code_client:['',[Validators.required, Validators.pattern("^[0-9]{8}$")]],
      Matricule_cnrps:['',[Validators.required, Validators.pattern("^[4]+[0]+[0-9]{8}$")]],
      cin:['', [Validators.required, Validators.pattern("^[0-9]{8}$")]],
      nom:['',[Validators.required, Validators.pattern(PAT_NAME)]],
      prenom:['',[Validators.required, Validators.pattern(PAT_NAME)]],
      email:['',[Validators.required,Validators.pattern(PAT_EMAIL)]],
      tel:['',[Validators.required, Validators.pattern("^[0-9]{8}$")]],
      fix:['',[Validators.required, Validators.pattern("^[0-9]{8}$")]],
      mat:['',[Validators.required, Validators.pattern("^[0-9]{8}$")]],
      structure:[''],
      ministere:['',Validators.required]
     
    });
  }

  changeAlertPosition() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'le client est bien ajouté',
      showConfirmButton: false,
      timer: 1500
    })
  }

  AddClient(addForm: FormGroup) {
    console.log(addForm.controls);
    this.clientService.AddClients(addForm.value).subscribe();
    console.log("Client bien ajouté");
    this.changeAlertPosition();      
    this.router.navigate(['/gestionclients'])
  }

}
