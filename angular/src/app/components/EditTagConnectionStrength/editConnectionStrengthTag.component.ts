import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Friendship} from "../../dtos/friendship";
import {EditConStrengthTagService} from "../../services/EditConStrengthTagService";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-editConnectionStrengthTag',
  templateUrl: './editConnectionStrengthTag.component.html',
  styleUrls: [ './editConnectionStrengthTag.component.css' ]
})
export class EditConnectionStrengthTagComponent implements OnInit {
  friendship: Friendship[] = [];
  message: string | undefined;
  succcess = 'Connection strength and/or tags have been successfully set!';
  error = 'Was not possible to edit connection strength and/or tags!';

  constructor(
    private route: ActivatedRoute,
    private editConStrengthTagService: EditConStrengthTagService,
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  editConnectionStrengthTag(name:string,tag:string,conStrength:string) {
    let id = localStorage.getItem('id');
    if (!id) return
    id = id.slice(1,length-1);

  this.editConStrengthTagService.updateRelationshipConStrengthTag(id,name,tag,conStrength).subscribe(friendship=> {
    this.friendship.push(friendship);
    if (!friendship) {
      this.message = this.succcess;
      alert(this.message);
    } else {
      this.message = this.error;
      alert(this.message);
    }
  });

  }

  goBack(): void {
    this.location.back();
  }

}
