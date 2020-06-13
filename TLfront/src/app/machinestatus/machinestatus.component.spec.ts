import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinestatusComponent } from './machinestatus.component';

describe('MachinestatusComponent', () => {
  let component: MachinestatusComponent;
  let fixture: ComponentFixture<MachinestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
