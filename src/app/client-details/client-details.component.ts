import { Component, OnInit } from '@angular/core';
import { Client } from '../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  clients:Client[];
  constructor() { }

  ngOnInit(): void {
  }


}
