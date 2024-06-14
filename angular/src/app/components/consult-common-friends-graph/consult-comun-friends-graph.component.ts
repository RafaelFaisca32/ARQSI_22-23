import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {graphService} from "../../services/graphService";
import {Friendship} from "../../dtos/friendship";

@Component({
  selector: 'app-consult-comun-friends-graph',
  templateUrl: './consult-common-friends-graph.component.html',
  styleUrls: ['./consult-common-friends-graph.component.css']
})
export class ConsultComunFriendsGraphComponent implements OnInit {

  data : Friendship[][]|undefined;
  @ViewChild('rendererCanvas', {static: true})
  public renderCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private location: Location, private graphService: graphService) {
  }

  ngOnInit(): void {
  }

  consult(friend: string): void {
    var userId = localStorage.getItem('id');
    if (!userId) return;
    if (!friend) return;
    var data = this.graphService.getCommonFriendsGraph(userId.slice(1, userId.length - 1), friend);
    console.log(data);
    data.subscribe(f =>{
      this.data = f;
      this.graphService.createScene(this.renderCanvas, data);
      this.graphService.animate();
    }, err => alert('Was not possible to show the common graph friends!'));

  }

  goBack(): void {
    this.location.back();
  }
}
