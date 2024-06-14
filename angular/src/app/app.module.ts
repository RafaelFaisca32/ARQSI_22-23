import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {RouterModule} from "@angular/router";

import { ChangeMoodComponent } from './components/change-mood/change-mood.component';
import { ChangeProfileComponent } from './components/change-profile/change-profile.component';
import { UserComponent } from "./components/User/user.component";
import { ConsultSafestPathComponent } from './components/consult-safest-path/consult-safest-path.component';
import { ConsultStrongestPathComponent } from './components/consult-strongest-path/consult-strongest-path.component';
import {FriendRequestComponent} from "./components/friendRequest/friendRequest.component";
import {ListPendingFriendshipRequestsComponent} from "./components/listPendingFriendshipRequests/listPendingFriendshipRequests.component";
import {loginUserComponent} from "./components/loginUser/loginUser.component";
import {graphComponent} from "./components/graph/graph.component";
import { ConsultShortestPathComponent } from './components/consult-shortest-path/consult-shortest-path.component';
import {EditConnectionStrengthTagComponent} from "./components/EditTagConnectionStrength/editConnectionStrengthTag.component";
import {IntroductionRequestComponent} from "./components/introductionRequest/introductionRequest.component";
import {ChangeIntroductionStateComponent} from "./components/changeIntroductionState/changeIntroductionState.component";
import {SugestedFriendshipsComponent} from "./components/SugestedFriendships/sugestedFriendships.component";
import {DimensionLeaderBoardComponent} from "./components/dimension-leader-board/dimension-leader-board.component";
import {StrengthLeaderBoardComponent} from "./components/strength-leader-board/strength-leader-board.component";
import { NetworkStrengthComponent } from './components/network-strength/network-strength.component';
import { ConsultComunFriendsGraphComponent } from './components/consult-common-friends-graph/consult-comun-friends-graph.component';
import {ConsultFriendshipsTagCloudComponent} from "./components/consultFriendshipsTagCloud/consultFriendshipsTagCloud.component";
import {consultUsersTagCloudComponent} from "./components/ConsultAllUsersTagCloud/consultUsersTagCloud.component";
import {NetworkSizeComponent} from "./components/network-size/network-size.component";
import {ConsultUserTagCloudComponent} from "./components/consultUserTagCloud/consultUserTagCloud.component";
import {ConsultUserFriendshipsTagCloudComponent} from "./components/consultUserFriendshipsTagCloud/consultUserFriendshipsTagCloud.component";
import {consultRelationStrengthBetweenUsersComponent} from "./components/consultRelationStrengthBetweenUsers/consultRelationStrengthBetweenUsers.component";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'User', component: UserComponent},
      {path: 'change-mood', component: ChangeMoodComponent},
      {path: 'change-profile', component: ChangeProfileComponent},
      {path: 'friendRequest', component: FriendRequestComponent},
      {path: 'listPendingFriendshipRequests', component: ListPendingFriendshipRequestsComponent},
      {path: 'consult-safest-path', component: ConsultSafestPathComponent},
      {path: 'consult-strongest-path', component: ConsultStrongestPathComponent},
      {path: 'loginUser', component: loginUserComponent},
      {path: 'consult-shortest-path', component: ConsultShortestPathComponent},
      {path: 'graph', component: graphComponent},
      {path: 'EditTagConnectionStrength',component:EditConnectionStrengthTagComponent},
      {path: 'changeIntroductionState', component: ChangeIntroductionStateComponent},
      {path: 'introductionRequest', component: IntroductionRequestComponent},
      {path: 'graph', component: graphComponent},
      {path: 'SugestedFriendships',component:SugestedFriendshipsComponent},
      {path: 'dimension-leader-board', component: DimensionLeaderBoardComponent},
      {path: 'strength-leader-board', component: StrengthLeaderBoardComponent},
      {path: 'network-strength', component: NetworkStrengthComponent},
      {path: 'consult-common-friends-graph', component: ConsultComunFriendsGraphComponent},
      {path: 'consultFriendshipsTagCloud', component: ConsultFriendshipsTagCloudComponent},
      {path: 'network-size', component: NetworkSizeComponent},
      {path: 'consultUsersTagCloud',component:consultUsersTagCloudComponent},
      {path: 'consultUserTagCloudComponent',component:ConsultUserTagCloudComponent},
      {path: 'consultUserFriendshipsTagCloud', component:ConsultUserFriendshipsTagCloudComponent},
      {path: 'consultRelationStrengthBetweenUsers', component:consultRelationStrengthBetweenUsersComponent}

    ]),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    ChangeMoodComponent,
    ChangeProfileComponent,
    ConsultSafestPathComponent,
    ConsultStrongestPathComponent,
    FriendRequestComponent,
    ListPendingFriendshipRequestsComponent,
    loginUserComponent,
    IntroductionRequestComponent,
    ChangeIntroductionStateComponent,
    graphComponent,
    ConsultShortestPathComponent,
    EditConnectionStrengthTagComponent,
    SugestedFriendshipsComponent,
    DimensionLeaderBoardComponent,
    StrengthLeaderBoardComponent,
    NetworkStrengthComponent,
    ConsultComunFriendsGraphComponent,
    ConsultFriendshipsTagCloudComponent,
    NetworkSizeComponent,
    consultUsersTagCloudComponent,
    ConsultUserTagCloudComponent,
    ConsultUserFriendshipsTagCloudComponent,
    consultRelationStrengthBetweenUsersComponent
  ], providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],

bootstrap: [ AppComponent ]
})
export class AppModule { }
