import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterpointComponent } from './centerpoint.component';

describe('CenterpointComponent', () => {
  let component: CenterpointComponent;
  let fixture: ComponentFixture<CenterpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
