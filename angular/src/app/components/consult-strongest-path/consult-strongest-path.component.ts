import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Path} from "../../dtos/path";
import {UserService} from "../../services/UserService";
import {ConsultPathService} from "../../services/ConsultPathService";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-consult-strongest-path',
  templateUrl: './consult-strongest-path.component.html',
  styleUrls: ['./consult-strongest-path.component.css']
})
export class ConsultStrongestPathComponent implements OnInit {
  path: Path | undefined ;
  constructor(private userService: UserService,private location: Location,private consultPath:ConsultPathService) { }

  ngOnInit(): void {
  }

  consultStrongestPath(destiny : string, multi : string){
    this.path=undefined;
    if(!destiny)return;
    var origId = localStorage.getItem('id');
    if(!origId)return;
    this.userService.getUser(origId.slice(1,origId.length-1)).subscribe(user =>{
      if(!user)return;
      var path;
      if(multi == "ligacao"){
        this.consultPath.consultStrongestPath(user.name,destiny).subscribe(
          (data) => {
            this.path = data;
            alert(this.path?.caminho);
          }, err => alert('Was not possible to consult the path!')
        );}
      else {
        this.consultPath.consultStrongestPathMulti(user.name,destiny).subscribe(
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
