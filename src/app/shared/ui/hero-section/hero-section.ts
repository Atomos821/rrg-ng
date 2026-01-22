import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSection {
  title = input.required<string>();
  subtitle = input.required<string>();
  // imageUrl = input.required<string>();
  // imageAlt = input.required<string>();
}
