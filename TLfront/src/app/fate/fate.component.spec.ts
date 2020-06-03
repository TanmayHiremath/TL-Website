import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FateComponent } from './fate.component';

describe('FateComponent', () => {
  let component: FateComponent;
  let fixture: ComponentFixture<FateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
