import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTag1Component } from './stats-tag1.component';

describe('StatsTag1Component', () => {
  let component: StatsTag1Component;
  let fixture: ComponentFixture<StatsTag1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsTag1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTag1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
