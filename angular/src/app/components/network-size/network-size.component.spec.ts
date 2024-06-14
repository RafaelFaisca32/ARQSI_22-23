import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NetworkSizeComponent} from './network-size.component';
import SpyObj = jasmine.SpyObj;
import {of} from "rxjs";
import {networkSizeService} from "../../services/network-sizeService";
import { Size } from 'src/app/dtos/size';

describe('NetworkSizeComponent', () => {
  let component: NetworkSizeComponent;
  let fixture: ComponentFixture<NetworkSizeComponent>;
  let fakeNetworkService: SpyObj<networkSizeService>;
  let id = '"4ecd4e69-a9f7-434e-9c9b-7e7a7d0707ba"';
  let sizeMock : Size = {tamanho: '3'} as Size;

  beforeEach(async () => {
    fakeNetworkService = jasmine.createSpyObj<networkSizeService>('networkSizeService', {
      consultNetworkSize: of(sizeMock)
    });
    await TestBed.configureTestingModule({
      declarations: [NetworkSizeComponent],
      providers: [
        {provide: networkSizeService, useValue: fakeNetworkService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should consult network size', () => {
    window.localStorage.setItem('id', id);
    component.networkSize('1');
    // @ts-ignore
    expect(sizeMock).toEqual(component.size);
  })
});
