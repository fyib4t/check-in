import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistCheckinComponent } from './hist-checkin.component';

describe('HistCheckinComponent', () => {
  let component: HistCheckinComponent;
  let fixture: ComponentFixture<HistCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
