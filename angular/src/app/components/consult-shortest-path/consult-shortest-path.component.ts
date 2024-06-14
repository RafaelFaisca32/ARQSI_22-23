import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Path} from "../../dtos/path";
import {UserService} from "../../services/UserService";
import {ConsultPathService} from "../../services/ConsultPathService";

@Component({
  selector: 'app-consult-shortest-path',
  templateUrl: './consult-shortest-path.component.html',
  styleUrls: ['./consult-shortest-path.component.css']
})
export class ConsultShortestPathComponent implements OnInit {
  path: Path | undefined ;
  constructor(private userService: UserService,private location: Location,private consultPath: ConsultPathService) { }

  ngOnInit(): void {
  }

  consultShortestPath(destiny : string){
    this.path=undefined;
    if(!destiny)return;
    var origId = localStorage.getItem('id');
    if(!origId)return;
    this.userService.getUser(origId.slice(1,origId.length-1)).subscribe(user =>{
      if(!user)return;
      var path;
      this.consultPath.consultShortestPath(user.name,destiny).subscribe(
        (data) => {
          this.path = data;
          alert(this.path?.caminho);
        }, err => alert('Was not possible to consult the path!')
      );
    });
  }

  goBack(): void {
    this.location.back();
  }

}
