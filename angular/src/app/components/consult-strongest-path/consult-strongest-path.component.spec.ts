import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultStrongestPathComponent } from './consult-strongest-path.component';
import {UserService} from "../../services/UserService";
import {ConsultPathService} from "../../services/ConsultPathService";
import {Path} from "../../dtos/path";
import {User} from "../../dtos/user";
import {of} from "rxjs";
import SpyObj = jasmine.SpyObj;

describe('ConsultStrongestPathComponent', () => {
  let component: ConsultStrongestPathComponent;
  let fixture: ComponentFixture<ConsultStrongestPathComponent>;
  let fakeUserService: SpyObj<UserService>;
  let fakePathService: SpyObj<ConsultPathService>;
  let pathMock: Path = {caminho: ['userUM', 'userDOIS', 'userQUATRO', 'userSEIS']} as Path;
  let pathMultiMock: Path = {caminho: ['userUM', 'userDOIS', 'userQUATRO','userTRES','userCINCO', 'userSEIS']} as Path;
  let userMock: User = ({
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

  beforeEach(async () => {
    // @ts-ignore
    fakeUserService = jasmine.createSpyObj<UserService>('UserService', {
      getUser: of(userMock)
    });
    fakePathService = jasmine.createSpyObj<ConsultPathService>('PathService', {
      consultStrongestPath: of(pathMock),
      consultStrongestPathMulti: of(pathMultiMock)
    });
    await TestBed.configureTestingModule({
      declarations: [ ConsultStrongestPathComponent ],
      providers: [
        {provide: UserService, useValue: fakeUserService},
        {provide: ConsultPathService, useValue: fakePathService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultStrongestPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should consult safest path with multicriterio', () => {
    window.localStorage.setItem('id', userMock.id);
    component.consultStrongestPath('userSEIS','multicriterio');
    // @ts-ignore
    expect(pathMultiMock).toEqual(component.path);
  });

  it('should consult safest path without multicriterio, just connection strength', () => {
    window.localStorage.setItem('id', userMock.id);
    component.consultStrongestPath('userSEIS','ligacao');
    // @ts-ignore
    expect(pathMock).toEqual(component.path);
  });
});