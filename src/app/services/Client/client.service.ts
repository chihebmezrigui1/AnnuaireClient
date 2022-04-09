import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/Client';


interface Structure {
  libelle?: string,
  ministere?: {
    libelle: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private structure: Structure = { libelle: '', ministere: { libelle: '' } };
  constructor(private httpClient: HttpClient) { }
  API = 'http://localhost:9090/client'

  public AddClients(ClientData:any) {
    this.structure.libelle = ClientData.structure;
    this.structure.ministere.libelle = ClientData.ministere;
    delete ClientData.structure
    delete ClientData.ministere
    ClientData = { ...ClientData, structure: this.structure }
    return this.httpClient.post(this.API + '/ajouterClient', ClientData);
  }

  public getClients(){
    return this.httpClient.get<Client[]>(this.API+'/listClients')
  }
  public deleteClient(idC: any) {
    return this.httpClient.delete(this.API + '/deleteClient?idC=' + idC);
  }
}
