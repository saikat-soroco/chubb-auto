import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTagComponent } from './stats-tag.component';

describe('StatsTagComponent', () => {
  let component: StatsTagComponent;
  let fixture: ComponentFixture<StatsTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
