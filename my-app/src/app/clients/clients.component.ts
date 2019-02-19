import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private config: ConfigService) { }

  clients = {};

  ngOnInit() {
    this.clients = this.getClients();
  }

  getClients() {
    return this.config.getConfig().clients;
  }

}
