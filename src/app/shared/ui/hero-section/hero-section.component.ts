import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [NgOptimizedImage],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  imageUrl = input.required<string>();
  imageAlt = input.required<string>();
}
