import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-network-strength',
  templateUrl: './network-strength.component.html',
  styleUrls: ['./network-strength.component.css']
})
export class NetworkStrengthComponent implements OnInit {

  networkStrength: number | undefined;
  // @ts-ignore
  private id = localStorage.getItem('id').slice(1, length - 1);

  constructor(private location: Location, private userService: UserService) {
  }

  ngOnInit(): void {
    this.consult();
  }

  consult(): void {
    this.userService.getNetworkStrength(this.id).subscribe(strength => {
      this.networkStrength = strength;
      alert('Your network strength is: '+this.networkStrength);
    }, err => alert('Was not possible to update network strength!'));
  }

  goBack(): void {
    this.location.back();
  }

}
