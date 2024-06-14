import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsultComunFriendsGraphComponent} from './consult-comun-friends-graph.component';
import SpyObj = jasmine.SpyObj;
import {graphService} from "../../services/graphService";
import {User} from "../../dtos/user";
import {Friendship} from "../../dtos/friendship";
import {UserService} from "../../services/UserService";
import {of} from "rxjs";
import {ConsultPathService} from "../../services/ConsultPathService";

describe('ConsultComunFriendsGraphComponent', () => {
  let component: ConsultComunFriendsGraphComponent;
  let fixture: ComponentFixture<ConsultComunFriendsGraphComponent>;
  let fakeGraphService: SpyObj<graphService>;
  let frienda: User = ({
    id: 'fd2bd278-aaf1-4335-a11c-b89854e38f61',
    name: 'userUM',
    password: 'userUmpass',
    birthDate: '12-12-2200',
    email: 'userum@gmail.com',
    phoneNumber: '988888888',
    state: 'Angry',
    tag: [],
    friendship: ['7ca81487-b40a-49ba-99b2-2db733b54c3c', '6fcc7c4d-1163-4004-8920-a7f62f1ffac7']
  } as User);

  let fMock: Friendship = {
    id: '6fcc7c4d-1163-4004-8920-a7f62f1ffac7',
    relationTag: '',
    connectionStrength: '1',
    relationshipStrength: '2',
    friendA: frienda,
    friendB: frienda,
    friendshipState: 'Accepted'
  } as Friendship;
  let lfMock: Friendship[] = [fMock];
  let friendshipsMock: Friendship[][] = [];
  friendshipsMock.push(lfMock);

  beforeEach(async () => {
    // @ts-ignore
    fakeGraphService = jasmine.createSpyObj<graphService>('GraphService', {
      getCommonFriendsGraph: of(friendshipsMock)
    });
    await TestBed.configureTestingModule({
      declarations: [ConsultComunFriendsGraphComponent],
      providers: [
        {provide: graphService, useValue: fakeGraphService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultComunFriendsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should create common friends graph', () => {
    window.localStorage.setItem('id', frienda.id);
    component.consult('userDois');
    // @ts-ignore
    expect(friendshipsMock).toEqual(component.data);
  })
});
