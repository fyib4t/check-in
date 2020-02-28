import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinHomeComponent } from './checkin-home.component';

describe('CheckinHomeComponent', () => {
  let component: CheckinHomeComponent;
  let fixture: ComponentFixture<CheckinHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
