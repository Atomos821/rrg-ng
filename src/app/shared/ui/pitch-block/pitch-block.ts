import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-pitch-block',
  imports: [NgClass, NgOptimizedImage],
  templateUrl: './pitch-block.html',
  styleUrl: './pitch-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PitchBlock {
  contentAlign = input<'left' | 'right'>('right');
  glassTint = input<'clear' | 'dark'>('dark');
  overText = input<string>();
  title = input.required<string>();
  imageSrc = input.required<string>();
  imageAlt = input.required<string>();
}
