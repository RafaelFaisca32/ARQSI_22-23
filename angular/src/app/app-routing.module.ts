import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from "./components/User/user.component";
import { ChangeMoodComponent } from "./components/change-mood/change-mood.component";
import { ChangeProfileComponent } from "./components/change-profile/change-profile.component";
import {ConsultSafestPathComponent} from "./components/consult-safest-path/consult-safest-path.component";
import {ConsultStrongestPathComponent} from "./components/consult-strongest-path/consult-strongest-path.component";
import {ConsultShortestPathComponent} from "./components/consult-shortest-path/consult-shortest-path.component";
import {FriendRequestComponent} from "./components/friendRequest/friendRequest.component";
import {ListPendingFriendshipRequestsComponent} from "./components/listPendingFriendshipRequests/listPendingFriendshipRequests.component";
import {loginUserComponent} from "./components/loginUser/loginUser.component";
import {IntroductionRequestComponent} from "./components/introductionRequest/introductionRequest.component";
import {ChangeIntroductionStateComponent} from "./components/changeIntroductionState/changeIntroductionState.component";
import {graphComponent} from "./components/graph/graph.component";
import {EditConnectionStrengthTagComponent} from "./components/EditTagConnectionStrength/editConnectionStrengthTag.component";
import {SugestedFriendshipsComponent} from "./components/SugestedFriendships/sugestedFriendships.component";
import {DimensionLeaderBoardComponent} from "./components/dimension-leader-board/dimension-leader-board.component";
import {StrengthLeaderBoardComponent} from "./components/strength-leader-board/strength-leader-board.component";
import {NetworkStrengthComponent} from "./components/network-strength/network-strength.component";
import { ConsultComunFriendsGraphComponent } from './components/consult-common-friends-graph/consult-comun-friends-graph.component';
import {ConsultFriendshipsTagCloudComponent} from "./components/consultFriendshipsTagCloud/consultFriendshipsTagCloud.component";
import {consultUsersTagCloudComponent} from "./components/ConsultAllUsersTagCloud/consultUsersTagCloud.component";
import {NetworkSizeComponent} from "./components/network-size/network-size.component";
import {ConsultUserTagCloudComponent} from "./components/consultUserTagCloud/consultUserTagCloud.component";
import {ConsultUserFriendshipsTagCloudComponent} from "./components/consultUserFriendshipsTagCloud/consultUserFriendshipsTagCloud.component";
import {consultRelationStrengthBetweenUsersComponent} from "./components/consultRelationStrengthBetweenUsers/consultRelationStrengthBetweenUsers.component";

const routes: Routes = [
  {path: '', redirectTo: '/loginUser', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'registerUser', component: UserComponent},
  {path: 'ChangeMood', component: ChangeMoodComponent},
  {path: 'ChangeProfile', component: ChangeProfileComponent},
  {path: 'ConsultSafestPath', component: ConsultSafestPathComponent},
  {path: 'ConsultShortestPath', component: ConsultShortestPathComponent},
  {path: 'ConsultStrongestPath', component: ConsultStrongestPathComponent},
  {path: 'FriendRequest', component: FriendRequestComponent},
  {path: 'ListPendingFriendshipRequests', component: ListPendingFriendshipRequestsComponent},
  {path: 'loginUser', component: loginUserComponent},
  {path: 'graph', component: graphComponent},
  {path: 'EditTagConnectionStrength', component: EditConnectionStrengthTagComponent},
  {path: 'ChangeIntroductionState', component: ChangeIntroductionStateComponent},
  {path: 'IntroductionRequest', component: IntroductionRequestComponent},
  {path: 'graph', component: graphComponent},
  {path: 'SugestedFriendships', component: SugestedFriendshipsComponent},
  {path: 'DimensionLeaderBoard', component: DimensionLeaderBoardComponent},
  {path: 'StrengthLeaderBoard', component: StrengthLeaderBoardComponent},
  {path: 'NetworkStrength', component: NetworkStrengthComponent},
  {path: 'ConsultCommonFriendsGraph', component: ConsultComunFriendsGraphComponent},
  {path: 'ConsultFriendshipsTagCloud', component: ConsultFriendshipsTagCloudComponent},
  {path: 'consultUsersTagCloud', component: consultUsersTagCloudComponent},
  {path: 'NetworkSize', component: NetworkSizeComponent},
  {path: 'consultUserTagCloud', component: ConsultUserTagCloudComponent},
  {path: 'ConsultUserFriendshipsTagCloudComponent', component: ConsultUserFriendshipsTagCloudComponent},
  {path: 'consultRelationStrengthBetweenUsersComponent',component:consultRelationStrengthBetweenUsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
