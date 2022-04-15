import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  searchText: string;
  filters: Object;

  constructor() { }

  ngOnInit(): void {
  }

}
