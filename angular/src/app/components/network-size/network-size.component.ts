import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

import {networkSizeService} from "../../services/network-sizeService";
import {UserService} from "../../services/UserService";
import { Size } from 'src/app/dtos/size';

@Component({
  selector: 'app-network-size',
  templateUrl: './network-size.component.html',
  styleUrls: ['./network-size.component.css']
})
export class NetworkSizeComponent {
  size: Size | undefined

  constructor(private location: Location, private nSize: networkSizeService) {
  }


  networkSize(lvl: string) {
    this.size = undefined;
    if (!lvl) return;
    var id = localStorage.getItem('id');
    if (!id) return;
    this.nSize.consultNetworkSize(id.slice(1, id.length - 1), lvl).subscribe(
      (data) => {
        this.size = data;
        alert('The user has a network size of ' + this.size?.tamanho + ' on the level ' + lvl + '.');
      }, err => alert('Could not get the size of the network.')
    );
  }

  goBack(): void {
    this.location.back();
  }

}
