import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchBlock } from './pitch-block';

describe('PitchBlock', () => {
  let component: PitchBlock;
  let fixture: ComponentFixture<PitchBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PitchBlock]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PitchBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
