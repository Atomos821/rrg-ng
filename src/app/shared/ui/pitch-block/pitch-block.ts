import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pitch-block',
  imports: [NgClass],
  templateUrl: './pitch-block.html',
  styleUrl: './pitch-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PitchBlock {
  contentAlign = input<'left' | 'right'>('right');
  overText = input<string>();
  title = input.required<string>();
  imageSrc = input.required<string>();
  imageAlt = input.required<string>();
}
