import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/Client';
import { Observable, Subject } from 'rxjs';


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
  API1='http://localhost:9090/client/getClient'
  API2='http://localhost:9090/client/updateClient'
  
  setGroupFilter$ = new Subject<any>();
  getGroupFilter = this.setGroupFilter$.asObservable();

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
  getClientById(idC: number): Observable<Client>{
    return this.httpClient.get<Client>(`${this.API1}/${idC}`);
  }
  getCurrentClient(idC){
    return this.httpClient.get<Client>(`${this.API}/${idC}`);

  }
  updateClient(idC: number,ClientData:any): Observable<Client> {
    this.structure.libelle = ClientData.structure;
    this.structure.ministere.libelle = ClientData.ministere;
    delete ClientData.structure
    delete ClientData.ministere
    ClientData = { ...ClientData, structure: this.structure }
    return this.httpClient.put<Client>(`${this.API2}/${idC}`,ClientData);
  }
}
