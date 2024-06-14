import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./UserService";
import {User} from "../dtos/user";
import {LeaderBoardD} from "../dtos/leaderBoardD";
import {LeaderBoardS} from "../dtos/leaderBoardS";


@Injectable({providedIn: 'root'})
export class LeaderBoardService {
  private userUrl = 'https://vs-gate.dei.isep.ipp.pt:30817/api/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getDimension(user: User): number {
    return user.friendship.length;
  }


  getDimensionLeaderBoard(): LeaderBoardD[] {
    var returnLeaderB: LeaderBoardD[] = [];
    var leaderB: LeaderBoardD[] = [];
    this.userService.getUsers().subscribe(users => {
      users.forEach((user) => {
        leaderB.push({name: user.name, dimension: this.getDimension(user)} as LeaderBoardD);
      });
      leaderB.sort((l1, l2) => l2.dimension - l1.dimension);

      for (let i = 0; i < 10; i++) {
        if (leaderB.length > i) returnLeaderB.push(leaderB[i]);
      }
      return returnLeaderB;
    });
    return returnLeaderB;
  }


  getStrengthLeaderBoard(): LeaderBoardS[] {
    var returnLeaderB: LeaderBoardS[] = [];
    var leaderB: LeaderBoardS[] = [];
    this.userService.getUsers().subscribe(users => {
      var last = users[users.length - 1];
      users.forEach((user) => {
        // @ts-ignore
        this.userService.getNetworkStrength(user.id).subscribe(strength => {
          leaderB.push({name: user.name, strength: strength} as LeaderBoardS);
          if (user == last) {
            leaderB.sort((l1, l2) => l2.strength - l1.strength);

            for (let i = 0; i < 10; i++) {
              if (leaderB.length > i) returnLeaderB.push(leaderB[i]);
            }
            return returnLeaderB;
          }
        });

      });

    });
    return returnLeaderB;
  }

}
