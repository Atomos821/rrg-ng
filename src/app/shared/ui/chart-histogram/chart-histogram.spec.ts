import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHistogram } from './chart-histogram';

describe('ChartHistogram', () => {
  let component: ChartHistogram;
  let fixture: ComponentFixture<ChartHistogram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartHistogram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHistogram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
