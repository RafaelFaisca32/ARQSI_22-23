import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMoodComponent } from './change-mood.component';
import SpyObj = jasmine.SpyObj;
import {UserService} from "../../services/UserService";
import firebase from "firebase/compat";
import {User} from "../../dtos/user";
import {of} from "rxjs";

describe('ChangeMoodComponent', () => {
  let component: ChangeMoodComponent;
  let fixture: ComponentFixture<ChangeMoodComponent>;
  let fakeUserService: SpyObj<UserService>;
  let userMock:User = ({id: 'fd2bd278-aaf1-4335-a11c-b89854e38f61',
    name: 'userUM',
    password: 'userUmpass',
    birthDate: '12-12-2200',
    email: 'userum@gmail.com',
    phoneNumber: '988888888',
    state: 'Angry',
    tag: [],
    friendship: ['7ca81487-b40a-49ba-99b2-2db733b54c3c','6fcc7c4d-1163-4004-8920-a7f62f1ffac7']} as User);

  beforeEach(async () => {
    fakeUserService = jasmine.createSpyObj<UserService>('UserService',{
      updateMood: of(userMock)
    });
    await TestBed.configureTestingModule({
      declarations: [ ChangeMoodComponent ],
      providers: [
        {provide: UserService, useValue: fakeUserService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should change mood',() =>{
    window.localStorage.setItem('id', userMock.id);
    component.changeMood('Angry')
    // @ts-ignore
    expect(component.user1).toEqual(userMock);
  });
});


