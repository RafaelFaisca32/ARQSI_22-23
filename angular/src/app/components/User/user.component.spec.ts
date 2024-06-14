import {ComponentFixture, TestBed} from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import {User} from "../../dtos/user";
import {UserService} from "../../services/UserService";
import {of} from "rxjs";
import {UserComponent} from "./user.component";
import {Friendship} from "../../dtos/friendship";
import {HttpClient} from "@angular/common/http";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let fakeUserService: SpyObj<UserService>;
  let userA: User = ({
    id: '"4ecd4e69-a9f7-434e-9c9b-7e7a7d0707ba"',
    password:	'userQuatropass',
    birthDate:	'3-3-1998',
    email:	'userquatro@gmail.com',
    name:	'userQUATRO',
    phoneNumber:	'944444444',
    state:	'Joyful',
    tag: ['rock','boxe','games'],
    friendship: ['2f0b67a0-8eae-4e18-a859-52108c152854', '7751bb64-fb11-4c16-99ee-3b5d2da7c9c6','0bd0309a-a2f2-4e9a-ad3d-a49b376467ce']
  } as User);
  let userB: User = ({
    id: '"5ecd4e69-a9f7-434e-9c9b-7e7a7d0707ba"',
    password:	'userQuatropass',
    birthDate:	'3-3-1998',
    email:	'userquatro@gmail.com',
    name:	'userB',
    phoneNumber:	'944444444',
    state:	'Joyful',
    tag: ['rock','boxe','games'],
    friendship: ['2f0b67a0-8eae-4e18-a859-52108c152854', '7751bb64-fb11-4c16-99ee-3b5d2da7c9c6','0bd0309a-a2f2-4e9a-ad3d-a49b376467ce']
  } as User);
  let listMock: User[] = [userA];
  let listMock2: User[] = [userA,userB];

  beforeEach(async () => {
    // @ts-ignore
    fakeUserService = jasmine.createSpyObj<UserService>('UserService', {
      addUser: of(userB),
      getUsers: of([userA])
    });
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        {provide: UserService, useValue: fakeUserService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should get the list of users',() => {
    component.getUsers();
    //@ts-ignore
    expect(listMock).toEqual(component.users);
  })

  it('should register a user', () => {
    component.accepted = true;
    component.add(userB.name,userB.password,userB.birthDate,userB.email,userB.phoneNumber);
    // @ts-ignore
    expect(listMock2).toEqual(component.users);
  })
});
