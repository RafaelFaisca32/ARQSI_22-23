import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ConsultPathService} from "../../services/ConsultPathService";
import {Path} from "../../dtos/path";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-consult-safest-path',
  templateUrl: './consult-safest-path.component.html',
  styleUrls: ['./consult-safest-path.component.css']
})
export class ConsultSafestPathComponent implements OnInit {
  path: Path | undefined ;

  constructor(private consultPath: ConsultPathService, private location: Location,private userService: UserService) { }

  ngOnInit(): void {
  }

  consultSafestPath(destiny : string, connectionStrenth : string, multi : string){
    this.path=undefined;
    if(!destiny)return;
    if(!connectionStrenth)return;
    var origId = localStorage.getItem('id');
    if(!origId)return;
    this.userService.getUser(origId.slice(1,origId.length-1)).subscribe(user =>{
      if(!user)return;
      if(multi == "ligacao"){
      this.consultPath.consultSafestPath(user.name,destiny,connectionStrenth).subscribe(
        (data) => {
          this.path = data;
          alert(this.path?.caminho);
        }, err => alert('Was not possible to consult the path!')
      );}
      else {
        this.consultPath.consultSafestPathMulti(user.name,destiny,connectionStrenth).subscribe(
          (data) => {
            this.path = data;
            alert(this.path?.caminho);
          }, err => alert('Was not possible to consult the path!')
        );
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
