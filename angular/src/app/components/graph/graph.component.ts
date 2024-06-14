import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {graphService} from "../../services/graphService";
import {UserService} from "../../services/UserService";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
import {Friendship} from "../../dtos/friendship";


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class graphComponent{

  id: string;
  friendships!: Observable<Friendship[][]>;

  @ViewChild('rendererCanvas', {static: true})
  public renderCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private graphService: graphService,private userService: UserService,private location: Location) {
    this.id='';
  }


  onSubmit(lvl: string): void{
    if(!lvl){
      return;
    }
    var id = localStorage.getItem('id');
    if(!id){
      return;
    }
    var idF = id.slice(1,id.length-1);
    var lvlParse = parseInt(lvl);
    this.friendships = this.graphService.getGraphByUserWithLevel({id: idF,lvl: lvlParse});
    console.log(this.friendships);
    this.graphService.createScene(this.renderCanvas,this.friendships);
    this.graphService.animate();
}

  goBack(): void {
    this.location.back();
  }

}
