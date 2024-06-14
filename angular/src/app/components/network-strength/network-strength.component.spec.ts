import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NetworkStrengthComponent} from './network-strength.component';
import {UserService} from "../../services/UserService";
import {ConsultPathService} from "../../services/ConsultPathService";
import SpyObj = jasmine.SpyObj;
import {of} from "rxjs";
import {User} from "../../dtos/user";

describe('NetworkStrengthComponent', () => {
  let component: NetworkStrengthComponent;
  let fixture: ComponentFixture<NetworkStrengthComponent>;
  let fakeUserService: SpyObj<UserService>;

  beforeEach(async () => {
    // @ts-ignore
    fakeUserService = jasmine.createSpyObj<UserService>('UserService', {
      getNetworkStrength: of(13)
    });
    await TestBed.configureTestingModule({
      declarations: [NetworkStrengthComponent],
      providers: [
        {provide: UserService, useValue: fakeUserService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should get network strength', () => {
    window.localStorage.setItem('id', 'fd2bd278-aaf1-4335-a11c-b89854e38f61');
    component.consult();
    // @ts-ignore
   expect(13).toEqual(component.networkStrength);
  });
});
